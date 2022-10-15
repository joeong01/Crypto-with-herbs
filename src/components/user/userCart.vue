<template>
  <div>
    <div v-if="products.length == 0">
      <span style="font-size: 30px; margin-left: 42%;">There is no product in cart.</span>
    </div>
    <div v-else >
      <div style="margin-left:16%;">
        <table style="width: 80%;">
          <thead>
            <tr>
              <th>Product</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>SubTotal</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.productID">
              <td style="width: 300px; height: 200px;"><img width="250px" height="250px" :src="`data:image/jpg;base64,${product.image}`" ></td>
              <td>{{ product.productName }}</td>
              <td>{{ product.cryptoType }} {{ product.price }}</td>
              <td><CIcon :icon="cilMinus" size="sm" @click="increment(product.productId)"/>{{ product.numberProduct }}<CIcon :icon="cilPlus" size="sm" @click="decrement(product.productId)"/></td>
              <td>{{ product.cryptoType }} {{ product.subtotal }}</td>
              <td><CIcon :icon="cilTrash" size="sm" @click="delete(product.productId)"/></td>
            </tr>
            <br>
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
import { cilTrash, cilPlus, cilMinus} from '@coreui/icons';

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
      temp: [],
      id: "",
      total: 0,
    }
  },
  created(){
    this.getID();
    this.getCart();
  },
  methods: {
    async getCart(){
      try{
        let ID = await window.ethereum.request({method: "eth_accounts"});
        const response = await axios.get(`http://localhost:5000/cartDetail/${ID}`);
        this.temp = response.data;

        for(let i =0;i <this.temp.length;i++){
          this.temp[i].image = Buffer.from(this.temp[i].image).toString('base64');
          this.products.push(this.temp[i]);
        }

        this.total = ((await axios.get(`http://localhost:5000/cart/${ID}`)).data)[0].totalprice;
        
      }
      catch (e){
        console.log(e);
      }
    },
    async getID(){
      this.id = await window.ethereum.request({method: "eth_accounts"});
    },
    // eslint-disable-next-line no-unused-vars
    increment(product, number) {
      return ;
    },
    // eslint-disable-next-line no-unused-vars
    decrement(product, number) {
      return ;
    },
    // eslint-disable-next-line no-unused-vars
    delete(product) {
      return ;
    },
  }
};
</script>

<style>
  td{
    font-size: 30px;
    font-weight: 2px;
  }

</style>