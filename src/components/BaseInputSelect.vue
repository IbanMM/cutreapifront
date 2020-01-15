<template>
    
    <v-select
        v-model="model"
        :items="items"
        :name="name"
        :rules="localRules"
        :label="label"
        type="text"
        @change="sendValue()"
    >

    </v-select>

</template>

<script>

import Rules from '../mixins/Rules'
import { mixinForms } from '../mixins/mixinForms'

export default {
    mixins:[mixinForms],
    //props: ['value','label','name','items','rules'],
    props: {
        fieldData: {
            type: Object,
            default: () => {}
        }
    },
    data: function() {
        return {
            model: this.fieldData.value,
            items: this.fieldData.items,
            name: this.fieldData.name,
            rules: this.fieldData.rules,
            label: this.fieldData.label,
            rulesL: new Rules(),
            localRules: [],
            readonly: false
        }
    },
    mounted() {
        this.rules.forEach(name => {
            this.localRules.push(this.rulesL.getRule(name))
        })
    }
}
</script>