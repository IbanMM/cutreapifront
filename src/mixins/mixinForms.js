export const mixinForms = {
    data() {
        return {
            fdata: new FormData()
        }
    },
    methods: {
        addField(field) {

            if(this.fdata.get(field.name) !== null) {

                this.fdata.set(field.name,field.value)

            } else {

                this.fdata.append(field.name,field.value)

            }
        },
        addFieldFile(field) {

            if(this.fdata.get(field.name) !== null) {

                this.fdata.set(field.name,field.value,field.value.name)

            } else {

                this.fdata.append(field.name,field.value,field.value.name)

            }

        },
        sendValue() {

            console.log(this.model)

            this.$emit('emitField', { 'name':this.name, 'value':this.model } )

        },
        sendValueFile() {

            this.$emit('emitFieldFile', { 'name':this.name, 'value':this.model } )

        },
        setId() {

            this.fdata.set('id',this.id)

        }

    }

}