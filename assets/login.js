import axios from "axios";
import config from "../assets/config";

export default {
    layout: "login",
  data() {
    return {
        mensaje:null,
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
            
            console.log(this.usuario.documento + "CLAVE:"+this.usuario.clave);
                axios
                  .post(url, this.usuario)
                  .then((response) => {
                    let data = response.data;
                    console.log("Data:", data);
                    localStorage.setItem("token", data.info);
                    this.usuario ={
                        documento:"",
                        clave:""
                    }
                    this.$router.push("/home");
                  })
                  .catch((error) => {
                    if (error.response && error.response.data) {
                        this.mensaje = "Error: " +error.response.status
                                    +"\n" + error.response.data.mensaje;
                      } else {
                        this.mensaje = "Error: " + error;
                      }
                    console.log(error.response);
                  });
             
        }
  }
}