<template>
    <v-text-field
        v-model="model"
        :label="label"
        :placeholder="placeholder"
        :name="name"
        :rules="localRules"
        type="text"
        @input="sendValue()"
    />
</template>

<script>

import Rules from '../mixins/Rules'
import { mixinForms } from '../mixins/mixinForms'

export default {
    //props: ['value','label','name','placeholder','rules'],
    mixins:[mixinForms],
    props: {
        fieldData: {
            type: Object,
            default: () => {}
        }
    },
    data: function() {
        return {
            model: this.fieldData.value,
            label: this.fieldData.label,
            placeholder: this.fieldData.placeholder,
            name: this.fieldData.name,
            rules: this.fieldData.rules,
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