<template>
    <div>
        <h1>Create package</h1>
        <router-link :to="`/packages`">
            <v-btn
                color="success"
                class="mr-4 packages"
            >
                Packages
            </v-btn>
        </router-link>
        <v-alert v-if="error"
            border="bottom"
            color="pink darken-1"
            dark
        >
            The package could not be created
        </v-alert>
        <!-- FORM -->
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
            <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Name"
                required
            ></v-text-field>

            <v-textarea
                v-model="description"
                label="Description"
                required
            ></v-textarea>

            <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="createPackage"
            >
                Create
            </v-btn>
        </v-form>
    </div>
</template>

<script>
import apiClient from './../services/apiClient'

export default {
    name: 'package-view',

    data: () => ({
        error: false,
        package: '',
        valid: true,
        name: '',
        nameRules: [
            v => !!v || 'Name is required',
            //v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],

        description: ''
    }),
    mounted() {

    },
    methods: {
        async createPackage() {
            this.$refs.form.validate()
            const data = {
                name: this.name,
                description: this.description
            }
            apiClient.post('/packages', data).then(response => {
                this.package = response.data.package
                console.log("Package created successfully: " + JSON.stringify(response.data.package))
                this.$refs.form.reset()
                this.$router.push({ name: 'packages' })
            }).catch(error => {
                this.error = true
                console.log("Failed: " + error)
            })
        },
    }
}
</script>

<style scoped>
    .packages {
        margin-bottom: 1em;
    }
</style>