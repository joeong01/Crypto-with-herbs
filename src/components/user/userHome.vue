<template>
  <div>
    <div id="demo" class="carousel slide" data-ride="carousel">
      <ul class="carousel-indicators">
          <li data-target="#demo" data-slide-to="0" class="active"></li>
          <li data-target="#demo" data-slide-to="1" class="active"></li>
      </ul>
      <div class="carousel-inner">
          <div class="carousel-item active">
              <img src="../../assets/ZHIGANCAO-300x300.jpg">
              <br><br><br><br><br><br><br>
              <div class="carousel-caption">
                  <h3>Top Sale</h3>
                  <p>Xue Li Pian</p>
              </div>
          </div>
          <div class="carousel-item">
              <img src="../../assets/ZHIKE2-300x300.jpg">
              <br><br><br><br><br><br><br>
              <div class="carousel-caption">
                  <h3>New Release</h3>
                  <p>Zhi Ke</p>
              </div>
          </div>
      </div>
      <a class="carousel-control-prev" href="#demo" data-slide="prev">
          <span class="carousel-control-prev-icon"></span>
      </a>
      <a class="carousel-control-next" href="#demo" data-slide="next">
          <span class="carousel-control-next-icon"></span>
      </a>
    </div>


    <table style="width: 50%; margin-top:5%; margin-left:25%">
      <tr>
        <th colspan="2" ><span style="color:red;font-size: 25px;">On Sale</span></th>
      </tr>
      <tr>
        <td><img src="../../assets/XUELIPIAN(5)-300x300.jpg"/></td>
        <td><img src="../../assets/ZHIHESHOUWU-300x300.jpg"/></td>
      </tr>
      <tr>
        <th>Xue Li Pian</th>
        <th>Zhi He Shou Wu</th>
      </tr>
      <tr>
        <th>ETH 22.00</th>
        <th>ETH 50.00</th>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
  name: 'UserHome'
};

</script>

<style>
  .carousel {
    width: 750px;
    height: 550px;
    margin-left: 32.5%;
    margin-top: 10px;
    background-color: rgb(173, 173, 173);;
  }

  .carousel-inner{
    width: 700px;
    height: 700px;
  }
  .carousel-inner img {
    margin-top: 15%;
    width: 300px;
    height: 300px;
    margin-left: 30%;
  }

  .carousel-caption {
    margin-top: 500px;
  }

  table{
    width: 60%;
    text-align:center;
  }

  th{
    font-size: 24px;
  }

  img { 
    height:350px;
    width:350px;
  }


</style>