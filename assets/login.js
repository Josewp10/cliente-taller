import axios from "axios";
import config from "../assets/config";

export default {
    layout: "login",
  data() {
    return {
        enEdicion:false,
        showTable:true,
      usuario:{
          documento:"",
          clave:""
      },lista_motos:[],
  }
    },beforeMount(){

    },created(){
       
    },methods:{        
        login(){
            let url = config.url_api + `/login`;

            if (this.usuario.documento.length > 0 && this.usuario.clave.length > 0) {
                axios
                  .post(url, this.usuario)
                  .then((response) => {
                    let data = response.data;
                    console.log("Data:", data);
                    localStorage.setItem("token", data.info);
                    /*localStorage.setItem("id", this.usuario.id);
                    console.log("Primera vez: ", data.primera_vez);
                    console.log("Rol: ", data.rol);
                    this.$router.push("/principal");*/
                  })
                  .catch((error) => {
                    this.mensaje2 = error.response.data.message;
                    console.log(error.response);
                  });
              } else {
                alert("LLene todos los campos correctamente");
              }
        }
  }
}