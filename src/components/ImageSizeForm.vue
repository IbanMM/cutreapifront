<template>

    <v-form
        ref="form"
        v-model="valid"
        :lazy-validation="lazy"
    >

        <v-container>

            <v-row v-if="render">

                <v-col v-for="(field, index) in fields" v-bind:key="index" cols="12" sm="12" md="12">

                    <component v-bind:is="field.type"
                        @emitField="addField"
                        :fieldData="field"
                    ></component>

                </v-col>

                <v-col cols="12" sm="12" md="12">

                    <v-btn
                        :disabled="!valid"
                        color="success"
                        class="mr-4"
                        @click="validate"
                    >
                      {{ $t('forms.save') }}
                    </v-btn>

                </v-col>

            </v-row>

        </v-container>

    </v-form>

</template>

<script>

import axios from 'axios'
import { mixinForms } from '../mixins/mixinForms'

export default {
    mixins:[mixinForms],
    data: () => ({
        url: process.env.VUE_APP_URL,
        content: false,
        render: false,
        errors: [],
        lazy: true,
        valid: true,
        fields:[
            {'type':'BaseInputText','value':'','label':'Nombre','name':'name','placeholder':'Título','rules':['notempty']},
            {'type':'BaseInputText','value':'','label':'Ancho','name':'width','placeholder':'Título2','rules':['notempty']},
            {'type':'BaseInputText','value':'','label':'Alto','name':'height','placeholder':'Título2','rules':['notempty']},
            {'type':'BaseInputSelect','value':'','items':[{'value':'cover','text':'Cover'},{'value':'otro','text':'Otro'}],'label':'Modo','name':'mode','placeholder':'Mode','rules':['notempty']},
        ]
    }),
    created() {

        this.id = this.$route.params.id

        if (typeof this.id !== 'undefined') {
        
            axios.get(`${this.url}/api/imagesizeone`,{
                params: {
                    id: this.id
                }
            })
            .then( response => {
                console.log(response)
                this.content = response.data.data
                this.populateFields(this.content)
                console.log(this.content.name)
            })
            .catch(e =>{
                this.errors.push(e)
            })

        } else {

            this.render = true

        }

    },
    methods: {
        validate () {

            if (this.$refs.form.validate()) {

                this.sendForm()
                
            }

        },
        populateFields(content) {

            let keys = Object.keys(content)

            keys.forEach((value,i) => {
                
                let obj = this.fields.find(x => x.name === value)

                if(typeof obj !== 'undefined') {
                
                    let index = this.fields.indexOf(obj);
                    this.fields.fill(obj.value=this.content[value], index, index++)

                    let field = {'name':obj.name,'value':obj.value}

                    this.addField(field)

                }

            })

            this.render = true

        },
        sendForm() {

            let config = {

                headers: { 'content-type': 'multipart/form-data' }

            }

            /*
            for(var pair of this.fdata.entries()) {
                console.log(pair[0]+ ', '+ pair[1]);
            }
            */

           if (typeof this.id !== 'undefined') {

               this.update(config)

           } else {

               this.new(config)

           }
            
            
            
        },
        update(config) {

            this.setId()
            
            axios.patch(`${this.url}/api/imagesizeone`, this.fdata, config)
            .then(response => {

                if(response.data.status == "success") {

                    this.$router.push({path:'/imagesizes'})

                }
                
            })
            .catch(e => {
                this.errors.push(e)
                console.log(this.errors)
            })

        },
        new(config) {

            axios.post(`${this.url}/api/imagesizeone`, this.fdata, config)
            .then(response => {

                if(response.data.status == "success") {

                    this.$router.push({path:'/imagesizes'})

                }
                
            })
            .catch(e => {
                this.errors.push(e)
                console.log(this.errors)
            })

        }
        
    }

}
</script>
    
