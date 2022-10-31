<template>
    <div class="container">
        <div class="billing_details">
            <div class="row">
                <div class="col-lg-7">
                    <h3>Billing Details</h3>
                    <form class="row contact_form">
                        <div class="col-md-6 form-group p_star">
                            <input type="text" class="form-control" id="Name" name="name" placeholder="Name" @change="checking()" />
                        </div>
                        <div class="col-md-6 form-group p_star">
                            <input type="text" class="form-control" id="number" name="number" placeholder="Phone number" @change="checking()" />
                        </div>
                        <div class="col-md-12 form-group p_star">
                            <textarea type="text" class="form-control" id="address" name="address" placeholder="address" rows="3" @change="checking()" ></textarea>
                        </div>
                        <div class="col-md-12 form-group">
                            <textarea class="form-control" name="remarks" id="remarks" rows="1" placeholder="Remarks" maxlength="100"></textarea>
                        </div>

                        <CButton id="toPay" @click="payment()" color="primary" shape="rounded-pill" >Pay with Metamask</CButton>
                    </form>
                </div>
                <div class="col-lg-5">
                    <div class="order_box">
                        <h2>Prices</h2>
                        <table style="width: 500px;">
                            <tr>
                                <th>Coin: </th>
                                <td>{{ cryptoType }}</td>
                            </tr>
                            <tr>
                                <th>Subtotal:</th>
                                <td>{{ cart }}</td>
                            </tr>
                            <tr>
                                <th>Plateform Charge:</th>
                                <td>{{ toCharge }} ({{ charges}}%)</td>
                            </tr>
                            <tr>
                                <th>Total:</th>
                                <td>{{ total }}</td>
                            </tr>
                            <tr>
                                <th>Account Balance:</th>
                                <td>{{ balance }}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import {CButton} from '@coreui/vue';
import Web3 from 'web3';

export default {
    name: 'checkOut',
    components: {
        CButton,
    },
    data(){
        return{
            cart: 0,
            cryptoType: "",
            merchant: "",
            charges: 0,
            toCharge: 0,
            total: 0,
            balance: "",
            done: false,
        }
    },
    mounted() {
        this.getCart();
    },
    methods:{
        async getCart() {
            try{
                let ID = await window.ethereum.request({method: "eth_accounts"});
                const response = await axios.get(`http://localhost:5000/cart/${ID}`);
                this.cart = response.data[0].totalprice;
                this.merchant = response.data[0].merchantType;
                this.cryptoType = (await axios.get(`http://localhost:5000/cartDetail/${ID}`)).data[0].cryptoType;     
                this.charges = (await axios.get(`http://localhost:5000/merchant/merchantCharge/${this.merchant}`)).data[0].platformCharges;
                this.toCharge = this.cart * this.charges;
                
                this.total = (this.cart + this.toCharge).toFixed(7);
                let web3= new Web3(Web3.givenProvider);
                this.balance = (await web3.eth.getBalance( (await web3.eth.getAccounts()).toString()))/10**18;

                document.getElementById("toPay").setAttribute("disabled","disabled");

            }
            catch (e){
                console.log(e);
            }
        },
        checking(){
            if( document.getElementById("Name").value != "" && document.getElementById("number").value != "" && document.getElementById("address").value != "" ){
                if( this.balance>this.total ){
                    document.getElementById("toPay").removeAttribute("disabled");
                    document.getElementById("remarks").value = " ";
                }
                else{
                    alert("Not enough fund to pay");
                }
            }
            else{
                document.getElementById("toPay").setAttribute("disabled","disabled");
            }
        },
        async payment(){
            let hex = (this.total*10**18);
            let web3= new Web3(Web3.givenProvider);
            let account = (await web3.eth.getAccounts()).toString();
            
            await web3.eth.sendTransaction({
                from: account,
                to: "0xf71beb0f1512cf8447cd4d5cc8bc424b5d5d118a",
                value: hex,
            }).then(async function(reciept){
                console.log(reciept);
            });

            if((await web3.eth.getBalance( (await web3.eth.getAccounts()).toString())/10**18) != this.balance){
                this.createReciept();
            }
            
        },
        async createReciept(){
            let ID = await window.ethereum.request({method: "eth_accounts"});
            const response = await axios.get(`http://localhost:5000/productsFS/${this.merchant}`);
            let temps = response.data;
            let fund = (this.total*(1-this.toCharge)).toFixed(7);

            let temp = (await axios.get(`http://localhost:5000/cartDetail/${ID}`)).data;
            
            for(let i =0; i< temp.length; i++){
                for(let o = 0; o < temps.length; o++){
                    if(temp[i].productID == temps[o].productID){
                        let toSet = temps[o].stock - temp[i].numberProduct;
                        await axios.put(`http://localhost:5000/product/reduceStock/${temp[i].productID}`,{
                            stock: toSet,
                        });
                    }
                }
            }
            await axios.put("http://localhost:5000/merchant/updateFund",{
                fund: fund,
                id: this.merchant,
            });
            await axios.get(`http://localhost:5000/cart/remove/${ID}`);
            await axios.put(`http://localhost:5000/cart/reset/${ID}`);

            alert("done payment");
            this.$router.push('/');
        },
        async testing(){

        }
    } 
};
</script>
