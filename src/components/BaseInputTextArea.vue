<template>

    <div class="textarea">

        <label class="v-label theme--light">{{label}}</label>
        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
        <v-input class="fake-input" v-model="fakeInput" :rules="localRules">Input</v-input>

    </div>

</template>

<script>

import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import '@ckeditor/ckeditor5-build-classic/build/translations/es'

import EventBus from '../mixins/EventBus'
import Rules from '../mixins/Rules';

export default {
    props: ['name','label','rules'],
    data() {
        return {
            content: {},
            editor: ClassicEditor,
            editorData: '<p>Content of the editor.</p>',
            fakeInput: '',
            rulesL: new Rules(),
            localRules: [],
            editorConfig: {
                // The configuration of the editor.
                language: 'es'
            }
        };
    },
    mounted() {

        EventBus.$on('get-text-area', ()=> {

            this.setTextAreaContent();

        })

        this.rules.forEach(name => {
            this.localRules.push(this.rulesL.getRule(name))
        })

        this.fakeInput = this.editorData

    },
    methods: {

        setTextAreaContent() {

            this.$emit('addContent', {name:this.name, content:this.editorData});

        }

    },
    watch: {

        editorData: function(val) {

            if(val == '') {
                this.fakeInput = '';
            } else {
                this.fakeInput = 'Content';
            }

        }

    }

}
</script>

<style lang="scss">
    .fake-input {
        margin-top: 0.5rem;
        .v-input__slot {
            display: none!important;
        }
    }
</style>