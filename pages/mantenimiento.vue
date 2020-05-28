<template>
  <div>
    <br />
    <b-container class="bv-example-row mb-3">
      <br />
      <b-row cols="2">
        <b-col>
          <br />
           
          <b-card title="Gestión de Mantenimientos">
              <b-img src="@/static/images/spanner.png" width="50" height="50"></b-img>
            <b-card-text>A continuación ingrese la información necesaria para el registro y modificación de un usuario:</b-card-text>
            <!--FORMULARIO DE CREACIÓN DE USUARIOS-->
            <b-form action="javascript:void(0)" >
                             
              <b-form-group label="id Mecánico" label-for="id_mecanico">
                <b-form-input
                  class="form-control"                  
                  required
                  placeholder="Ingrese el id del mecánico"
                  id="id_mecanico"
                  v-model="mantenimiento.id_mecanico"
                  :disabled="enEdicion"
                />
              </b-form-group>

              <b-form-group label="Placa moto" label-for="placa">
                <b-form-input
                  class="form-control"
                 v-model="mantenimiento.placa"
                  id="placa"
                  required
                  placeholder="Ingrese la placa de la moto"
                  :disabled="enEdicion"
                />
              </b-form-group>

              <b-form-group label="Fecha" label-for="fecha">
                <b-form-datepicker v-model="mantenimiento.fecha"
                  id="fecha" class="mb-2" 
                  placeholder="Ingrese la fecha del mantenimiento"
                  :disabled="enEdicion">
                  </b-form-datepicker>
              </b-form-group>

              <b-form-group label="Trabajos realizados" label-for="trabajos_realizados">
                <b-form-input
                  class="form-control"                  
                 v-model="mantenimiento.trabajos_realizados"
                  id="trabajos_realizados"
                  required
                  placeholder="Trabajos realizados en el mantenimiento"
                />
              </b-form-group>

              <b-form-group label="Horas invertidas" label-for="horas_invertidas">
                <b-form-input
                  class="form-control"
                 v-model="mantenimiento.horas_invertidas"
                 type="number"
                  id="horas_invertidas"
                  required
                  placeholder="Ingrese las horas invertidas"
                />
              </b-form-group>

        

              <b-button type="submit" variant="danger" v-if="!enEdicion">Crear mantenimiento</b-button>
              <b-button  variant="primary" v-else @click="actualizarMantenimiento()">Actualizar mantenimiento</b-button>
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
            :items="lista_mantenimientos"
            v-show="showTable"
            class="border text-center"
          >
            <template v-slot:cell(acciones)="row">
              <b-button size="sm"  class="mr-2" variant="outline-primary" @click="cargarMantenimiento(row)">
                <!--b-img left src="@/static/images/edit.png" width="15" height="15"></!--b-img-->Modificar
              </b-button>
              <br />
              <br />
              <b-button
                size="sm"
                @click="eliminarMantenimiento(row)"
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
<script src="../assets/mantenimiento.js"/>