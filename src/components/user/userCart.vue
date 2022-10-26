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
              <td>
                <input :id="product.productID" type="number" :value="product.numberProduct" min="1" :max="product.stock" @change="checking(product.stock,product.productID, product.productName, product.price)" style="width: 100px;" required>
              </td>
              <td>{{ product.subtotal }}</td>
              <td><button style="width: 100px; height: 100px; background-color: transparent; border: none;" @click="delete(product.productId)"><CIcon :icon="cilTrash" size="sm"/></button></td>
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
import { cilTrash } from '@coreui/icons';

export default {
  components: {
    CIcon,
  },
  setup() {
    return {
      cilTrash,
    }
  },
  data(){
    return{
      products: [],
      temp: [],
      toast: [],
      total: 0,
      cartID: "",
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
    checking(max,id,name,price){
      if(document.getElementById(id).value > max){
        document.getElementById(id).value = max;

        alert( name + " has reach maximum value");
      }
      else if(document.getElementById(id).value < 1){
        document.getElementById(id).value = 1;
        alert( name + " has reach minimum value");
      }
      
      this.update(id,price);
    },
    async update(id,price){
      let sub = price * document.getElementById(id).value;
      await axios.put("http://localhost:5000/cart/updateDetail",{
        subtotal: sub,
        newNumber: document.getElementById(id).value,
        cartID: this.cartID,
        productID: id,
      });

      await axios.put("http://localhost:5000/cart/updateTotal",{
        userID: this.cartID,
        cartID: this.cartID,
      });

      location.reload();
    },
    // eslint-disable-next-line no-unused-vars
    delete(product) {
      return ;
    },
    async getID(){
      this.cartID = await window.ethereum.request({method: "eth_accounts"});
      console.log(this.cartID);
    }
  }
};
</script>

<style>
  td{
    font-size: 30px;
    font-weight: 2px;
  }

</style>