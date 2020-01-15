<template>

    <v-container
        class="fill-height"
        fluid
    >

        <v-row
            align="center"
            justify="center"
        >

            <v-col
                cols="12"
                sm="8"
                md="4"
            >

                <v-card class="elevation-12">

                    <v-toolbar
                        color="primary"
                        dark
                        flat
                    >

                        <v-toolbar-title>Login</v-toolbar-title>

                    </v-toolbar>

                    <v-card-text>

                        <v-form
                            ref="form"
                            v-model="valid"
                            :lazy-validation="lazy"
                        >

                            <v-text-field
                                v-model="email"
                                label="Email"
                                name="email"
                                :rules="emailRules"
                                prepend-icon="mdi-shield-account"
                                type="text"
                            />

                            <v-text-field
                                v-model="password"
                                id="password"
                                label="Password"
                                name="password"
                                :rules="passwordRules"
                                prepend-icon="mdi-shield-key"
                                type="password"
                            />

                        </v-form>

                    </v-card-text>

                    <v-card-actions class="justify-center">

                        <v-btn @click="login" color="primary"
                            :loading="loading"
                        >Login</v-btn>

                    </v-card-actions>

                </v-card>

                <v-snackbar
                    v-model="snackbar"
                    :top="false"
                    color="error"
                    :timeout="timeout"
                >

                    {{ message }}

                    <v-btn
                        color="blue"
                        text
                        @click="snackbar = false"
                    >
                        <v-icon color="#fff">mdi-close</v-icon>
                    </v-btn>

                </v-snackbar>

            </v-col>

        </v-row>

    </v-container>

</template>

<script>

import axios from 'axios';

export default {
    data: () => ({
      //login: this.$store.state.login,
      url: process.env.VUE_APP_URL,
      loading: false,
      errors: [],
      email: '',
      lazy: false,
      valid: false,
      snackbar: false,
      timeout: 6000,
      message: '',
      emailRules: [
        v => !!v || 'E-mail es requerido',
        v => /.+@.+\..+/.test(v) || 'E-mail no es válido',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password es requerido',
        v => (v && v.length <= 6) || 'Tiene que tener menos de 6 caracteres',
      ],
    }),

    methods: {
      login () {
        if (this.$refs.form.validate()) {
          this.loading = true
          console.log(this.$store.state.login);
          axios.get(`${this.url}/api/user-login`, {
                params: {
                    email: this.email,
                    password: this.password
                }
            })
            .then(response => {
                if(response.data.status=='success') {
                    this.$store.commit('setName',response.data.data.name)
                    this.$store.commit('setEmail',response.data.data.email)
                    this.$store.commit('logged',true)
                } else {
                    this.message = response.data.message
                    this.snackbar = true
                }
                this.loading = false;
                this.reset();
                this.resetValidation();
            })
            .catch(e => {
                this.errors.push(e)
                console.log(e);
            })
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
}
</script>