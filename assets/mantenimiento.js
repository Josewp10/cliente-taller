import axios from "axios";
import config from "../assets/config";

export default {
  data() {
    return {
        enEdicion:false,
        showTable:true,
        token:null,
        index: null,
      mantenimiento:{
          id_mecanico:"",
          placa:"",
          fecha:"",
          trabajos_realizados:"",
          horas_invertidas:"",
          acciones:true
      },lista_mantenimientos:[],
      roles_mantenimiento:[],
        tipo_documentos:[]
  }
    },beforeMount(){
        
    },created(){
         
        this.guardarToken();
        this.listar_mantenimientos();
    },methods:{      
        guardarToken(){
            if (typeof window !== "undefined"){                
                this.token = localStorage.getItem("token"); 
              }                     
        },cambioValor(){
            this.enEdicion = false;
            this.mantenimiento={
                id_mecanico:"",
                placa:"",
                fecha:"",
                trabajos_realizados:"",
                horas_invertidas:"",
                acciones:true
            }
        },
        listar_mantenimientos(){
            let url = config.url_api + `/mantenimientos`;
            console.log(url);
    
            axios
            .get(url, {headers: {token: this.token}})
            .then((response) => {
                console.log(response);
                this.lista_mantenimientos = response.data.info;
                for (const i in this.lista_mantenimientos) {
                   this.lista_mantenimientos[i].acciones = true;
                }
                
            }).catch((error)=>{
            console.log(error);
            });
        },
        cargarMantenimiento({item}){
            this.index = item.index;
            this.enEdicion =true;
            let url = config.url_api + `/mantenimientos/${item.placa}/${item.id_mecanico}/${item.fecha}`;
            console.log("token:" +this.token);
            
            axios.get(url, {headers: {token: this.token}})
            .then((response)=>{
                var array = response.data.info;
                this.mantenimiento.id_mecanico = array[0].id_mecanico;
                this.mantenimiento.placa = array[0].placa;
                this.mantenimiento.fecha = array[0].fecha;
                this.mantenimiento.trabajos_realizados = array[0].trabajos_realizados;
                this.mantenimiento.horas_invertidas = array[0].horas_invertidas;
                this.mantenimiento.acciones = true;
            })
            .catch((error)=>{
                this.mensajes(error);
            })
        },crearMantenimiento(){
            let url =  config.url_api + `/mantenimientos/`
            axios.post(url, this.mantenimiento, {headers:{token: this.token}})
            .then(response =>{
                this.listar_mantenimientos();
                this.mantenimiento={
                    id_mecanico:"",
                    placa:"",
                    fecha:"",
                    trabajos_realizados:"",
                    horas_invertidas:"",
                    acciones:true
                }
                alert("Información actualizada correctamente");
            })
            .catch(error =>{
                this.mensajes(error);
            })
        },
        actualizarMantenimiento(){
            let url =  config.url_api + `/mantenimientos/${this.mantenimiento.placa}/${this.mantenimiento.id_mecanico}/${this.mantenimiento.fecha}`
            axios.put(url, this.mantenimiento, {headers:{token: this.token}})
            .then(response =>{
                this.enEdicion = false;                
                this.lista_mantenimientos.splice(this.index, 1, this.mantenimiento);
                this.enEdicion = false;
                this.listar_mantenimientos();
                this.mantenimiento={
                    id_mecanico:"",
                    placa:"",
                    fecha:"",
                    trabajos_realizados:"",
                    horas_invertidas:"",
                    acciones:true
                }
                alert("Información actualizada correctamente");
            })
            .catch(error =>{
                this.mensajes(error);
            })
        },eliminarMantenimiento({item}){
            
            let url = config.url_api + `/mantenimientos/${item.placa}/${item.id_mecanico}/${item.fecha}`;

            axios.delete(url, {headers: {token: this.token}})
            .then((response)=>{
                this.lista_mantenimientos.splice(item.index, 1);
                this.listar_mantenimientos();
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