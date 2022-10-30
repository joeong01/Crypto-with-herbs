<template>
    <div>
        <vue-metamask ref="metamask" :initConnect="false"></vue-metamask>
        <CCard class="text-center" style="width:fit-content; margin-left: 33%; background-color:azure">
            <CCardBody>
                <CCardTitle>Log In or Create An Account</CCardTitle>
                <CCardText>Please link crypto-wallet in order to sign in. No funds are necessary or will be withdrawn.</CCardText>
                <CButton @onclick="connect()"><img orientation="left" src="../../assets/Metamask.png" style="margin-right:10$;" />Connect with MetaMask</CButton>
            </CCardBody>
        </CCard>
        <vue-metamask @onComplete="checking()"/>
    </div>
</template>

<script>
import VueMetamask from 'vue-metamask';
import { CCard, CCardText}from '@coreui/vue';
import axios from 'axios';

    export default {
        name: "MetaMaskData",
        components: {
            VueMetamask,
            CCard, 
            CCardText
        },
        data(){
            return {
                result: "",
                temp: [],
            }
        },
        created(){
            this.checking();
        },
        methods:{
            async checking(){
                this.result = await window.ethereum.request({method: "eth_accounts",});
                const response = await axios.get("http://localhost:5000/getUsers");
                this.temp = response.data;
                let found = false;
                
                if(this.result.length != 0){
                    try{

                        for(let i = 0; i < this.temp.length ; i++){
                            if(this.temp[i].userID == this.result){
                                found = true;

                                if(this.temp[i].userType == "Customer"){
                                    alert("LogIn sucessfully");
                                    this.$router.push('/'); 
                                }
                                else{
                                    alert("LogIn sucessfully");
                                    this.$router.push('/admin');
                                }
                                
                            }
                        }

                        if (!found){
                            if (confirm("Creating account for you")== true) {
                                await axios.post("http://localhost:5000/createUsers", {
                                    userID: this.result,
                                    userType: "Customer",
                                });

                                await axios.put("http://localhost:5000/cart/addNewUser",{
                                    cartID: this.result,
                                    userID: this.result,
                                });
                                
                                if (alert("Connected to the Metamask successfuly, back to homepage") == true) {
                                    this.$router.push('/');
                                }
                            }
                        }
                    } catch (e){
                        console.log(e);
                    }
                }
                else{
                    window.location.reload();
                }
            },
            connect() {
                this.$refs.metamask.init();
            }
        }
    }
</script>

<style>
    img{
        width: 100px;
        height: 100px;
    }
</style>