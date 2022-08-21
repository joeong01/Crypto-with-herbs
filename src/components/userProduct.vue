<template>
  <div class="float-container" style="margin-bottom: 30%;">
    <div class="filter">
      <!--search card-->
      <div class="card shadow mt-3">
        <div class="card-header">
          <h5>filter and Sort
            <button type="submit" class="btn btn-primary btn-sm float-end" style="margin-left:15%">Search</button>
          </h5>
        </div>
        <div class="card-body">
          <h6>Category List</h6>
          <hr>
          <CButtonGroup vertical role="group" aria-label="Vertical button group">
            <CFormCheck type="radio" :button="{ color: 'dark', variant: 'outline' }" name="vbtnradio" id="vbtnradio1" autocomplete="off" label="Merchant 1" @click="getProductsByCat(M1)" checked/>
            <CFormCheck type="radio" :button="{ color: 'dark', variant: 'outline' }" name="vbtnradio" id="vbtnradio2" autocomplete="off" label="Merchant 2" @click="getProductsByCat(M2)" />
            <CFormCheck type="radio" :button="{ color: 'dark', variant: 'outline' }" name="vbtnradio" id="vbtnradio3" autocomplete="off" label="Merchant 3" @click="getProductsByCat(M3)" />
            <CFormCheck type="radio" :button="{ color: 'dark', variant: 'outline' }" name="vbtnradio" id="vbtnradio4" autocomplete="off" label="Merchant 4" @click="getProductsByCat(M4)" />
            <CFormCheck type="radio" :button="{ color: 'dark', variant: 'outline' }" name="vbtnradio" id="vbtnradio5" autocomplete="off" label="Merchant 5" @click="getProductsByCat(M5)" />
          </CButtonGroup>
        </div>
        <div class="card-body">
          <h6>Sorting</h6>
          <hr>
          <h6>Herb Name</h6>
          <input type="radio" name="type" value="book.ISBN_13 ASC"> Ascending
          <input type="radio" name="type" value="book.ISBN_13 DESC"> Descending
          <br><br>

          <h6>Price</h6>
          <input type="radio" name="type" value="book.bookName ASC"> Ascending
          <input type="radio" name="type" value="book.bookName DESC"> Descending
          <br><br>
        </div>
      </div>
    </div>
    <div class="herb">
      <CRow :xs="{ cols: 1, gutter: 4}" :md="{ cols: 5 }" >
        <div v-for="item in items" :key="item.name">
        <CCol xs>
          <CCard class="text-center h-100">
            <CCardImage orientation="top" v-bind:src="'data:image/jpeg;base64,'+item.picture"/>
            <CCardBody> 
              <CCardTitle>{{ item.name }}</CCardTitle>
              <CCardText>Price: {{ item.cryptoType }} {{ item.price }}</CCardText>
            </CCardBody>
            <CCardFooter>
              <CButton color="primary" @click="item.details = 1">Details</CButton>
                <span style="color: black;">
                  <CModal size="xl" alignment="center" scrollable :visible="item.details" @close="item.detail = 0">
                    <CModalHeader>
                      <CModalTitle><span style="color: black;">{{ item.name}}</span></CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <CNav variant="tabs" role="tablist">
                        <CNavItem>
                          <CNavLink href="javascript:void(0);" :active="tabPanePillsActiveKey === 1" @click="() => {tabPanePillsActiveKey = 1}"> Description</CNavLink>
                        </CNavItem>
                        <CNavItem>
                          <CNavLink href="javascript:void(0);" :active="tabPanePillsActiveKey === 2" @click="() => {tabPanePillsActiveKey = 2}">Preservation Method</CNavLink>
                        </CNavItem>
                        <CTabContent>
                          <CTabPane role="tabpanel" aria-labelledby="description" :visible="tabPanePillsActiveKey === 1">{{ item.description }}</CTabPane>
                          <CTabPane role="tabpanel" aria-labelledby="preservation" :visible="tabPanePillsActiveKey === 2">{{ item.preservation }}</CTabPane>
                        </CTabContent>
                      </CNav>
                    </CModalBody>
                    <CModalFooter>
                      <CButton color="secondary" @click="item.details = 0">
                        Close
                      </CButton>
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
// eslint-disable-next-line no-unused-vars
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { CCard, CCardHeader, CCardImage, CCardSubtitle, CCardText, CCardTitle, CButtonGroup, CButton, CFormCheck, CCollapse, CModal, CModalHeader, CModalBody, CModalFooter, CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/vue'

export default {
  components: {
    CCard, 
    CCardImage, 
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
      tabPanePillsActiveKey: 1,
    };
  },
  created() {
    //this.getProducts();
    this.getProductsByCat();
  },
  methods:{
    async getProductsByCat(){
      try{
        const response = await axios.get('http://localhost:5000/products/${category}');
        this.items=response.data;
        console.log(this.items);
      }catch(err){
        console.log(err);
      }
    },
    // async getProducts() {
    //   try {
    //     const response = await axios.get("http://localhost:5000/products");
    //     this.items = response.data;
    //     console.log(this.items);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
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
    min-height: 100vh;
  }

</style>