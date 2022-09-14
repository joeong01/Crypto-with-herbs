<template>
    <div>
        <vue-metamask ref="metamask" :initConnect="false"></vue-metamask>
        <CCard class="text-center" style="width:fit-content; margin-left: 33%; background-color:azure">
            <CCardBody>
                <CCardTitle>Log In or Create An Account</CCardTitle>
                <CCardText>Please link crypto-wallet in order to sign in. No funds are necessary or will be withdrawn.</CCardText>
                <CButton @onclick="connect"><img orientation="left" src="../../assets/Metamask.png" style="margin-right:10$;" />Connect with MetaMask</CButton>
            </CCardBody>
        </CCard>

        <vue-metamask userMessage="msg" @onComplete="onComplete"/>
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
                msg: "Connected to the Metamask successfuly",
                result: "",
                temp: [],
                found: false,
                countDown : 2,
            }
        },
        computed:{
            getLength(){
                return (this.result.length ==1) ;
            }
        },
        methods:{
            async onComplete(data){
                console.log('data:', data);
                try {
                    this.result = await window.ethereum.request({method: "eth_accounts",});
                    console.log(this.result);

                    if(this.getLength){

                        try{
                            const response = await axios.get("http://localhost:5000/users");
                            this.temp = response;

                            for(let i = 0; i < this.temp.length ; i++){
                                if(this.temp[i].userID == this.result && this.temp[i].userType == "customer"){
                                    alert("Connected to the Metamask successfuly");
                                    this.countDownTimer();
                                }
                            }

                            if(!this.found){
                                alert("Creating account for you");
                                await axios.post("http://localhost:5000/users", {
                                    userID: this.result,
                                    userType: "Customer",
                                });
                            }
                        } catch (e){
                            console.log(e);
                        }
                        
                    }
                } catch (e) {
                    console.log(e);
                }
            },
            countDownTimer() {
                if(this.countDown > 0) {
                    setTimeout(() => {
                        this.countDown -= 1
                        this.countDownTimer()
                    }, 1000)
                }
                else{
                    this.$router.push('/');
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