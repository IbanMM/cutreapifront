<template>
    
    <v-form
        ref="form"
        v-model="valid"
        :lazy-validation="lazy"
    >

        <v-container>

            <v-row>

                <v-col v-for="(field, index) in fields" v-bind:key="index" cols="12" sm="12" md="12">

                    <component v-if="field.type === 'BaseInputText'" v-bind:is="field.type"
                        :value="field.value"
                        :label="field.label"
                        :name="field.name"
                        :placeholder="field.placeholder"
                        :rules="field.rules"
                    ></component>

                    <component v-if="field.type === 'BaseInputImage'" v-bind:is="'BaseInputImage'"
                        :name="field.name"
                        :label="field.label"
                        :rules="field.rules"
                    />

                    <component v-if="field.type === 'BaseInputTextArea'" v-bind:is="'BaseInputTextArea'"
                        @addContent="addTextArea"
                        :label="field.label"
                        :name="field.name"
                        :rules="field.rules"
                    />

                </v-col>

                <!--

                <v-col cols="12" sm="12" md="12">

                    <component @addContent="addTextArea" name="textarea1" v-bind:is="'BaseInputTextArea'" />

                </v-col>

                -->

                <v-col cols="12" sm="12" md="12">

                    <v-btn
                        :disabled="!valid"
                        color="success"
                        class="mr-4"
                        @click="validate"
                    >
                      Guardar
                    </v-btn>

                </v-col>

            </v-row>

        </v-container>

    </v-form>

</template>

<script>

import axios from 'axios'
import EventBus from '../mixins/EventBus'

export default {
    data: () => ({
        url: process.env.VUE_APP_URL,
        formData:'',
        textAreas: {},
        type: 'pruebaTextArea',
        content: {},
        errors: [],
        lazy: true,
        valid: true,
        fields:[
            {'type':'BaseInputText','value':'Valorinicial','label':'Título','name':'titulo','placeholder':'Título','rules':['notempty']},
            {'type':'BaseInputText','value':'Valorinicial2','label':'Título2','name':'titulo2','placeholder':'Título2','rules':['notempty']},
            {'type':'BaseInputImage','label':'Avatar','name':'avatar','rules':['filenotempty']},
            {'type':'BaseInputTextArea','label':'Area de texto','name':'texto','rules':['notempty']}
            ]
    }),
    methods: {
      validate () {

        if (this.$refs.form.validate()) {

          this.getTextAreas()
          this.sendForm()
          
        }

      },
      reset () {

        this.$refs.form.reset()

      },
      resetValidation () {

        this.$refs.form.resetValidation()

      },
      getTextAreas () {

        EventBus.$emit('get-text-area');

      },
      addTextArea (data) {

        this.textAreas[data.name] = data.content;

      },
      sendForm() {

        this.formData = new FormData(this.$refs.form.$el);
        
        for( var key in this.textAreas) {

            this.formData.set(key,this.textAreas[key])

        }
        
        let config = {

            headers: { 'content-type': 'multipart/form-data' }

        }

        /*
        for(var pair of this.formData.entries()) {
            console.log(pair[0]+ ', '+ pair[1]);
        }
        */
        
        axios.post(`${this.url}/api/content-upload`, this.formData, config)
        .then(response => {
            console.log(response.data.data.data);
            this.reset();
            this.resetValidation();
        })
        .catch(e => {
            this.errors.push(e)
            console.log(this.errors)
        })
        
        
      }

    },
}
</script>