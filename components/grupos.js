let grupoComp = {
    template: `
                <tr>
                    <td>{{nombre}}</td>
                    <td><v-btn @click="saludar" color="success">seleccionar</v-btn></td>
                </tr>
                `,
    methods: {
        saludar(){
            console.log(this.nombre);
            this.$emit('input',this.grupo_id);
        }
    },
    props: {
        grupo_id: {
            required: true,
            type: String
        },
        nombre: {
            required: true,
            type: String
        }
    },
};