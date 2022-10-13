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
              <CFormCheck type="radio" :button="{ color: 'dark', variant: 'outline' }" name="categoryList" :id="category.merchantCategory" :label="category.merchantName"  @click="selectedCategory = category.merchantCategory ; getProducts()" checked/>
            </div>
          </CButtonGroup>
        </div>
        <div class="card-body">
          <h6>Sorting</h6>
          <hr>
          <h6>Herb Name</h6>
          <CButtonGroup vertical role="group" aria-label="Horizontal button group">
            <CFormCheck type="radio" :button="{ color: 'dark', variant: 'outline' }" name="sorting" id="sorting1" autocomplete="off" label="Ascending" @click="sort = 'productName ASC'; getProducts()" checked/>
            <CFormCheck type="radio" :button="{ color: 'dark', variant: 'outline' }" name="sorting" id="sorting2" autocomplete="off" label="Descending" @click="sort = 'productName DESC'; getProducts()" />
          <br><br>
          <h6>Price</h6>
            <CFormCheck type="radio" :button="{ color: 'dark', variant: 'outline' }" name="sorting" id="sorting3" autocomplete="off" label="Ascending" @click="sort = 'price ASC'; getProducts()" />
            <CFormCheck type="radio" :button="{ color: 'dark', variant: 'outline' }" name="sorting" id="sorting4" autocomplete="off" label="Descending" @click="sort = 'price DESC'; getProducts()" />
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
                      <CModelFooter v-if="logged && sameMerchant">
                          <CDropdown :color="primary" :togglerText="count" style="margin-bottom: 3%; margin-right: 10%" direction="center">
                            <CDropdownToggle :color="primary">{{count}}</CDropdownToggle>
                            <CDropdownMenu style="width: fit-content; height: fit-content;">
                              <div v-if="item.stock>15">
                                <div  v-for="(n,index) in 15" :key="index">
                                  <CDropdownItem @click="count = n">{{ n }}</CDropdownItem>
                                </div>
                              </div>
                              <div v-else>
                                <div  v-for="(n,index) in item.stock" :key="index">
                                  <CDropdownItem @click="count = n">{{ n }}</CDropdownItem>
                                </div>
                              </div>
                            </CDropdownMenu>
                          </CDropdown>
                        <CButton color="primary" @click="selectedProduct = 'item.productID'; check(); item.details = 0" style="margin-bottom: 3%;">Add to Cart</CButton>
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
      cart: [],
      merchants: [""],
      tabPanePillsActiveKey: 1,
      selectedCategory: '',
      selectedProduct: '',
      sort: 'productName ASC',
      count: 1,
      logged: false,
      sameMerchant: true,
      id: "",
    };
  },
  created() {
    this.getProducts();
    this.getMerchants();
  },
  methods:{
    async getProducts() {
      try {
        const response = await axios.get(`http://localhost:5000/productsSort/${this.sort}`)
        this.temps = response.data;
        this.items = [];

        for(let  i =0; i < this.temps.length; i++){
          if (this.temps[i].merchantCategory === this.selectedCategory){
            this.temps[i].image = Buffer.from(this.temps[i].image).toString('base64');
            this.items.push(this.temps[i]);
          }
        }

        console.log(this.items);
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
    async check(){
      try{
        const response = await axios.get(`http://localhost:5000/cart/${this.id}`);

        this.cart = response.data;
        if(this.cart.length != 0){
          if(this.cart[0].merchantCategory != this.selectedCategory){
            if(confirm("Only 1 type or merchant can be choose to add to cart\nDelete previous type of Merchant to add in new?") == true){
              const response = await axios.get(`http://localhost:5000/cart/remove/${this.id}`);
              console.log(response);
            }
          }
          else{
            this.addToCart();
          }
        }
      }
      catch (err) {
        console.log(err); 
      }
    },
    async addToCart(){
      try {
        let newItem = false;

        if(this.cart.length !=0){
          for(let i =0;i < this.cart.length; i++){
            if(this.cart[i].productID == this.selectedProduct){
              try {
                await axios.put(`http://localhost:5000/cart/addMore/${this.id}`,
                  {
                    number : this.count,
                    userID : this.id,
                    productID: this.selectedProduct,
                  }
                );
              } catch (e) {
                console.log(e);
              }
            }
          }
        }

        if(!newItem){
          try {
            await axios.post(`http://localhost:5000/cart/addNew${this.id}`,
              {
                number : this.count,
                userID : this.id,
                productID: this.selectedProduct,
              }
            );
            newItem = true;
          } catch (e) {
            console.log(e);
          }
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