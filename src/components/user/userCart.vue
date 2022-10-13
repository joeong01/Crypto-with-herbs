<template>
  <div>
    <div v-if="products.length = 0">
      <span style="font-size:30px; aligment: center;">There is no product in cart.</span>
    </div>
    <div v-else >
      <div style="margin-left:30%;">
        <table >
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">SubTotal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.productID">
              <td>{{ product.image }}</td>
              <td>{{ product.productName }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.numberProduct }}</td>
              <td>{{ product.subTotal }}</td>
              <td><CIcon :icon="cilTrash" size="xl" onclick="delete(product.id)"/></td>
            </tr>
            <tr>
              <th colspan="4"><span style="padding-right: 3%">Total</span></th>
              <td>{{ total }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { CIcon } from '@coreui/icons-vue';
import { cilTrash, cilPlus, cilMinus } from '@coreui/icons';

export default {
  components: {
    CIcon,
  },
  setup() {
    return {
      cilTrash,
      cilPlus,
      cilMinus,
    }
  },
  data(){
    return{
      products: [],
      total: 0,
    }
  },
  created(){
    this.getCart();
  },
  methods: {
    async getCart(){
      try{
        let temp=[];
        let id = await window.ethereum.request({method: "eth_accounts"});

        const response = await axios.get(`http://localhost:5000/cartDetail/${id}`);
        temp = response.data;

        for(let i =0;i <temp.length;i++){
          temp[i].image = Buffer.from(temp[i].image).toString('base64');
          this.products.push(temp[i]);
        }

        this.total = ((await axios.get(`http://localhost:5000/cart/${id}`)).data)[0].totalprice;
        
        console.log(this.products);
      }
      catch (e){
        console.log(e);
      }
    },
    // eslint-disable-next-line no-unused-vars
    increment(product, number) {
    },
    // eslint-disable-next-line no-unused-vars
    decrement(product, number) {
    },
    // eslint-disable-next-line no-unused-vars
    delete(product) {
    },
  }
}
</script>