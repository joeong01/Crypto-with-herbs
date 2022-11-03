<template>
    <div style="margin: 4%;">
        <div id="page-container">
            <div class="about_content">
                <h1>Invoice</h1>
                <CAccordion>
                    <CAccordionItem v-for="invoice in invoices" :key="invoice.id">
                        <CAccordionHeader><b>ID: {{ invoice.invoiceID }}</b>&emsp; Purchase by: {{ invoice.name }} &emsp;  on: {{ invoice.time }}</CAccordionHeader>
                        <CAccordionBody>
                                <table style="margin-left:26%; width: 900px;">
                                    <tr>
                                        <th width="400px">Item Name</th>
                                        <th>number</th>
                                        <th width="250px">subtotal</th>
                                    </tr>
                                </table>
                                <table v-for="detail in invoiceDetails" :key="detail.id" style="margin-left:20%; width: 900px;">
                                    <tr v-if="detail.invoiceID == invoice.invoiceID">
                                        <td>{{ detail.productName }}</td>
                                        <td>{{ detail.number }}</td>
                                        <td style="padding-left: 21%;">{{ detail.subTotal }}</td>
                                    </tr><br>
                                </table>
                                <table style="margin-left:26%; width: 900px;">
                                    <tr><td colspan="3">Total : {{ invoice.cointype }} {{ invoice.totalprice }}</td></tr>
                                    <tr><td colspan="3">Merchant : {{ invoice.merchant }}</td></tr>
                                    <tr>
                                        <th>Billing Address</th>
                                        <td colspan="2">{{ invoice.address }}</td>
                                    </tr>
                                    <tr>
                                        <th>Account:</th>
                                        <td colspan="2">{{ invoice.userID }}</td>
                                    </tr>
                                    <tr>
                                        <th>Remarks</th>
                                        <td colspan="2">{{ invoice.remarks }}</td>
                                    </tr>
                                </table>
                        </CAccordionBody>
                    </CAccordionItem>
                </CAccordion>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { CAccordion, CAccordionHeader, CAccordionBody} from '@coreui/vue'

export default {
    components: {
        CAccordion,
        CAccordionHeader,
        CAccordionBody
    },
    data(){
        return{
            invoices: [],
            invoiceDetails: [],
        }
    },
    created() {
        this.getInvoice();
    },
    methods:{
        async getInvoice() {
            let ID = await window.ethereum.request({method: "eth_accounts"});

            this.invoices = (await axios.get(`http://localhost:5000/invoice/user/${ID}`)).data;
            let temp = (await axios.get("http://localhost:5000/invoiceDetail")).data;

            for(let i =0; i< this.invoices.length; i++){
                let date = new Date(this.invoices[i].time);
                let changed = date.getDate() + "/" + ((date.getMonth())+1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
                this.invoices[i].time = changed;
                for(let o =0; o< temp.length; o++){
                    if(this.invoices[i].invoiceID == temp[o].invoiceID){
                        this.invoiceDetails.push(temp[o]);
                    }
                }
            }
        }
    },
};
</script>

<style>

</style>