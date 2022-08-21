<template>
    <div id="demo">

        // 關閉初始化連接
        <vue-metamask ref="metamask" :initConnect="false"></vue-metamask>
        
        // 點擊連接 metamask
        <button @click="connect">connect</button>

    </div>
</template>

<script>
    // eslint-disable-next-line no-unused-vars
    import Web3 from 'web3';
    import VueMetamask from 'vue-metamask';
    export default {
        components: {
            VueMetamask,
        },
        data(){
            return {
                msg: "This is demo net work"
            }
        },
        methods:{
            onComplete(data){
                console.log('data:', data);
            }
        }
    }
</script>