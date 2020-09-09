let baseURL = 'http://0.0.0.0:5000/';
let Principal = Vue.component('principal-comp', {
    template: `
                <div>
                    <v-btn v-if="Object(grupoSel).length" @click="limpiar" color="primary">Volver</v-btn>
                    <v-row v-if="!curso" class="px-5">
                        <v-col cols="12" xs="12" sm="6">
                            <v-text-field label="Año" type="number" id="anio" min="0" v-model="anio"></v-text-field>
                        </v-col>
                        <v-col cols="12" xs="12" sm="6">
                            <v-select label="Semestre" id="semestre" :items="['1', '2']" v-model="semestre"></v-select>
                        </v-col>
                    </v-row>
                    <v-simple-table v-if="!Object(grupoSel).length">
                        <thead>
                            <tr>
                                <th class="text-left">Nombre Grupo</th>
                                <th class="text-left">Selecione</th>
                            </tr>
                        </thead>
                        <tbody>
                            <grupo-comp v-model="grupoSel" v-for="(grupo,key) in grupos" :key="key"
                            :grupo_id="grupo.id"
                            :nombre="grupo.nombre"/>
                        </tbody>
                    </v-simple-table>
                    <v-btn @click="estSemestre" color="info" v-if="!curso">Enviar</v-btn>
                    <v-simple-table v-if="curso">
                        <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>Nombre</th>
                                <th>Nota</th>
                            </tr>
                        </thead>
                        <tbody>
                            <curso-comp v-for="(estudiante, key) in estudiantes" :key="key"
                            :curso_id="estudiante.curso_id"
                            :nombre_est="estudiante.nombre"
                            :cod_est="estudiante.estudiante_id"
                            :nota="estudiante.nota"
                            @cambioNota="mostrar($event)"/>
                        </tbody>
                    </v-simple-table>
                    <v-btn v-if="curso" @click="generar" color="secondary">Generar</v-btn>
                </div>
                `,
    data() {
        return {
            grupos: {},
            grupoSel: {},
            estudiantes: {},
            semestre: {},
            anio: {},
            curso: false
        }
    },
    methods: {
        limpiar(){
            this.grupoSel = {};
            this.estudiantes={};
            this.curso = false;
        },
        mostrarEstudiantes(idGrupo, semestre){
            fetch(baseURL+`curso/grupo?grupo_id=${idGrupo}&semestre=${semestre}`)
            .then(res => res.json())
            .then(data =>{
                this.estudiantes=data;
            });
        },
        estSemestre(){
            let fecha = this.anio+this.semestre;
            console.log(fecha);
            this.mostrarEstudiantes(this.grupoSel,fecha);
            this.curso = true;
        },
        mostrar(data){
            this.estudiantes.map(function(dato){
                if(dato.curso_id==data.curs_id){
                    dato.nota = data.nota
                }
                return dato;
            });
        },
        generar(){
            this.estudiantes.forEach(estudiante => {
                console.log(estudiante);
                let nestudiante={
                    'semestre': estudiante.semestre,
                    'grupo_id': estudiante.grupo_id,
                    'estudiante_id': estudiante.estudiante_id,
                    'nota': estudiante.nota
                };
                let url = baseURL+`curso/grupo?curso_id=${estudiante.curso_id}`; 
                fetch(url, {
                    method: 'PUT', 
                    body: JSON.stringify(nestudiante),
                    headers:{
                      'Content-Type': 'application/json'
                    }
                }).then(res => res.json())
                .then(data =>{
                    console.log(data);
                })
                .catch(err =>{
                    console.error(err);
                });
            });
        }
    },
    mounted() {
        fetch(baseURL+'grupo')
        .then(res => res.json())
        .then(data =>{
            this.grupos = data;
        })  
    },
    components: {
        grupoComp,
        cursoComp
    }
});