<template>
<div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="home">
      
      <b-img center src="@/static/images/helmet.png" width="50" height="50"></b-img>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="motos">Motos</b-nav-item>
        <b-nav-item href="usuarios" >Usuarios</b-nav-item>
        <b-nav-item href="mantenimiento" >Mantenimientos</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
          <b-img center src="@/static/images/exit.png" width="50" height="50" @click="exit">
          </b-img>
        </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  <nuxt />
</div>
</template>

<script>
import axios from "axios";
import config from "../assets/config";

export default {
  beforeMount(){
      this.cargarPagina();
  },data(){

  }, methods:{
      cargarPagina(){
        let url = config.url_api + `/verificar`
        let token = localStorage.getItem("token");
          //this.$axios.setHeader("token", token);
          
          axios
          .get(url, {headers: {token}})
          .then(response => {
            console.log(response);  
          })
          .catch(error =>{
            console.log(error);            
          })
          
      },exit(){
        localStorage.clear();
        this.$router.push("/");
      }
  }
}
</script>


<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
