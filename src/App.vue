<template>
    <userFrame v-if="!role" />
    <adminFrame v-else/>

</template>

<script>
import userFrame from './components/user/userFrame.vue'
import adminFrame from './components/admin/adminFrame.vue';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    userFrame,
    adminFrame,
  },
  data(){
    return{
      id: "",
      temps:[],
      role: false,
    }
  },
  created(){
    this.getID();
  },
  methods:{
    async getID(){
      try{
        this.id = await window.ethereum.request({method: "eth_accounts",});

        if(this.id.length != 0){
          const response = await axios.get("http://localhost:5000/users");
          this.temps = response.data;

          for(let  i =0; i < this.temps.length; i++){
            if(this.temps[i].userID == this.id){
              if(this.temps[i].userType == "admin"){
                this.role = true;
                console.log("Its Admin"); 
              }
              else{
                console.log("Not admin"); 
              }
            }
          }
        }
      }
      catch (err) {
        console.log(err); 
      }
    }
  }
}
</script>