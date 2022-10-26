<template>
  <div class="float-container" style="margin-bottom: 30%;">
    <div class="filter">
      <!--search card-->
      <div class="card shadow mt-3">
        <div class="card-header">
          <h5>filter and Sort</h5>
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
        <div class="card-body">
          <h6>Sorting</h6>
          <hr>
          <h6>Herb Name</h6>
          <CButtonGroup vertical role="group" aria-label="Horizontal button group">
            <CFormCheck type="radio" :button="{ color: 'dark', variant: 'outline' }" name="sorting" id="sorting1" label="Ascending" @click="selectedSort = 'productName ASC'; getProducts()" checked/>
            <CFormCheck type="radio" :button="{ color: 'dark', variant: 'outline' }" name="sorting" id="sorting2" label="Descending" @click="selectedSort = 'productName DESC'; getProducts()" />
          <br><br>
          <h6>Price</h6>
            <CFormCheck type="radio" :button="{ color: 'dark', variant: 'outline' }" name="sorting" id="sorting3" label="Ascending" @click="selectedSort = 'price ASC'; getProducts()" />
            <CFormCheck type="radio" :button="{ color: 'dark', variant: 'outline' }" name="sorting" id="sorting4"  label="Descending" @click="selectedSort = 'price DESC'; getProducts()" />
          </CButtonGroup>
        </div>
      </div>
    </div>
    <div style="height: fit-content; ">
      <CRow :xs="{ gutter: 4}" :md="{ cols: 5 }" style="height: fit-content"  >
        <div v-for="item in items" :key="item.id" >
          <CCol style="width: 400px; padding: 0;" >
            <CCard class="text-center h-800" style="height: 500px;">
              <CCardImage orientation="top" :src="`data:image/jpg;base64,${item.image}`" style="width: auto; height: 300px"/>
              <CCardBody>
                <CCardTitle>{{ item.productName }}</CCardTitle>
                <CCardText>Price: {{ item.cryptoType }} {{ item.price }}</CCardText>
              </CCardBody>
              <CCardFooter>
                <CButton color="primary" @click="item.details = 1">Details</CButton>
                <span style="color: transparent;">
                  <CModal size="lg" alignment="center" :visible="item.details" @close="item.details = 0; count = 1;" >
                    <CModalHeader>
                      <CModalTitle><span style="color: black;">{{ item.productName}}</span></CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <img style="width:300px; height:300px;" :src="`data:image/jpg;base64,${item.image}`" />
                      <h4 style="margin-bottom: 10px;"><span style="color: black;">Price: {{ item.cryptoType }} {{ item.price }}</span></h4><br>
                      <CNav variant="tabs" role="tablist">
                        <CNavItem>
                          <CNavLink href="javascript:void(0);" :active="tabPanePillsActiveKey === 1" @click="() => {tabPanePillsActiveKey = 1}"><span style="color: black;">Description</span></CNavLink>
                        </CNavItem>
                        <CNavItem>
                          <CNavLink href="javascript:void(0);" :active="tabPanePillsActiveKey === 2" @click="() => {tabPanePillsActiveKey = 2}"><span style="color: black;">Preservation Method</span></CNavLink>
                        </CNavItem>
                        <CTabContent>
                          <CTabPane role="tabpanel" :visible="tabPanePillsActiveKey === 1" style="background-color: transparent;"><span style="color: black; font-size: 15px;"><br>{{ item.description }}<br></span></CTabPane>
                          <CTabPane role="tabpanel" :visible="tabPanePillsActiveKey === 2" style=" background-color: transparent;"><span style="color: black; font-size: 15px;"><br><br>{{ item.preservation }}<br></span></CTabPane>
                        </CTabContent>
                      </CNav>
                    </CModalBody>
                    <span style="color: black;">
                      <CModelFooter v-if="logged">
                        <CDropdown :color="primary" :togglerText="count" style="margin-bottom: 3%; margin-right: 10%" direction="center">
                          <CDropdownToggle :color="primary">{{count}}</CDropdownToggle>
                          <CDropdownMenu style="width: fit-content; height: fit-content;">
                            <div v-if="item.stock>15">
                              <div v-for="(n,index) in 15" :key="index">
                                <CDropdownItem @click="count = n">{{ n }}</CDropdownItem>
                              </div>
                            </div>
                            <div v-else>
                              <div v-for="(n,index) in item.stock" :key="index">
                                <CDropdownItem @click="count = n">{{ n }}</CDropdownItem>
                              </div>
                            </div>
                          </CDropdownMenu>
                        </CDropdown>
                        <CButton color="primary" @click="selectedProduct = item.productID ; check(item.price); item.details = 0" style="margin-bottom: 3%;">Add to Cart</CButton>
                      </CModelFooter>
                      <CModalFooter v-else>
                        <CButton component="a" color="info" href="/LogIn" role="button"><b>Log In to add to cart</b></CButton>
                      </CModalFooter>
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
import { CCard, CCardText, CCardTitle, CButtonGroup, CButton, CFormCheck, CModal, CModalHeader, CModalBody, CModalFooter, CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/vue'

export default {
  components: {
    CCard, 
    CCardText, 
    CCardTitle,
    CButtonGroup,
    CButton,
    CFormCheck,
    CModal,
    CModalHeader, 
    CModalBody,
    CModalFooter,
    CNav,
    CNavItem,
    CNavLink,
    CTabContent,
    CTabPane 
  },
  data(){
    return{
      items: [],
      temp: [],
      merchants: [],
      tabPanePillsActiveKey: 1,
      selectedCategory: "",
      selectedSort: 'productName ASC',
      selectedProduct: '',
      count: 1,
      logged: false,
      id: "",
    };
  },
  mounted() {
    this.getMerchants();
    this.getProducts();
  },
  methods:{
    async getProducts() {
      try {
        const response = await axios.get(`http://localhost:5000/productsFS/${this.selectedSort}`);
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
    async check(price){
      try{
        let id = await window.ethereum.request({method: "eth_accounts"});
        const response = await axios.get(`http://localhost:5000/cart/${id}`);
        let owner = response.data;
        if(owner[0].totalprice != 0 ){
          if(owner[0].merchantType != this.selectedCategory){
            if(confirm("Only 1 type or merchant can be choose to add to cart\nDelete previous type of Merchant to add in new?") == true){
              await axios.get(`http://localhost:5000/cart/remove/${id}`);
              await axios.put(`http://localhost:5000/cart/reset/${id}`);
              alert("Cart has been cleared");
            }
          }
          else{
            this.addToCart(price);
          }
        }
        else{
          await axios.put("http://localhost:5000/cart/addNew",{
              cartID: id,
              productID: this.selectedProduct,
              price: price,
              numberProduct : this.count,
              subtotal: price * this.count,
            }
          );

          await axios.put("http://localhost:5000/cart/updateTotal",{
            userID: id,
            cartID: id,
          });
        
          await axios.put("http://localhost:5000/cart/updateMerchant",{
            merchantType: this.selectedCategory,
            cartID: id,
          });

          alert("New added into cart");
        }
      }
      catch (err) {
        console.log(err); 
      }
    },
    async addToCart(price){
      try {
        let found = false;
        let id = await window.ethereum.request({method: "eth_accounts"});
        const response = await axios.get(`http://localhost:5000/cartDetail/${id}`);
        let cart = response.data;

        for(let i =0; i < cart.length; i++){
          if(cart[i].productID == this.selectedProduct){
            found = true;
            await axios.put(`http://localhost:5000/cart/addMore/${id}`,{
              productID: this.selectedProduct,
              number : this.count,
              subtotal: price * this.count,
            });

            await axios.put("http://localhost:5000/cart/updateTotal",{
              userID: id,
              cartID: id,
            });

            alert("Added into cart");
          }
        }

        if(!found){
          await axios.put("http://localhost:5000/cart/addNew",{
            cartID: id,
            productID: this.selectedProduct,
            price: price,
            numberProduct : this.count,
            subtotal: price * this.count,
          }
        );

        await axios.put("http://localhost:5000/cart/updateTotal",{
          userID: id,
          cartID: id,
        });
        
        alert("New added into cart");
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getMerchants(){
      try{
        const response = await axios.get("http://localhost:5000/merchant");
        this.merchants = response.data;
        this.selectedCategory = this.merchants[0].merchantCategory;
      } catch (e){
        console.log(e);
      }
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