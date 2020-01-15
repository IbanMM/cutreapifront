<template>

	<v-app>

		<v-app-bar
			app
			color="primary"
			dark
		>
			<div class="d-flex align-center">
				<Logo />
			</div>

			<v-spacer></v-spacer>

			<v-btn
				href="https://github.com/vuetifyjs/vuetify/releases/latest"
				target="_blank"
				text
			>
				<span class="mr-2">Latest Release</span>
				<v-icon>mdi-open-in-new</v-icon>

			</v-btn>

		</v-app-bar>

		<v-navigation-drawer v-if="$store.state.login"
			class="black"
			expand-on-hover
			permanent
			dark
			app
		>
			<template v-slot:prepend>

				<v-list>

					<v-list-item>

						<v-list-item-avatar>

							<v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>

						</v-list-item-avatar>

					</v-list-item>

					<v-list-item
						link
						two-line
					>
						<v-list-item-content>

							<v-list-item-title class="title">{{ $store.state.name }}</v-list-item-title>

							<v-list-item-subtitle>{{ $store.state.email }}</v-list-item-subtitle>

						</v-list-item-content>

						<v-list-item-action>

							<v-icon>mdi-menu-down</v-icon>

						</v-list-item-action>

					</v-list-item>

				</v-list>

			</template>

			<v-divider></v-divider>

			<v-list
				nav
				dense
			>
				<v-list-item link>

					<v-list-item-icon>

						<v-icon>mdi-folder</v-icon>

					</v-list-item-icon>

					<v-list-item-title>My Files</v-list-item-title>

				</v-list-item>
				<v-list-item link :to="`/imagesizes`">

					<v-list-item-icon>

						<v-icon>mdi-image-edit</v-icon>

					</v-list-item-icon>

					<v-list-item-title>Imágenes</v-list-item-title>

				</v-list-item>

			</v-list>

		</v-navigation-drawer>

		<v-content>

			<router-view></router-view>

		</v-content>

	</v-app>

</template>

<script>
//import HelloWorld from './components/HelloWorld';
import Logo from '../public/deploy-logo.svg';
export default {
	name: 'App',

	components: {
		Logo,
	},

	data: () => ({
		//
	}),
	mounted() {
		/*
		if(!this.$store.state.login) {
				this.$router.replace({ name: "login" });
		}
		*/
	},
};
</script>
