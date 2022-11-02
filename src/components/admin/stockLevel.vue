<template>
  <div class="float-container">
    <div class="filter">
      <!--search card-->
      <div class="card shadow mt-3">
        <div class="card-header">
          <h5>filter<CButton style="margin-left: 50%;" color="primary" shape="rounded-pill" @click="toAdd = true; selectedFundType = '-'">New</CButton></h5>
          <CModal size="lg" alignment="center" :visible="toAdd" @close="toAdd = false;" >
            <CModalHeader>
              <CModalTitle><span style="color: black;"><input id="Name" type="text" placeholder="Name" @change="validation()"/></span></CModalTitle>
            </CModalHeader>
            <CModalBody>
              <label>Image: &emsp;</label><input type="file" accept="image/*" id="Image" name="Image" @change="validation()"/>&emsp;&emsp;
              <label>Merchant: &emsp;</label><CDropdown :color="primary" :togglerText="count" style="margin-bottom: 3%; margin-right: 10%" direction="center">
                <CDropdownToggle :color="primary">{{ toAddMerchant }}</CDropdownToggle>
                <CDropdownMenu style="width: fit-content; height: fit-content;">
                  <div v-for="merchant in merchants" :key="merchant.merchantCategory">
                    <CDropdownItem @click="toAddMerchant = merchant.merchantCategory; changeMerchant(merchant.fundType)" @change="validation()">{{ merchant.merchantName}}</CDropdownItem>
                  </div>
                </CDropdownMenu>
              </CDropdown><br><br>
              <h3><span style="color: black;">ID: <input :value="newID" readonly/></span></h3><br>
              <h3 style="margin-bottom: 10px;"><span style="color: black;">Price:<input id="Price" step="0.00001" type="number" min="0.00001" value="0.00001" @change="validation()"/></span></h3><br>
              <h3 style="margin-bottom: 10px;"><span style="color: black;">Stock:<input id="Stock" type="number" min="1" value="1" @change="validation()"/></span></h3><br>
              <h3 style="margin-bottom: 10px;"><span style="color: black;">Fund Type:<input id="toAddFundType" value="-" readonly @change="validation()"/></span></h3><br>
              <h3><span style="color: black;">Description</span></h3>
              <textarea id="Description" rows="4" cols="100" placeholder="Description" @change="validation()"></textarea>
              <h3><span style="color: black;">Preservation</span></h3>
              <textarea id="Preservation" rows="4" cols="100" placeholder="Preservation" @change="validation()"></textarea>
            </CModalBody>
            <span style="color: black;">
              <CModelFooter>
                <CButton style="margin-left: 50%;margin-bottom: 3%;" id="adding" color="primary" @click="addNew(); toAdd = false">Add</CButton>              
              </CModelFooter>
            </span>
          </CModal>
        </div>
        <div class="card-body">
          <h6>Category List</h6>
          <hr>
          <CButtonGroup vertical role="group" aria-label="Vertical button group">
            <div v-for="category in merchants" :key="category.merchantCategory" >
              <CFormCheck v-if="merchants[0].merchantCategory == category.merchantCategory" type="radio" :button="{ color: 'dark', variant: 'outline' }" name="categoryList" :id="merchants[0].merchantName" :label="merchants[0].merchantName"  @click="selectedCategory = merchants[0].merchantCategory ; getProducts()" checked/>
              <CFormCheck v-else type="radio" :button="{ color: 'dark', variant: 'outline' }" name="categoryList" :id="category.merchantName" :label="category.merchantName"  @click="selectedCategory = category.merchantCategory ; getProducts()"/>
            </div>
          </CButtonGroup>
        </div>
      </div>
    </div>
    <div style="height: fit-content; ">
      <CRow :xs="{ gutter: 4}" :md="{ cols: 5 }" style="height: fit-content">
        <div v-for="item in items" :key="item.id" >
          <CCol style="width: 400px; padding: 0;" >
            <CCard class="text-center h-800" style="height: 500px;">
              <CCardImage orientation="top" :src="`data:image/jpg;base64,${item.image}`" style="width: auto; height: 300px"/>
              <CCardBody>
                <CCardTitle>ID: {{ item.productID }} <br><br> {{ item.productName }}</CCardTitle>
              </CCardBody>
              <CCardFooter>
                <CButton color="primary" @click="item.details = 1">Edit</CButton>
                <span style="color: transparent;">
                  <CModal size="lg" alignment="center" :visible="item.details" @close="item.details = 0;" >
                    <CModalHeader>
                      <CModalTitle>
                        <span style="color: black;"><input id="name" :value="item.productName" type="text" @change="checking(item.productID)"/></span>&emsp;&emsp;&emsp;&emsp;&emsp;                          
                        <label>Enable:&emsp;  </label><input v-if="item.enable == 1" :id="item.productID + 'enable'" value="True" readonly/>
                        <input v-else :id="item.productID + 'enable'" value="False" readonly/>
                      </CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <img style="width:300px; height:300px; margin-bottom: 1%;" :src="`data:image/jpg;base64,${item.image}`" />
                      <h3><span style="color: black;">ID: {{ item.productID }}</span></h3>
                      <h3 style="margin-bottom: 10px;"><span style="color: black;">Price: <input id="price" :value="item.price" step="0.00001" type="number" min="0.00001" @change="checking(item.productID)"/></span></h3><br>
                      <h3 style="margin-bottom: 10px;"><span style="color: black;">Stock: <input id="stock" :value="item.stock"  type="number" min="1" @change="checking(item.productID)"/></span></h3><br>
                      <h3><span style="color: black;">Description</span></h3>
                      <textarea id="description" :value="item.description" rows="4" cols="100" @change="checking(item.productID)"></textarea>
                      <h3><span style="color: black;">Preservation</span></h3>
                      <textarea id="preservation" :value="item.preservation" rows="4" cols="100" @change="checking(item.productID)"></textarea>
                    </CModalBody>
                    <span style="color: black;">
                      <CModelFooter>
                        <CButton :id="item.productID" color="primary" @click="updateDatabse(item.productID); item.details = 0" style="margin-bottom: 3%;margin-right: 1%;">Confirm Edit</CButton>
                        <CButton v-if="item.enable == 1" color="danger" @click="removeProduct(item.productID); item.details = 0" style="margin-bottom: 3%;">Disable</CButton>
                        <CButton v-else color="primary" @click="removeProduct(item.productID); item.details = 0" style="margin-bottom: 3%;">Enable</CButton>
                      </CModelFooter>
                    </span>
                  </CModal>
                </span>
              </CCardFooter>
            </CCard>
          </CCol>
        </div>
      </CRow>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { CCard, CCardTitle, CButtonGroup, CButton, CFormCheck, CModal, CModalHeader, CModalBody, } from '@coreui/vue'

