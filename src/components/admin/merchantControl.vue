<template>
    <div style="margin-left: 29%;">
        <div id="page-container">
            <div class="about_content">
                <h1>All Merchant<CButton style="margin-left: 29%;" color="primary" shape="rounded-pill" @click="add = true;">Add New</CButton></h1>
                <CModal size="md" alignment="center" :visible="add" @close="add = false;" >
                    <CModalHeader>
                    <CModalTitle><label>ID:</label><input type="text" id="ID" :value="newID" readonly/></CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <label>Name:&emsp;</label><input type="text"  id="name" placeholder="name" @change="isEmpty()"/><br><br>
                        <label>Wallet ID:&emsp;</label><input type="text" id="walletID" placeholder="walletID" width="350px" @change="isEmpty()"/><br><br>
                        <label>Coin Type:&emsp;</label><input type="text" id="type" placeholder="Coin Type" @change="isEmpty()"/><br><br>
                        <Label>Platform Charge:&emsp;</Label><input type="number" placeholder="Platform Charge" id="charge" value="0.01" step="0.01" min="0.01"/><br>
                        <CButton id="toAdd" @click="toAdd(); add = false" color="primary" shape="rounded-pill">Add</CButton>
                    </CModalBody>
                </CModal>
                <CAccordion style="width: 700px;">
                    <CAccordionItem v-for="merchant in merchants" :key="merchant.merchantCategory">
                        <CAccordionHeader><b>ID: {{ merchant.merchantCategory }} &emsp; {{ merchant.merchantName }}</b>&emsp; &emsp;  fund to release: {{ merchant.fund }}&emsp; <CButton @click="releaseFund(merchant.walletID, merchant.fund, merchant.merchantCategory)" color="primary" shape="rounded-pill">ReleaseFund</CButton></CAccordionHeader>
                        <CAccordionBody>
                            <label>Name:&emsp;  </label><input type="text" :value="merchant.merchantName" :id="merchant.merchantCategory + 'name'" placeholder="Name" @change="checking(merchant.merchantCategory)"/><br><br>
                            <label>Wallet ID:&emsp;  </label><input type="text" :value="merchant.walletID" :id="merchant.merchantCategory + 'walletID'" placeholder="walletID" @change="checking(merchant.merchantCategory)"/><br><br>
                            <Label>Total Product:&emsp; </Label><input type="text" :value="merchant.totalProduct" readonly/><br><br>
                            <label>Coin Type:&emsp;  </label><input type="text" :value="merchant.fundType" readonly/><br><br>
                            <Label>Platform Charge:&emsp; </Label><input type="number" step="0.01" min="0.01" :value="merchant.platformCharges" :id="merchant.merchantCategory + 'charge'" @change="checking(merchant.merchantCategory)"/><br><br>
                            <label>Enable:&emsp;  </label><input v-if="merchant.enable == 0" :id="merchant.merchantCategory + 'enable'" value="True" readonly/><input v-else :id="merchant.merchantCategory + 'enable'" value="False" readonly/>
                            <div style="margin-left: 62%;">
                                <CButton :id="merchant.merchantCategory+'update'" @click="update( merchant.merchantCategory )" color="primary" shape="rounded-pill" >Update to Database</CButton>
                                <CButton v-if="merchant.enable == 0" @click="remove(merchant.merchantCategory)" color="danger" shape="rounded-pill">Disable</CButton>
                                <CButton v-else @click="remove(merchant.merchantCategory)" color="danger" shape="rounded-pill">Enable</CButton>
                            </div>
                        </CAccordionBody>
                    </CAccordionItem>
                </CAccordion>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { CAccordion, CAccordionHeader, CAccordionBody, CButton, CModal, CModalBody, CModalHeader} from '@coreui/vue'
import Web3 from 'web3';

export default {
    components: {
        CAccordion,
        CAccordionHeader,
        CAccordionBody,
        CButton,
        CModal, 
        CModalBody,
        CModalHeader
    },
    data(){
        return{
            merchants: [],
            add: false,
            newID: "",
        }
    },
    created() {
        this.getMerchant();
    },
    methods:{
        async getMerchant() {
            this.merchants = (await axios.get("http://localhost:5000/allMerchants")).data;

            this.newID = "M" + (this.merchants.length +1);
        },
        async releaseFund(id, fund, category){

            let hex = ((fund.toFixed(7))*10**18);
            let web3= new Web3(Web3.givenProvider);
            let account = (await web3.eth.getAccounts()).toString();
            let balance = (await web3.eth.getBalance( (await web3.eth.getAccounts()).toString())/10**18);
            
            await web3.eth.sendTransaction({
                from: account,
                to: id,
                value: hex,
            }).then(async function(reciept){
                console.log(reciept);
            });

            if((await web3.eth.getBalance( (await web3.eth.getAccounts()).toString())/10**18) != balance){
                alert("Complete release to merchant");
                await axios.get(`http://localhost:5000/merchant/releaseFund/${category}`);
                window.location.reload();
            }
        },
        checking(ID){
            if(document.getElementById(ID+'name').value != "" && document.getElementById(ID+'walletID').value != "" && document.getElementById(ID+'charge').value != ""){
                document.getElementById(ID+'update').removeAttribute("disabled");
            }
            else{
                document.getElementById(ID+'update').setAttribute("disabled","disabled");
            }
        },
        async update(ID){
            const response = await axios.put("http://localhost:5000/merchant/updateAll",{
                merchantName: document.getElementById(ID +'name').value,
                walletID: document.getElementById(ID +'walletID').value,
                fund: document.getElementById(ID +'charge').value,
                enable: document.getElementById(ID + 'enable'),
                id: ID,
            });

            console.log(response);
            alert("Updated");
            window.location.reload();
        }, 
        async remove(ID){
            if(confirm("Are you sure wan to change the status of \"" + document.getElementById(ID+'name').value + "\"?")){
                console.log(await axios.get(`http://localhost:5000/merchantDisable/${ID}`));
                alert("Disbled");
                window.location.reload();
            }
        },
        isEmpty(){
            if(document.getElementById("name").value != "" && document.getElementById("walletID").value != "" && document.getElementById("charge").value != "" && document.getElementById("type").value != ""){
                document.getElementById("toAdd").removeAttribute("disabled");
            }
            else{
                document.getElementById("toAdd").setAttribute("disabled","disabled");
            }
        },
        async toAdd(){
            const temp = await axios.post("http://localhost:5000/merchant/insertMerchant",{
                merchantcategory: this.newID,
                merchantName: document.getElementById("name").value,
                walletID: document.getElementById("walletID").value,
                totalProduct: 0,
                fund: 0,
                fundType: document.getElementById("type").value,
                platformCharges: document.getElementById("charge").value,
            });
            
            console.log(temp);
            window.location.reload();
        }
    },
};
</script>

<style>

</style>