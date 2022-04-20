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
            The tracking could not be created
        </v-alert>
        <!-- FORM -->
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
            <v-text-field
                v-model="tracking_number"
                :rules="trackingNumberRules"
                label="Tracking number"
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
                @click="createTracking"
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
        tracking: '',
        valid: true,
        tracking_number: '',
        description: '',
        trackingNumberRules: [
            v => !!v || 'Tracking number is required',
        ],

        description: ''
    }),
    mounted() {

    },
    methods: {
        async createTracking() {
            this.$refs.form.validate()
            const data = {
                tracking_number: this.tracking_number,
                description: this.description
            }
            apiClient.post(`/packages/${this.$route.params.package_id}/tracking/create`, data).then(response => {
                this.package = response.data.tracking
                console.log("Tracking created successfully")
                this.$refs.form.reset()
                this.$router.push({ name: 'tracking' })
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