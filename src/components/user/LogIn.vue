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
        <vue-metamask @onComplete="done()"/>
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
        methods:{
            async done(){
                try {
                    let found = false;
                    this.result = await window.ethereum.request({method: "eth_accounts",});
                    
                    if(this.result.length != 0){
                        try{
                            const response = await axios.get("http://localhost:5000/users");
                            this.temp = response.data;

                            for(let i = 0; i < this.temp.length ; i++){
                                if(this.temp[i].userID == this.result && this.temp[i].userType == "Customer"){
                                    this.$router.push('/');
                                    found = true;
                                }
                            }

                            if (!found){
                                if (confirm("Creating account for you")== true) {
                                    await axios.post("http://localhost:5000/users", {
                                        userID: this.result,
                                        userType: "Customer",
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
                } catch (e) {
                    console.log(e);
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