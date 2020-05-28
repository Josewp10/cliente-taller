<template>
  <div>
    <br />
    <b-container class="bv-example-row mb-3">
      <br />
      <b-row cols="2">
        <b-col>
          <br />
           
          <b-card title="Gestión de Usuarios">
              <b-img src="@/static/images/form.png" width="50" height="50"></b-img>
            <b-card-text>A continuación ingrese la información necesaria para el registro y modificación de un usuario:</b-card-text>
            <!--FORMULARIO DE CREACIÓN DE USUARIOS-->
            <b-form action="javascript:void(0)" >

              <b-form-group label="Tipo documento" label-for="tipo_documento">
                <b-form-select id="tipo_documento" v-model="usuario.tipo_documento" :options="tipo_documentos" required></b-form-select>
              </b-form-group>
                             
              <b-form-group label="Documento" label-for="documento">
                <b-form-input
                  class="form-control"                  
                  required
                  placeholder="Ingrese el documento del usuario"
                  id="documento"
                  v-model="usuario.documento"
                  :disabled="enEdicion"
                />
              </b-form-group>

              <b-form-group label="Nombre" label-for="clase">
                <b-form-input
                  class="form-control"
                 v-model="usuario.nombre"
                  id="nombre"
                  required
                  placeholder="Ingrese el nombre del usuario"
                />
              </b-form-group>

              <b-form-group label="Apellidos" label-for="apellidos">
                <b-form-input
                  class="form-control"
                v-model="usuario.apellidos"
                  id="apellidos"
                  required
                  placeholder="Ingrese los apellidos del usuario"
                />
              </b-form-group>

              <b-form-group label="Celular" label-for="celular">
                <b-form-input
                  class="form-control"
                  type="number"
                 v-model="usuario.celular"
                  id="celular"
                  required
                  placeholder="Ingrese el telefono celular"
                />
              </b-form-group>

              <b-form-group label="Correo" label-for="correo">
                <b-form-input
                  class="form-control"
                 v-model="usuario.correo"
                  id="clave"
                  required
                  placeholder="Ingrese la clave del usuario"
                />
              </b-form-group>

              <b-form-group label="Rol" label-for="rol">
                 <b-form-select id="rol" v-model="usuario.rol" :options="roles_usuario" required>
                 </b-form-select>
              </b-form-group>

              <b-form-group label="Clave" label-for="clave">
                <b-form-input
                  class="form-control"
                 v-model="usuario.clave"
                  id="clave"
                  required
                  placeholder="Ingrese la clave del usuario"
                />
              </b-form-group>            

              <b-button type="submit" variant="danger" v-if="!enEdicion">Crear usuario</b-button>
              <b-button  variant="primary" v-else @click="actualizarUsuario()">Actualizar usuario</b-button>
              <b-button  variant="primary" v-if="enEdicion" @click="cambioValor()">Cancelar</b-button>
            </b-form>
          </b-card>
        </b-col>
        <b-col>
          <br />
          <b-table
            striped
            responsive
            hover
            :items="lista_usuarios"
            v-show="showTable"
            class="border text-center"
          >
            <template v-slot:cell(acciones)="row">
              <b-button size="sm"  class="mr-2" variant="outline-primary" @click="cargarUsuario(row)">
                <!--b-img left src="@/static/images/edit.png" width="15" height="15"></!--b-img-->Modificar
              </b-button>
              <br />
              <br />
              <b-button
                size="sm"
                @click="eliminarUsuario(row)"
                class="mr-2"
                variant="outline-danger"
              >
                <!--b-img left src="@/static/images/delete.png" width="15" height="15"></!--b-img-->Eliminar
              </b-button>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="../assets/usuarios.js"/>