export default {
  components: {
    CCard, 
    CCardTitle,
    CButtonGroup,
    CButton,
    CFormCheck,
    CModal,
    CModalHeader, 
    CModalBody,
  },
  data(){
    return{
      items: [],
      temp: [],
      newImage: "",
      merchants: [],
      toAddMerchant: "",
      selectedCategory: "",
      selectedSort: 'productName ASC',
      toAdd: false,
    };
  },
  mounted() {
    this.getMerchants();
    this.getProducts();
  },
  methods:{
    async getProducts() {
      try {
        const response = await axios.get("http://localhost:5000/products");
        this.temps = response.data;
        this.items = [];
        for(let i =0; i < this.temps.length ; i++){
          if(this.temps[i].merchantCategory == this.selectedCategory){
            this.temps[i].image = Buffer.from(this.temps[i].image).toString('base64');
            this.items.push(this.temps[i]);
          }
        }
      } catch (err) {
        console.log(err);
      }
      try{
        this.id = await window.ethereum.request({method: "eth_accounts"});

        if(this.id.length > 0){
          this.logged = true;
        }
      }
      catch (err) {
        console.log(err);
      }
  },
  checking(id){
      if( document.getElementById("name").value != "" && document.getElementById("stock").value != "" && document.getElementById("description").value != "" && document.getElementById("preservation").value != "" && document.getElementById("price").value > 0 && document.getElementById("price").value != ""){
          document.getElementById(id).removeAttribute("disabled");
          return true;
      }
      else{
        document.getElementById(id).setAttribute("disabled","disabled");
        alert("All field must be fill");
        return false;
      }
    },
    async updateDatabse(id){
      const response = await axios.put("http://localhost:5000/product/updateAll",{
        productName: document.getElementById("name").value,
        price: document.getElementById("price").value,
        stock: document.getElementById("stock").value,
        description: document.getElementById("description").value,
        preservation: document.getElementById("preservation").value,
        productID: id,
      });
      console.log(response);
    },
    validation(){
      if( document.getElementById("Image").files.length != 0 && document.getElementById("Name").value != "" && document.getElementById("Stock").value != "" && document.getElementById("Description").value != "" && document.getElementById("Preservation").value != "" && document.getElementById("Price").value > 0 && document.getElementById("Price").value != "" && this.toAddMerchant != "" ){
        document.getElementById("adding").removeAttribute("disabled");
      }
      else{
        document.getElementById("adding").setAttribute("disabled","disabled");
      }
    },
    async addNew(){
      
      let img = document.querySelector('img');
      let merchant = this.toAddMerchant;
      let canvas = document.createElement('canvas');
      canvas.width = img.clientWidth;
      canvas.height = img.clientHeight;

      let context = canvas.getContext('2d');

      context.drawImage(img, 0, 0);

      canvas.toBlob(async function(blob) 
      {
        await axios.post("http://localhost:5000/productCreate",{
        productName: document.getElementById("Name").value,
        stock: document.getElementById("Stock").value, 
        cryptoType: document.getElementById("toAddFundType").value, 
        price: document.getElementById("Price").value, 
        merchantCategory: merchant, 
        description: document.getElementById("Description").value, 
        preservation: document.getElementById("Preservation").value,
        image: blob,
        
      });

      await axios.put(`http://localhost:5000/merchantPlus/${merchant}`);

      window.location.reload();

      console.log(blob);
      }, 'image/*');

    },  
    async removeProduct(ID){
      if(confirm("Are you sure wan to change status for \"" + document.getElementById("name").value +"\" ?")){
        await axios.get(`http://localhost:5000/product/updateStatus/${ID}`);
        alert("Status Changed");
        window.location.reload();
      }
    },
    async getMerchants(){
      try{
        const response = await axios.get("http://localhost:5000/allMerchants");
        this.merchants = response.data;
        this.selectedCategory = this.merchants[0].merchantCategory;
      } catch (e){
        console.log(e);
      }
    },
    changeMerchant(fund){
      document.getElementById("toAddFundType").value = fund;
    }
  }
}
  let Script6 = document.createElement("script");
  let Script7 = document.createElement("script");

  Script6.setAttribute("src","https://code.jquery.com/jquery-3.5.1.js");
  Script7.setAttribute("src","https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js");

  document.head.appendChild(Script6);
  document.head.appendChild(Script7);
</script>

<style>
  .filter {
    width: 270px;
    margin-left: 1%;
    margin-right: 1%;
    margin-top: .25%;
    float: left;
  }
  
  .content {
    width: 79%;
    min-height: 50%;
  }

  #page-container {
    position: relative;
    min-height: 200vh;
  }

</style>