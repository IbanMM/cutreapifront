<template>
		
	<v-form
		ref="form"
		v-model="valid"
		:lazy-validation="lazy"
	>
	
		<v-container class="fill-height">

			<v-row>

				<v-col cols="12">

					<v-toolbar
						:flat="true"
						:dark="true"
					>

						<v-toolbar-title>Nuevo usuario</v-toolbar-title>

						<v-spacer></v-spacer>

					</v-toolbar>

				</v-col>

				<v-col cols="12" >

					<v-text-field
						v-model="name"
						:rules="nameRules"
						label="Nombre"
						placeholder="Nombre"
					></v-text-field>

				</v-col>

				<v-col cols="12" >

					<v-text-field
						v-model="email"
						:rules="emailRules"
						label="E-mail"
						placeholder="E-mail"
					></v-text-field>

				</v-col>

				<v-col cols="12" >

					<v-text-field
						v-model="password"
						:append-icon="show1 ? 'mdi-eye-check' : 'mdi-eye'"
						:type="show1 ? 'text' : 'password'"
						name="input-10-1"
						label="Password"
						placeholder="Password"
						:rules="passwordRules"
						hint="Por lo menos 6 caracteres"
						counter
						@click:append="show1 = !show1"
					></v-text-field>

				</v-col>

				<v-col cols="12" sm="12" md="12">

					<v-btn
						:disabled="!valid"
						color="success"
						class="mr-4"
						@click="validate"
					>
						Crear nuevo usuario
					</v-btn>

				</v-col>

			</v-row>

			<v-row justify="center">

				<v-dialog v-model="dialog" persistent max-width="290">

					<v-card>

						<v-card-title class="headline">User info</v-card-title>
						<v-card-text>{{ dialog_text }}</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="primary" text @click="dialog = false">OK</v-btn>
						</v-card-actions>

					</v-card>

				</v-dialog>

			</v-row>

			<v-overlay :value="overlay">

				<v-progress-circular indeterminate size="64"></v-progress-circular>

			</v-overlay>

		</v-container>
	
	</v-form>
		
</template>

<script>

import axios from 'axios';

export default {
	data: () => ({
		url: process.env.VUE_APP_URL,
		dialog: false,
		dialog_text: '',
		show1: false,
		valid: true,
		name: '',
		errors: [],
		overlay: false,
		nameRules: [
			v => !!v || 'Nombre es requerido',
			v => (v && v.length <= 10) || 'Tiene que tener menos de 10 caracteres',
		],
		email: '',
		emailRules: [
			v => !!v || 'E-mail es requerido',
			v => /.+@.+\..+/.test(v) || 'E-mail no es válido',
		],
		password: '',
		passwordRules: [
			v => !!v || 'Nombre es requerido',
			v => (v && v.length <= 6) || 'Tiene que tener menos de 6 caracteres',
		],
		lazy: false,
	}),
	methods: {
		validate () {
			if (this.$refs.form.validate()) {
				this.overlay = true
				axios.post(`${this.url}/api/user`, {
					name: this.name,
					email: this.email,
					password: this.password
				})
				.then(response => {
					console.log(response);
					this.dialog_text = response.data.message
					this.dialog = true
					this.overlay = false
					this.reset();
					this.resetValidation();
				})
				.catch(e => {
					this.errors.push(e)
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