<template>
    <div style="margin-left: 26%; margin-top: 3%; margin-bottom: 3%; background-color:azure; width: 900px;">
        <canvas id="myChart" width="900" height="600"></canvas>
    </div>
    <div style="margin-left: 26%; margin-top: 3%; margin-bottom: 3%; background-color:azure; width: 900px;">
        <canvas id="fund" width="900" height="600"></canvas>
    </div>
</template>

<script>
import axios from 'axios';
import Chart from 'chart.js';

export default {
    components: {
    },
    data(){
      return{
        merchants: [],
        label: [],
        data: [],
        color: [],
        temp: [],
        funds: [],
        colour: ["red", "yellow", "green"],
        stockLevel: ["low", "medium", "high"],
      }
    },
    created(){
        this.getMerchant();
        //this.perMerchant();
    },
    methods:{
        async getMerchant(){
            this.merchants = (await axios.get("http://localhost:5000/merchants")).data;

            for(let i=0; i< this.merchants.length;i++){
                this.label.push(this.merchants[i].merchantName.toString());
                this.data.push(this.merchants[i].totalProduct);
                this.funds.push(this.merchants[i].fund);
                this.color.push("#" + Math.floor(Math.random()*16777215).toString(16));
            }
            
            const ctx = document.getElementById("myChart").getContext("2d");
            const myMerchant = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: this.label,
                    datasets: [{
                        backgroundColor: this.color,
                        data: this.data,
                    }]
                },
                options: {
                    legend: {display: false},
                    title: { display: true,  text: "Merchant Summary"},
                    scales:{
                        yAxes: [{
                            display: true,
                            ticks: {
                                beginAtZero: true,
                                steps: 10,
                                stepValue: 5,
                            }
                        }]
                    }
                },

            });

            console.log(myMerchant);

            const atx = document.getElementById("fund").getContext("2d");
            const myFund = new Chart(atx, {
                type: "bar",
                data: {
                    labels: this.label,
                    datasets: [{
                        backgroundColor: this.color,
                        data: this.funds,
                    }]
                },
                options: {
                    legend: {display: false},
                    title: { display: true,  text: "Merchant Fund"},
                    scales:{
                        yAxes: [{
                            display: true,
                            ticks: {
                                beginAtZero: true,
                                steps: 0.005,
                                stepValue: 0.001,
                            }
                        }]
                    }
                },

            });

            console.log(myFund);
        },
        // async perMerchant(){
        // this.temp  = (await axios.get(`http://localhost:5000/productsFS/${this.selectedSort}`)).data;

        //     for(let i=0; i< this.merchants.length;i++){
        //         let check = document.getElementById(this.merchants[i].merchantCategory).value;
        //         let stock = [0,0,0];
        //         for(let o =0; o< this.temp.length ; o++){
        //             if(this.temp[o].merchantCategory == check){
        //                 if(this.temp[o].stock >30){
        //                     stock[2] += 1;
        //                 }
        //                 else if(this.temp[o].stock >15){
        //                     stock[1] += 1;
        //                 }
        //                 else{
        //                     stock[0] += 1;
        //                 }
        //             }
        //         }

        //         const ctx = document.getElementById(this.merchants[i].merchantCategory).getContext("2d");
        //         const myChart = new Chart(ctx, {
        //             type: "pie",
        //             data: {
        //                 labels: this.stockLevel,
        //                 datasets: [{
        //                     backgroundColor: this.colour,
        //                     data: stock,
        //                 }]
        //             },
        //             options: {
        //                 title: { display: true,  text: this.merchants[i].merchantName},
        //             }
        //         });
        //         console.log(myChart);
        //     }
        // }
    }
};

</script>

<style>

</style>