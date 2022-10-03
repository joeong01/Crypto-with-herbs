<template>
  <div>
    <div v-if="products.length == 0">
      <span style="font-size:30px; aligment:center;">There is no product in cart.</span>
    </div>
    <div v-else >
      <div >
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
            <tr v-for="product in products" :key="product.id">
              <td>{{ product.image }}</td>
              <td>{{ product.name }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.number }}</td>
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
      id: '',
      total: 0,
    }
  },
  created(){
    this.getCart();
  },
  methods: {
    async getCart(){
      try{
      this.id = await window.ethereum.request({method: "eth_accounts"});

      const response = await axios.get(`http://localhost:5000/cart/${this.id}`);
      this.products = response.data;
      console.log(this.products);

      for(let i =0; i < this.products.length; i ++){
        this.total += this.products[i].number * this.products[i].price;
        let subTotal = this.products[i].number * this.products[i].price;
        this.products[i].push(subTotal);
      }
      console.log(this.products);
      }
      catch (e){
        console.log(e);
      }
    },
    increment(product, number) {
      this.$emit("increment", product, number);
    },
    decrement(product, number) {
      this.$emit("decrement", product, number);
    },
    delete(product) {
      this.$emit("delete", product);
    },
  },
};
</script>