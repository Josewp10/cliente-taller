import axios from "axios";
import config from "../assets/config";

export default {
  data() {
    return {
        enEdicion:false,
        showTable:true,
        token:null,
        index:null,
      usuario:{
          tipo_documento:"",
          documento:"",
          nombre:"",
          apellidos:"",
          celular:"",
          correo:"",
          rol:"",
          clave:"",
          acciones:true
      },lista_usuarios:[],
      roles_usuario:[],
        tipo_documentos:[]
  }
    },beforeMount(){
        
    },created(){
         
        this.guardarToken();
        this.listar_usuarios();
    },methods:{      
        guardarToken(){
            if (typeof window !== "undefined"){                
                this.token = localStorage.getItem("token"); 
              }                     
        },cambioValor(){
            this.enEdicion = false;
            this.usuario={
                tipo_documento:"",
                documento:"",
                nombre:"",
                apellidos:"",
                celular:"",
                correo:"",
                rol:"",
                clave:"",
                acciones:true                
            }
        },
        listar_usuarios(){
            let url = config.url_api + `/usuario`;
            console.log(url);
    
            axios
            .get(url, {headers: {token: this.token}})
            .then((response) => {
                console.log(response);
                this.lista_usuarios = response.data.info;
                for (const i in this.lista_usuarios) {
                   this.lista_usuarios[i].acciones = true;
                }
                
            }).catch((error)=>{
            console.log(error);
            });
        },
        cargarUsuario({item}){
            this.index = item.index;
            this.enEdicion =true;
            let url = config.url_api + `/usuario/${item.documento}`;

            axios.get(url, {headers: {token: this.token}})
            .then((response)=>{
                var array = response.data.info;
                this.usuario.tipo_documento = array[0].tipo_documento;
                this.usuario.documento = array[0].documento;
                this.usuario.nombre = array[0].nombre;
                this.usuario.apellidos = array[0].apellidos;
                this.usuario.celular = array[0].celular;
                this.usuario.correo = array[0].correo;
                this.usuario.cilindraje = array[0].cilindraje;
                this.usuario.rol = array[0].rol;
                this.usuario.clave = array[0].clave;
                this.usuario.acciones = true;
            })
            .catch((error)=>{
                this.mensajes(error);
            })
        },crearUsuario(){
            let url =  config.url_api + `/usuario/`
            axios.post(url, this.usuario, {headers:{token: this.token}})
            .then(response =>{
                this.listar_usuarios();
                this.usuario={
                    tipo_documento:"",
                    documento:"",
                    nombre:"",
                    apellidos:"",
                    celular:"",
                    correo:"",
                    rol:"",
                    clave:"",
                    acciones:true
                }
                alert("Información actualizada correctamente");
            })
            .catch(error =>{
                this.mensajes(error);
            })
        },
        actualizarUsuario(){
            let url =  config.url_api + `/usuario/${this.usuario.documento}`
            axios.put(url, this.usuario, {headers:{token: this.token}})
            .then(response =>{
                
                this.lista_tareas.splice(this.index, 1, this.usuario);
                this.enEdicion = false;
                //this.listar_usuarios();
                this.usuario={
                    tipo_documento:"",
                    documento:"",
                    nombre:"",
                    apellidos:"",
                    celular:"",
                    correo:"",
                    rol:"",
                    clave:"",
                    acciones:true
                }
                alert("Información actualizada correctamente");
            })
            .catch(error =>{
                this.mensajes(error);
            })
        },eliminarUsuario({item}){
            this.enEdicion =true;
            let url = config.url_api + `/usuario/${item.placa}`;

            axios.delete(url, {headers: {token: this.token}})
            .then((response)=>{
                this.lista_usuarios.splice(item.index, 1);
                //this.listar_usuarios();
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