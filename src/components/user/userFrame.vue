<template>
  <div class="float-container" style="margin-bottom: 5%;" v-if="role" >
    <div class="page" style="width:100%;">
      <nav class="page__menu page__custom-settings menu">
        <!-- navigation bar-->
        <ul class="menu__list r-list">
          <li class="menu__group"><a href="/admin" class="menu__link r-link text-underlined">Homepage</a></li>
          <li class="menu__group"><a href="/stock" class="menu__link r-link text-underlined">Stock</a></li>
          <li class="menu__group"><a href="/merchant" class="menu__link r-link text-underlined">Merchant</a></li>
          <li class="menu__group"><a href="/blogCOntrol" class="menu__link r-link text-underlined">Blog</a></li>
        </ul>
      </nav>
    </div>
  </div>
  <div v-else class="float-container" style="margin-bottom: 5%;" >
    <div class="page" style="width:80%;">
        <!--navigation bar-->
      <nav class="page__menu page__custom-settings menu">
        <ul class="menu__list r-list">
          <li class="menu__group"><a href="/" class="menu__link r-link text-underlined">Homepage</a></li>
          <li class="menu__group"><a href="/blog" class="menu__link r-link text-underlined">Blog</a></li>
          <li class="menu__group"><a href="/userProduct" class="menu__link r-link text-underlined">Product</a></li>
        </ul>
      </nav>
    </div>
    <div class="page" style="width:20%;" v-if="logged">
      <nav class="page_menu page__custom-settings menu">
        <ul class="menu__list r-list">
          <li class="menu__group"><a href="/cart" class="menu__link r-link text-underlined">Cart</a></li>
        </ul>
      </nav>
    </div>
    <div class="page" style="width:20%;" v-else>
      <nav class="page_menu page__custom-settings menu">
        <ul class="menu__list r-list">
          <li class="menu__group"><a href="/LogIn" class="menu__link r-link text-underlined">Connect</a></li>
        </ul>
      </nav>
    </div>
  </div>
  <router-view/>
  <div class="footer" style="margin-top: 1%;bottom: 0;">
    <footer>
      <!--footer-->
      <div class="social" >
          <a href="https://www.instagram.com/etcm.me/" target="_blank"><i class="icon ion-social-instagram"></i></a>
          <a href="https://www.facebook.com/etcm.me" target="_blank"><i class="icon ion-social-facebook"></i></a>
          <a href="https://twitter.com/etcm_me" target="_blank"><i class="icon ion-social-twitter"></i></a>
      </div>
      <ul class="list-inline">
          <li class="list-inline-item"><a href="/AboutUS" >About Us</a></li>
      </ul>
      <p class="copyright">Herbs with Crypto ©2022</p>
    </footer>
  </div>
</template>

<script>
import axios from 'axios';
  export default {
    data(){
      return{
        id: " ",
        logged: false,
        reloaded: '1',
        role: false,
        isAdmin: false,
        temp: [],
      }
    },
    created(){
      this.getID();
    },
    mounted(){
      if (localStorage.getItem('reloaded')) {
        localStorage.removeItem('reloaded');
      } else {
        localStorage.setItem('reloaded', '1');
        location.reload();
      }
    },
    methods:{
      async getID(){
        try{
          this.id = await window.ethereum.request({method: "eth_accounts"});

          if(this.id.length > 0){
            this.logged = true;
            
            const response = await axios.get("http://localhost:5000/getUsers");
            this.temp = response.data;

            for(let i = 0; i < this.temp.length; i++){
              if(this.temp[i].userID == this.id){
                if(this.temp[i].userType == "Customer"){
                  this.role = false;
                }
                else{
                  this.role= true;
                }
              }
            }
          }
        }
        catch (err) {
          console.log(err); 
        }
      },
    }
  }

  let Script1 = document.createElement("script");
  let Script2 = document.createElement("script");
  let Script3 = document.createElement("script");
  let Script4 = document.createElement("script");
  let Script5 = document.createElement("script");
  let Script6 = document.createElement("script");
  let Script7 = document.createElement("script");

  Script1.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js");
  Script2.setAttribute("src","https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.bundle.min.js")
  Script3.setAttribute("src", "https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.slim.min.js");
  Script4.setAttribute("src","https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js");
  Script5.setAttribute("src","https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js");
  Script6.setAttribute("src","https://cdn.jsdelivr.net/npm/vue@2.5.13/dist/vue.js");
  Script7.setAttribute("src","https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.18/vue.min.js");

  document.head.appendChild(Script1);
  document.head.appendChild(Script2);
  document.head.appendChild(Script3);
  document.head.appendChild(Script4);
  document.head.appendChild(Script5);
  document.head.appendChild(Script6);
  document.head.appendChild(Script7);

