<template>
    <userFrame v-if="!role" />
    <AdminFrame v-else/>

</template>

<script>
import userFrame from './components/user/userFrame.vue'
import adminFrame from './components/admin/adminFrame.vue';
import axios from 'axios';
import AdminFrame from './components/admin/adminFrame.vue';

export default {
  name: 'App',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    userFrame,
    // eslint-disable-next-line vue/no-unused-components
    adminFrame,
    AdminFrame
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
  computed:{
    getLength(){
      return (this.id.length ==1) ;
    }
  },
  methods:{
    async getID(){
      try{
        this.id = await window.ethereum.request({method: "eth_accounts",});

        if(this.getLength()){
          const response = await axios.get("http://localhost:5000/users");
          this.temps = response.data;

          for(let  i =0; i < this.temps.length; i++){
            if(this.temps[0] === this.id){
              if(this.temps[1] == "admin"){
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

<style>

</style>
