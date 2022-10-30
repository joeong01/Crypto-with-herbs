<template>
  <div>
    <div v-if="products.length == 0">
      <span style="font-size: 30px; margin-left: 42%;">There is no product in cart.</span>
    </div>
    <div v-else >
      <div style="margin-left:16%;">
        <table style="width: 80%;">
          <thead>
            <tr >
              <th style="width: 300px;">Product</th>
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
              <td>{{cryptoType}} {{ product.price }}</td>
              <td>
                <input :id="product.productID" type="number" :value="product.numberProduct" min="1" :max="product.stock" @change="checking(product.stock, product.productID, product.productName, product.price)" style="width: 100px;" required>
              </td>
              <td>{{cryptoType}} {{ product.subtotal }}</td>
              <td><button style="width: 100px; height: 100px; background-color: transparent; border: none;" @click="toDelete(product.productName,product.productID)"><CIcon :icon="cilTrash" size="sm" /></button></td>
            </tr>
            <br>
            <tr>
              <th colspan="4">Total</th>
              <td>{{cryptoType}} {{ total }}</td>
            </tr>
            <tr>
              <td colspan="6"><CButton component="a" color="primary" shape="rounded-pill" href="/checkOut" role="button">Proceed to check out</CButton></td>
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
import { CButton } from '@coreui/vue';

export default {
  components: {
    CIcon,
    CButton,
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
      total: 0,
      cryptoType: "",
      cartID: "",
    }
  },
  created(){
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
        this.cryptoType = this.products[0].cryptoType;
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
      let num = document.getElementById(id).value;
      let sub = price * num;
      let ID = await window.ethereum.request({method: "eth_accounts"});

      await axios.put("http://localhost:5000/cart/updateDetail",{
        newNumber: num,
        subtotal: sub,
        cartID: ID,
        productID: id,
      });

      await axios.get("http://localhost:5000/cart/updateTotal",{
        userID: this.cartID,
        cartID: this.cartID,
      });

      location.reload();
    },
    async toDelete(name,id) {
      if(confirm("Delete " + name + " from cart??")){
        try{
          let ID = await window.ethereum.request({method: "eth_accounts"});
          let sr = (await axios.get("http://localhost:5000/cart/removeItem",{
            cartID: ID,
            productID: id,
          }));

          console.log(sr);

          await axios.get("http://localhost:5000/cart/updateTotal",{
            userID: this.cartID,
            cartID: this.cartID,
          });
          
          alert("Removed");

          location.reload();
        } catch (e){
          console.log(e);
        }
      }
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