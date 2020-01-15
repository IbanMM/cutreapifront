<template>

    <v-file-input
        accept="image/*"
        v-model="model"
        :label="label"
        :name="name"
        :rules="localRules"
        @change="sendValueFile()"
    >
    </v-file-input>

</template>

<script>

import Rules from '../mixins/Rules'
import { mixinForms } from '../mixins/mixinForms'

export default {
    mixins:[mixinForms],
    props: ['label','name','rules'],
    data: function() {
        return {
            model: [],
            rulesL: new Rules(),
            localRules: [],
        }
    },
    mounted() {
        this.rules.forEach(name => {
            this.localRules.push(this.rulesL.getRule(name))
        })
    }
}
</script>
    