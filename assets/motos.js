import axios from "axios";
import config from "../assets/config";

export default {
  data() {
    return {
        enEdicion:false,
        showTable:true,
      moto:{
          placa:"",
          estado:"",
          clase:"",
          marca:"",
          modelo:"",
          color:"",
          cilindraje:"",
          id_propietario:"",
          nro_soat:"",
          vencimiento_soat:"",
          nro_tecnomecanica:"",
          vencimiento_tecnomecanica:"",
          acciones: true
      },lista_motos:[],
  }
    },beforeMount(){

    },created(){
        this.listar_motos();
    },methods:{        
        listar_motos(){
            let url = config.url_api + `/moto`;
            axios
            .get(url)
            .then((response) => {
                console.log(response);
                this.lista_motos = response.data.info;
                for (const i in this.lista_motos) {
                   this.lista_motos[i].acciones = true;
                }
                
            }).catch((error)=>{
            console.log(error);
            });
        }
  }
}