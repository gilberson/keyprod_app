<template>
    <v-container fluid>
        <v-row align="center">
            <v-col
                class="d-flex"
                cols="12"
                sm="6"
            >
                <v-select
                    item-text="tracking_number"
                    item-value="id"
                    :items="tracking"
                    label="Select the tracking number"
                    v-model="trackingId"
                    @change="getTracking"
                ></v-select>
            </v-col>

            <div v-if="selectedTracking">
                <table style="width:100%" class="tracking">
                    <tr>
                        <th>Tracking number</th>
                        <td>{{selectedTracking.tracking_number}}</td>
                    </tr>
                    <tr>
                        <th>Status</th>
                        <td>{{getStatus(selectedTracking.status)}}</td>
                    </tr>
                    <tr>
                        <th>Created At</th>
                        <td>{{selectedTracking.created_at}}</td>
                    </tr>
                    <tr>
                        <th>Description</th>
                        <td>{{selectedTracking.description}}</td>
                    </tr>
                </table>
            </div>
        </v-row>
    </v-container>
</template>

<script>
import apiClient from './../services/apiClient'

const PENDING_STATUS = "Pending";
const PROCESSING_STATUS = "Processing";
const DONE_STATUS = "Done";

export default {
    name: 'trackings-view',
    data: () => ({
        error: false,
        tracking: [],
        items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
        trackingId: '',
        selectedTracking: ''
    }),
    mounted(){

        apiClient.get(`/tracking`).then(response => {
            this.tracking = response.data.tracking.data
            console.log("Tracking loaded successfully")
        }).catch(error => {
            this.error = true
            console.log("Failed: " + error)
        })
    },
    methods: {
        getTracking(){
            apiClient.get(`/tracking/${this.trackingId}`).then(response => {
            this.selectedTracking = response.data.tracking
            console.log("Tracking found")
            }).catch(error => {
                this.error = true
                console.log("Failed: " + error)
            })
        },
        getStatus (status) {
            if (status === 1) return PENDING_STATUS
            else if (status === 2) return PROCESSING_STATUS
            else return DONE_STATUS
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
        margin-bottom: 2em;
    }

    .error {
        font-weight: bold;
        color: red;
    }
</style>