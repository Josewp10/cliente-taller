import axios from "axios";
import config from "../assets/config";

export default {
  data() {
    return {
        enEdicion:false,
        showTable:true,
        token:null,
        index:null,
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
         
        this.guardarToken();
        this.listar_motos();
    },methods:{      
        guardarToken(){
            if (typeof window !== "undefined"){                
                this.token = localStorage.getItem("token"); 
              }                     
        },cambioValor(){
            this.enEdicion = false;
            this.moto={
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
            }
        },
        listar_motos(){
            let url = config.url_api + `/moto`;
            console.log(url);
    
            axios
            .get(url, {headers: {token: this.token}})
            .then((response) => {
                console.log(response);
                this.lista_motos = response.data.info;
                for (const i in this.lista_motos) {
                   this.lista_motos[i].acciones = true;
                }
                
            }).catch((error)=>{
            console.log(error);
            });
        },
        cargarMotos({item}){
            this.index = item.index;
            this.enEdicion =true;
            let url = config.url_api + `/moto/${item.placa}`;

            axios.get(url, {headers: {token: this.token}})
            .then((response)=>{
                var array = response.data.info;
                this.moto.placa = array[0].placa;
                this.moto.estado = array[0].estado;
                this.moto.clase = array[0].clase;
                this.moto.marca = array[0].marca;
                this.moto.modelo = array[0].modelo;
                this.moto.color = array[0].color;
                this.moto.cilindraje = array[0].cilindraje;
                this.moto.id_propietario = array[0].id_propietario;
                this.moto.nro_soat = array[0].nro_soat;
                this.moto.vencimiento_soat = array[0].vencimiento_soat;
                this.moto.nro_tecnomecanica = array[0].nro_tecnomecanica;
                this.moto.vencimiento_tecnomecanica = array[0].vencimiento_tecnomecanica;
                this.moto.acciones = true;
            })
            .catch((error)=>{
                this.mensajes(error);
            })
        },crearMoto(){
            let url =  config.url_api + `/moto/`
            axios.post(url, this.moto, {headers:{token: this.token}})
            .then(response =>{
                this.listar_motos();
                this.moto = {
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
                }
                alert("Información actualizada correctamente");
            })
            .catch(error =>{
                this.mensajes(error);
            })
        },
        actualizarMoto(){
            let url =  config.url_api + `/moto/${this.moto.placa}`
            axios.put(url, this.moto, {headers:{token: this.token}})
            .then(response =>{
                this.lista_motos.splice(this.index, 1, this.moto);
                //this.listar_motos();
                this.enEdicion = false;
                this.moto = {
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
                }
                alert("Información actualizada correctamente");
            })
            .catch(error =>{
                this.mensajes(error);
            })
        },eliminarMotos({item}){
            
            let url = config.url_api + `/moto/${item.placa}`;

            axios.delete(url, {headers: {token: this.token}})
            .then((response)=>{
                this.lista_motos.splice(item.index, 1);
                //this.listar_motos();
                alert("Campo eliminado correctamente correctamente");
            })
            .catch((error)=>{
                this.mensajes(error);
            })
        },
        mensajes(error){
            let mensaje=null;
            if (error.response && error.response.data) {
                mensaje = "Error: " + error.response.data.mensaje;
              } else {
                mensaje = "Error: " + error;
              }
              alert(mensaje);
        }
  }
}