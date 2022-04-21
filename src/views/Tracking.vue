<template>
    <div>
        <h1>Package Tracking</h1>
        <router-link :to="`/packages/${this.$route.params.package_id}/tracking/create`" v-if="!tracking">
            <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
            >
                Create Tracking
            </v-btn>
        
        </router-link>

        <router-link :to="`/packages/${this.$route.params.package_id}`">
            <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
            >
                Package
            </v-btn>
        
        </router-link>

        <table style="width:100%" class="tracking" v-if="tracking">
            <tr>
                <th>Tracking number</th>
                <td>{{tracking.tracking_number}}</td>
            </tr>
            <tr>
                <th>Status</th>
                <td>{{getStatus(tracking.status)}}</td>
            </tr>
            <tr>
                <th>Created At</th>
                <td>{{tracking.created_at}}</td>
            </tr>

            <tr>
                <th>Description</th>
                <td>{{tracking.description}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
import apiClient from './../services/apiClient'

const PENDING_STATUS = "Pending";
const PROCESSING_STATUS = "Processing";
const DONE_STATUS = "Done";


export default {
    name: 'tracking-view',
    data: () => ({
        error: false,
        tracking: '',
        valid: true,
        tracking_number: '',
        isTracked: false,
        trackingNumberRules: [
            v => !!v || 'Tracking number is required',
        ],
        description: '',
        headers: [
            { text: "Tracking number", value: "tracking_number" },
            { text: "Status", value: "status" },
            { text: "Created At", value: "created_at" },
            { text: "Description", value: "description" },
            { text: "Actions", value: "actions", sortable: false },
        ],
    }),
    mounted() {

        apiClient.get(`/packages/${this.$route.params.package_id}/tracking`).then(response => {
            this.tracking = response.data.tracking
            console.log("Tracking loaded successfully")
        }).catch(error => {
            this.error = true
            console.log("Failed: " + error)
        })
    },
    methods: {
        showForm() {
            this.isTracked = true
        },
        getStatus(status) {
            if (status === 1) return PENDING_STATUS;
            else if (status === 2) return PROCESSING_STATUS;
            else return DONE_STATUS;
        }
    }
}
</script>

<style scoped>
    table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
    }
    th, td {
        padding: 5px;
        text-align: left;
    }
    .tracking {
        margin-top: 2em;
    }
</style>