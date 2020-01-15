<template>
    
    <v-container fluid>

        <v-row>

            <v-col cols="12">

                <v-toolbar flat color="white">

                    <v-toolbar-title>Listado de tamaños de imagenes</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-toolbar-items>

                        <v-btn link to="/imagesize" elevation="0">
                            <v-icon>mdi-plus-thick</v-icon>
                        </v-btn>

                    </v-toolbar-items>

                </v-toolbar>

            </v-col>

            <v-col cols="12">

                <v-data-table
                    :headers="headers"
                    :items="content"
                    :search="search"
                >

                    <template v-slot:item.action="{ item }">
                        <router-link :to="`/imagesize/${item._id}`">
                            <v-icon
                                class="mr-2"
                            >
                                mdi-file-edit-outline
                            </v-icon>
                        </router-link>
                        <v-icon
                            @click="deleteItem(item)"
                        >
                            mdi-delete-outline
                        </v-icon>
                    </template>

                </v-data-table>

            </v-col>

        </v-row>

    </v-container>

</template>

<script>

import axios from 'axios'

export default {
    data () {
        return {
            url: process.env.VUE_APP_URL,
            errors: [],
            search: '',
            headers: [
                {
                    text: 'Nombre',
                    value: 'name',
                },
                {
                    text: 'Ancho',
                    value: 'width',
                },
                {
                    text: 'Alto',
                    value: 'height',
                },
                {
                    text: 'Modo',
                    value: 'mode',
                },
                {
                    text: 'Acciones',
                    value: 'action',
                    align: 'right',
                    sortable: false
                }
            ],
            content: []
        }
    },
    created() {

        axios.get(`${this.url}/api/imagesize`)
        .then( response => {
            console.log(response)
            this.content = response.data.data
        })
        .catch(e =>{
            this.errors.push(e)
        })

    },
    methods: {
        deleteItem(item) {

        }
    }
}
</script> 