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
            <CFormCheck type="radio" :button="{ color: 'dark', variant: 'outline' }" name="categoryList" id="categoryList1" autocomplete="off" label="Merchant 1" @click="selectedCategory = 'M1'; getProducts" checked/>
            <CFormCheck type="radio" :button="{ color: 'dark', variant: 'outline' }" name="categoryList" id="categoryList2" autocomplete="off" label="Merchant 2" @click="selectedCategory = 'M2'; getProducts" />
            <CFormCheck type="radio" :button="{ color: 'dark', variant: 'outline' }" name="categoryList" id="categoryList3" autocomplete="off" label="Merchant 3" @click="selectedCategory = 'M3'; getProducts" />
            <CFormCheck type="radio" :button="{ color: 'dark', variant: 'outline' }" name="categoryList" id="categoryList4" autocomplete="off" label="Merchant 4" @click="selectedCategory = 'M4'; getProducts" />
            <CFormCheck type="radio" :button="{ color: 'dark', variant: 'outline' }" name="categoryList" id="categoryList5" autocomplete="off" label="Merchant 5" @click="selectedCategory = 'M5'; getProducts" />
          </CButtonGroup>
        </div>
        <div class="card-body">
          <h6>Sorting</h6>
          <hr>
          <h6>Herb Name</h6>
          <CButtonGroup vertical role="group" aria-label="Horizontal button group">
            <CFormCheck type="radio" :button="{ color: 'dark', variant: 'outline' }" name="sorting" id="sorting1" autocomplete="off" label="Ascending" @click="sort = 'ASCname';" checked/>
            <CFormCheck type="radio" :button="{ color: 'dark', variant: 'outline' }" name="sorting" id="sorting2" autocomplete="off" label="Descending" @click="sort = 'DESCname';" />
          <br><br>
          <h6>Price</h6>
            <CFormCheck type="radio" :button="{ color: 'dark', variant: 'outline' }" name="sorting" id="sorting3" autocomplete="off" label="Ascending" @click="sort = 'ASCprice';" />
            <CFormCheck type="radio" :button="{ color: 'dark', variant: 'outline' }" name="sorting" id="sorting4" autocomplete="off" label="Descending" @click="sort = 'DESCprice';" />
          </CButtonGroup>
        </div>
      </div>
    </div>
    <div style="height: fit-content; ">
      <CRow :xs="{ gutter: 4}" :md="{ cols: 5 }" style="height: fit-content"  >
        <div v-for="item in items" :key="item.id" >
          <CCol style="width: 400px; padding: 0;" >
            <CCard class="text-center h-800" style="height: 500px;">
              <CCardImage orientation="top" :src="`data:image/jpg;base64,${item.image}`" style="width: auto; height: 300px"  />
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
                      <img width=500px height=500px :src="`data:image/jpg;base64,${item.image}`" />
                      <h4 style="margin-bottom: 15px;"><span style="color: black;">Price: {{ item.cryptoType }} {{ item.price }}</span></h4>
                      <CNav variant="tabs" role="tablist">
                        <CNavItem>
                          <CNavLink href="javascript:void(0);" :active="tabPanePillsActiveKey === 1" @click="() => {tabPanePillsActiveKey = 1}"><span style="color: black;">Description</span></CNavLink>
                        </CNavItem>
                        <CNavItem>
                          <CNavLink href="javascript:void(0);" :active="tabPanePillsActiveKey === 2" @click="() => {tabPanePillsActiveKey = 2}"><span style="color: black;">Preservation Method</span></CNavLink>
                        </CNavItem>
                        <CTabContent>
                          <CTabPane role="tabpanel" :visible="tabPanePillsActiveKey === 1" style="background-color: transparent;"><span style="color: black;"><br><br>{{ item.description }}</span></CTabPane>
                          <CTabPane role="tabpanel" :visible="tabPanePillsActiveKey === 2" style=" background-color: transparent;"><span style="color: black;"><br><br><br><br>{{ item.preservation }}</span></CTabPane>
                        </CTabContent>
                      </CNav>
                    </CModalBody>
                    <CModalFooter>
                      <span style="color: black;">
                      <CDropdown :color="primary" :togglerText="count" style="margin-right: 50px">
                        <CDropdownToggle :color="primary">{{count}}</CDropdownToggle>
                        <CDropdownMenu>
                          <div v-for="(n,index) in 10" :key="index">
                            <CDropdownItem @click="count = n">{{ n }}</CDropdownItem>
                          </div>
                        </CDropdownMenu>
                      </CDropdown>
                      </span>
                      <CButton color="primary">Add to Cart</CButton>
                    </CModalFooter>
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
// eslint-disable-next-line no-unused-vars
import { CCard, CCardHeader, CCardImage, CCardSubtitle, CCardText, CCardTitle, CButtonGroup, CButton, CFormCheck, CCollapse, CModal, CModalHeader, CModalBody, CModalFooter, CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/vue'

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
      items:[],
      temps:[],
      tabPanePillsActiveKey: 1,
      selectedCategory: 'M1',
      sort: 'ASCname',
      count: 1,
    };
  },
  created() {
    this.getProducts();
  },
  methods:{
    async getProducts() {
      try {
        const response = await axios.get("http://localhost:5000/products");
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
    },
    sorting(){
      this.temps = this.items;
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