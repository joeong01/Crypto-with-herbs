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
                            <input type="text" class="form-control" id="Number" name="number" placeholder="Phone number" @change="checking()" />
                        </div>
                        <div class="col-md-12 form-group p_star">
                            <textarea type="text" class="form-control" id="Address" name="address" placeholder="Address" rows="3" @change="checking()" ></textarea>
                        </div>
                        <div class="col-md-12 form-group">
                            <textarea class="form-control" name="remarks" id="Remarks" rows="1" placeholder="Remarks" maxlength="100"></textarea>
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
        <CModal size="lg" alignment="center" :visible="showInvoice" >
            <CModalHeader>
                <h2>Invoice Details</h2>
            </CModalHeader>
            <CModelBody>
                <table style="margin-left:10%; width: 600px">
                    <tr>
                        <th width="400px">Item Name</th>
                        <th>number</th>
                        <th width="250px">subtotal</th>
                    </tr>
                    <tr v-for="item in cartDetail" :key="item.id">
                        <td>{{ item.productName }}</td>
                        <td>{{ item.numberProduct }}</td>
                        <td>{{ cryptoType }} {{ item.subtotal }}</td>
                    </tr><br>
                    <tr><td colspan="3">Item Fee : {{ cryptoType }} {{ cart }}</td></tr>
                    <tr><td colspan="3">Plateform Charge : {{ cryptoType }} {{ toCharge }}</td></tr>
                    <tr><td colspan="3">Total : {{ cryptoType }} {{ total }}</td></tr>
                    <tr><td colspan="3">Merchant : {{ name }}</td></tr>
                </table>
            </CModelBody>
            <CModalFooter>
                <CButton id="home" component="a"  href="/" role="button" color="primary" shape="rounded-pill">Back to Homepage</CButton>
            </CModalFooter>
        </CModal>
    </div>
</template>

<script>
import axios from "axios";
import {CButton, CModal, CModalHeader, CModalBody, CModalFooter} from '@coreui/vue';
import Web3 from 'web3';

export default {
    name: 'checkOut',
    components: {
    CButton,
    CModal,
    CModalHeader, 
    // eslint-disable-next-line vue/no-unused-components
    CModalBody, 
    CModalFooter,
},
    data(){
        return{
            cart: 0,
            id: 0,
            name: "",
            cartDetail: [],
            cryptoType: "",
            merchant: "",
            charges: 0,
            toCharge: 0,
            total: 0,
            balance: "",
            done: false,
            showInvoice: false,
        }
    },
    mounted() {
        this.getCart();
    },
    methods:{
        async getCart() {
            document.getElementById("toPay").setAttribute("disabled","disabled");
            try{
                let ID = await window.ethereum.request({method: "eth_accounts"});
                const response = await axios.get(`http://localhost:5000/cart/${ID}`);
                this.cart = response.data[0].totalprice;
                this.merchant = response.data[0].merchantType;
                this.cartDetail = (await axios.get(`http://localhost:5000/cartDetail/${ID}`)).data;
                this.cryptoType = (await axios.get(`http://localhost:5000/cartDetail/${ID}`)).data[0].cryptoType;     
                this.charges = (await axios.get(`http://localhost:5000/merchant/merchantCharge/${this.merchant}`)).data[0].platformCharges;
                this.toCharge =(this.cart.toPrecision(7) * this.charges.toPrecision(7));
                this.name = (await axios.get(`http://localhost:5000/merchant/getSelects/${this.merchant}`)).data[0].merchantName;
                this.id = ((await axios.get("http://localhost:5000/invoice/all")).data).length + 1;

                this.total = (this.cart + this.toCharge).toPrecision(7);
                let web3= new Web3(Web3.givenProvider);
                this.balance = ((await web3.eth.getBalance( (await web3.eth.getAccounts()).toString()))/10**18).toPrecision(10);


            }
            catch (e){
                console.log(e);
            }
        },
        checking(){
            if( document.getElementById("Name").value != "" && document.getElementById("Number").value != "" && document.getElementById("Address").value != "" ){
                if( this.balance>this.total ){
                    document.getElementById("toPay").removeAttribute("disabled");
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
            document.getElementById("Remarks").value = "-";
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

            if(((await web3.eth.getBalance( (await web3.eth.getAccounts()).toString()))/10**18) != this.balance){
                this.createReciept();
            }
        },
        async createReciept(){
            let ID = await window.ethereum.request({method: "eth_accounts"});
            let temps = (await axios.get("http://localhost:5000/products")).data;
            let fund = (this.total*(1-this.toCharge)).toFixed(7);
            let temp = (await axios.get(`http://localhost:5000/cartDetail/${ID}`)).data;
            this.showInvoice = true;
            await axios.put("http://localhost:5000/invoice/insert",{
                userID: ID,
                platformcharge: this.toCharge,
                totalprice: this.total,
                remarks: document.getElementById("Remarks").value,
                name: document.getElementById("Name").value ,
                address: document.getElementById("Address").value,
                phone: document.getElementById("Number").value,
                cointype: this.cryptoType,
                merchant: this.name,
            });

            for(let i =0; i< temps.length; i++){
                for(let o = 0; o < temp.length; o++){
                    if(temp[o].productID == temps[i].productID){
                        await axios.put("http://localhost:5000/invoiceDetail/insert",{
                            invoiceID: this.id,
                            productID: temp[o].productID,
                            productName: temps[i].productName,
                            number: temp[o].numberProduct,
                            subTotal: temp[o].subtotal,
                        });

                        console.log(temps[i].productName);
                    }
                }
            }

            for(let i =0; i< temps.length; i++){
                for(let o = 0; o < temp.length; o++){
                    if(temp[o].productID == temps[i].productID){
                        await axios.put(`http://localhost:5000/product/reduceStock/${temp[0].productID}`,{
                            stock: temp[o].numberProduct,
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
            document.getElementById("toPay").setAttribute("disabled","disabled");
        },
    } 
};
</script>
