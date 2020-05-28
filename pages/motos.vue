<template>
  <div>
    <br />
    <b-container class="bv-example-row mb-3">
      <br />
      <b-row cols="2">
        <b-col>
          <br />
          <b-card title="Gestión de Motos">
            <b-card-text>A continuación ingrese la información necesaria para el registro de la moto:</b-card-text>
            <!--FORMULARIO DE CREACIÓN DE MOTOS-->
            <b-form action="javascript:void(0)" >

              <b-form-group label="Placa" label-for="placa">
                <b-form-input
                  class="form-control"
                  v-model="moto.placa"
                  required
                  :disabled="enEdicion"
                  placeholder="Ingrese la placa de la moto"
                  id="placa"
                />
                
              </b-form-group>
              <b-form-group label="Estado" label-for="estado">
                <b-form-input
                  class="form-control"                  
                  required
                  placeholder="Ingrese el estado de la moto"
                  id="estado"
                  v-model="moto.estado"
                />
              </b-form-group>

              <b-form-group label="Clase" label-for="clase">
                <b-form-input
                  class="form-control"
                 v-model="moto.clase"
                  id="clase"
                  required
                  placeholder="Ingrese la clase de moto"
                />
              </b-form-group>

              <b-form-group label="Marca" label-for="marca">
                <b-form-input
                  class="form-control"
                v-model="moto.marca"
                  id="marca"
                  required
                  placeholder="Ingrese la marca de la moto"
                />
              </b-form-group>

              <b-form-group label="Modelo" label-for="modelo">
                <b-form-input
                  class="form-control"
                 v-model="moto.modelo"
                  id="modelo"
                  required
                  placeholder="Ingrese el modelo de la moto"
                />
              </b-form-group>

              <b-form-group label="Color" label-for="color">
                <b-form-input
                  class="form-control"
                 v-model="moto.color"
                  id="color"
                  required
                  placeholder="Ingrese el color de la moto"
                />
              </b-form-group>

              <b-form-group label="Cilindraje" label-for="cilindraje">
                <b-form-input
                  class="form-control"
                 v-model="moto.color"
                  id="cilindraje"
                  required
                  placeholder="Ingrese el cilindraje de la moto"
                />
              </b-form-group>

              <b-form-group label="id Propietario" label-for="id_propietario">
                <b-form-input
                  class="form-control"
                 v-model="moto.id_propietario"
                  id="id_propietario"
                  required
                  placeholder="Ingrese el id del propietario"
                />
              </b-form-group>

              <b-form-group label="Número SOAT" label-for="nro_soat">
                <b-form-input
                  class="form-control"
                 v-model="moto.nro_soat"
                  id="nro_soat"
                  required
                  placeholder="Ingrese el número de SOAT"
                />
              </b-form-group>

              <b-form-group label="Vencimiento SOAT" label-for="vencimiento_soat">
                <b-form-input
                  class="form-control"
                 v-model="moto.vencimiento_soat"
                  id="vencimiento_soat"
                  type="date"
                  required
                  placeholder="Ingrese la fecha de vencimiento"
                />
              </b-form-group>

              <b-form-group label="Número tecnomecanica" label-for="nro_tecnomecanica">
                <b-form-input
                  class="form-control"
                 v-model="moto.nro_tecnomecanica"
                  id="nro_tecnomecanica"
                  required
                  placeholder="Ingrese número de la tecnomecánica"
                />
              </b-form-group>

              <b-form-group label="Vencimiento tecnomecanica" label-for="vencimiento_tecnomecanica">
                <b-form-input
                  class="form-control"
                 v-model="moto.vencimiento_tecnomecanica"
                  id="vencimiento_tecnomecanica"
                  type="date"
                  required
                  placeholder="Ingrese la fecha de vencimiento"
                />
              </b-form-group>

              <b-button type="submit" variant="danger" v-if="!enEdicion">Crear Tarea</b-button>
              <b-button  variant="primary" v-else>Actualizar moto</b-button>
            </b-form>
          </b-card>
        </b-col>
        <b-col>
          <br />
          <b-table
            striped
            responsive
            hover
            :items="lista_motos"
            v-show="showTable"
            class="border text-center"
          >
            <template v-slot:cell(acciones)="row">
              <b-button size="sm"  class="mr-2" variant="outline-primary">
                <!--b-img left src="@/static/images/edit.png" width="15" height="15"></!--b-img-->Modificar
              </b-button>
              <br />
              <br />
              <b-button
                size="sm"
                
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
<script src="../assets/motos.js"/>