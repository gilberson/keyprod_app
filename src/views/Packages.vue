<template>
    <div>
        <h1>PACKAGES</h1>
        <router-link :to="`packages/create`">
            <v-btn
                color="success"
                class="mr-4 create-package"
            >
                Create
            </v-btn>
        </router-link>
        <v-data-table
            :headers="headers"
            :items="packages"
            :items-per-page="5"
            class="elevation-1"
        >
        <template v-slot:[`item.status`]="{ item }">
            <v-chip :color="getColor(item.status)" dark>
            {{ getStatus(item.status) }}
            </v-chip>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
            <router-link :to="`/packages/${item.id}`">
            <v-btn>Details</v-btn>
            </router-link>
        </template>
        </v-data-table>
    </div>
</template>

<script>
import apiClient from './../services/apiClient'

const PENDING_STATUS = "Pending";
const PROCESSING_STATUS = "Processing";
const DONE_STATUS = "Done";

export default {
    name: 'package-view',

    data: () => ({
        error: false,
        packages: [],
        valid: true,
        name: '',
        nameRules: [
            v => !!v || 'Name is required',
            //v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        description: '',
        headers: [
            { text: "Name", value: "name" },
            { text: "Package reference", value: "package_reference" },
            { text: "Created At", value: "created_at" },
            { text: "Status", value: "status" },
            { text: "Description", value: "description" },
            { text: "Actions", value: "actions", sortable: false },
        ],
    }),
    async mounted () {
        await apiClient.get('/packages')
        .then((response) => {
            this.packages = response.data.packages;
        })
        .catch((error) => {
            console.log("Failed : " + error);
        });
    },
    methods: {
        getColor(status) {
            if (status == 1) return "red";
            else if (status == 2) return "orange";
            else return "green";
        },
        getStatus(status) {
            if (status === 1) return PENDING_STATUS;
            else if (status === 2) return PROCESSING_STATUS;
            else return DONE_STATUS;
        },
    },
}
</script>

<style scoped>
    .create-package {
        margin-bottom: 1em;
    }
</style>