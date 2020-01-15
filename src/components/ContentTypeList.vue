<template>
    
    <v-container fluid>

        <v-row>

            <v-col cols="12">

                <v-toolbar flat color="white">

                    <v-toolbar-title>Listado de contenidos</v-toolbar-title>

                </v-toolbar>

            </v-col>

            <v-col cols="12">

                <v-data-table
                    :headers="headers"
                    :items="content"
                    :search="search"
                >

                    <template v-slot:item.action="{ item }">
                        <v-icon
                            class="mr-2"
                            @click="editItem(item)"
                        >
                            mdi-file-edit-outline
                        </v-icon>
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
export default {
    data () {
        return {
            search: '',
            headers: [
                {
                    text: 'Nombre',
                    value: 'name',
                },
                {
                    text: 'Fecha',
                    value: 'date',
                },
                {
                    text: 'Acciones',
                    value: 'action',
                    align: 'right',
                    sortable: false
                }
            ],
            content: [
                {
                    name: 'Nombre contenido',
                    date: '12-12-2019'
                }
            ]
        }
    }
}
</script> 