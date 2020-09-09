let cursoComp= {
    template: ` <tr>
                    <td>{{cod_est}}</td>
                    <td>{{nombre_est}}</td>
                    <td><v-text-field type="number" min="0" max="5" @blur="saludar($event.target.value)" color="success" :placeholder="this.nota.toString()" step="0.1"></v-text-field></td>
                </tr>`,
    props: {
        curso_id: {
            type: String,
            required: true
        },
        cod_est: {
            type: String,
            required: true
        },
        nombre_est: {
            type: String,
            required: true
        },
        nota: {
            type: Number,
            default: null
        }
    },
    methods: {
        saludar(nNota){
            this.nota=parseInt(nNota);
            this.$emit('cambioNota',{curs_id: this.curso_id, nota: this.nota})
        }
    },
}