</script>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css";
@import "https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css";

  .chart {
    font-size: 30px;
  }
  .r-link {
    display: var(--rLinkDisplay, inline-flex) !important;
  }
  .r-link[href] {
    color: var(--rLinkColor) !important;
    text-decoration: var(--rLinkTextDecoration, none) !important;
  }
  .r-list {
    padding-left: var(--rListPaddingLeft, 0) !important;
    margin-top: var(--rListMarginTop, 0) !important;
    margin-bottom: var(--rListMarginBottom, 0) !important;
    list-style: var(--rListListStyle, none) !important;
  }
  /*
  =====
  CORE STYLES
  =====
  */
  .menu {
    --rLinkColor: var(--menuLinkColor, currentColor);
  }
  .menu__link {
    display: var(--menuLinkDisplay, block);
  }
  /* 
  focus state 
  */
  .menu__link:focus {
    outline: var(--menuLinkOutlineWidth, 2px) solid var(--menuLinkOutlineColor, currentColor);
    outline-offset: var(--menuLinkOutlineOffset);
  }
  /* 
  fading siblings
  */
  .menu:hover .menu__link:not(:hover) {
    --rLinkColor: var(--menuLinkColorUnactive, rgb(226, 226, 226));
  }
  /*
  =====
  PRESENTATION STYLES
  =====
  */
  .menu {
    background-color: var(--menuBackgroundColor, #f0f0f0);
    box-shadow: var(--menuBoxShadow, 0 1px 3px 0 rgba(0, 0, 0, .12), 0 1px 2px 0 rgba(0, 0, 0, .24));
  }
  .menu__list {
    display: flex;
  }
  .menu__link {
    padding: var(--menuLinkPadding, 1.5rem 2.5rem);
    font-weight: 700;
    text-transform: uppercase;
  }
  /* 
  =====
  TEXT UNDERLINED
  =====
  */
  .text-underlined {
    position: relative;
    overflow: hidden;
    will-change: color;
    transition: color .25s ease-out;
  }
  .text-underlined::before,
  .text-underlined::after {
    content: "";
    width: 0;
    height: 3px;
    background-color: var(--textUnderlinedLineColor, currentColor);
    will-change: width;
    transition: width .1s ease-out;
    position: absolute;
    bottom: 0;
  }
  .text-underlined::before {
    left: 50%;
    transform: translateX(-50%);
  }
  .text-underlined::after {
    right: 50%;
    transform: translateX(50%);
  }
  .text-underlined:hover::before,
  .text-underlined:hover::after {
    width: 100%;
    transition-duration: .2s;
  }
  /*
  =====
  SETTINGS
  =====
  */
  .page__custom-settings {
    --menuBackgroundColor: rgb(44, 47, 44);
    --menuLinkColor: rgb(93, 117, 253);
    --menuLinkColorUnactive: rgb(226, 226, 226);
    --menuLinkOutlineOffset: -.5rem;
  }
  /*
  =====
  DEMO
  =====
  */
  body {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Open Sans, Ubuntu, Fira Sans, Helvetica Neue, sans-serif;
    margin: 0;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .page {
    box-sizing: border-box;
    margin: 0px;
    position: relative;
    float: left;
  }
  .page__menu:nth-child(n+2) {
    margin-top: 3rem;
  }
  .substack {
    border: 1px solid #EEE;
    background-color: #fff;
    width: 100%;
    max-width: 480px;
    height: 280px;
    margin: 1rem auto;
  }
  .linktr {
    display: flex;
    justify-content: flex-end;
    padding: 2rem;
    text-align: center;
  }
  .linktr__goal {
    background-color: rgb(209, 246, 255);
    color: rgb(93, 117, 253);
    box-shadow: rgb(93, 117, 253 / 24%) 0px 2px 8px 0px;
    border-radius: 2rem;
    padding: .75rem 1.5rem;
  }
  .r-link {
    --uirLinkDisplay: var(--rLinkDisplay, inline-flex);
    --uirLinkTextColor: var(--rLinkTextColor);
    --uirLinkTextDecoration: var(--rLinkTextDecoration, none);
    display: var(--uirLinkDisplay) !important;
    color: var(--uirLinkTextColor) !important;
    text-decoration: var(--uirLinkTextDecoration) !important;
  }
  .footer {
    position: relative;
    width: 100%;
    bottom: 0;
    padding: 30px 0;
    background-color: rgb(44, 47, 44);
    color: #9d9d9d;
  }
  .footer ul {
    padding: 0;
    list-style: none;
    text-align: center;
    font-size: 18px;
    line-height: 1.0;
    margin-bottom: 0;
  }
  .footer li {
    padding: 0 10px;
  }
  .footer ul a {
    color: inherit;
    text-decoration: none;
    opacity: 0.8;
  }
  .footer ul a:hover {
    opacity: 1;
  }
  .footer .social {
    text-align: center;
    padding-bottom: 25px;
  }
  .footer .social>a {
    font-size: 24px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    display: inline-block;
    text-align: center;
    border-radius: 50%;
    border: 1px solid #ccc;
    margin: 0 8px;
    color: inherit;
    opacity: 0.75;
  }
  .footer .social>a:hover {
    opacity: 0.9;
  }
  .footer .copyright {
    margin-top: 15px;
    text-align: center;
    font-size: 15px;
    color: #9d9d9d;
    margin-bottom: 0;
  }

  .notification .badge {
  position: absolute;
  top: -10px;
  right: -10px;
  padding: 5px 10px;
  border-radius: 50%;
  background: red;
  color: white;
  }
</style>