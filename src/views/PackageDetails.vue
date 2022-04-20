<template>
    <div>
        <h1>PACKAGE #{{packageData.package_reference}}</h1>
        <table style="width:100%" class="package">
            <tr>
                <th>Package reference</th>
                <td>{{packageData.package_reference}}</td>
            </tr>
            <tr>
                <th>Status</th>
                <td>{{getStatus(packageData.status)}}</td>
            </tr>
            <tr>
                <th>Created At</th>
                <td>{{packageData.created_at}}</td>
            </tr>

            <tr>
                <th>Items</th>
                <td>{{packageItems.length}} products</td>
            </tr>

            <tr>
                <th>Description</th>
                <td>{{packageData.description}} products</td>
            </tr>
        </table>
        <v-alert type="success" v-if="success">
            Products was successfully added to the selected Package
        </v-alert>
        <v-btn
            color="success"
            class="mr-4 add-product-package"
            @click="addToPackage()"
        >
            Add selected products to the package
        </v-btn>
        <router-link :to="`/packages/${this.$route.params.package_id}/items`">
            <v-btn
            color="success"
            class="mr-4 add-product-package"
            >
                Package Items
            </v-btn>
        </router-link>
        <router-link :to="`/packages/${this.$route.params.package_id}/tracking`">
            <v-btn
            color="success"
            class="mr-4 add-product-package"
            >
                Tracking
            </v-btn>
        </router-link>
        <v-data-table
            v-model="selected"
            :headers="headers"
            :items="products"
            :items-per-page="5"
            show-select
            class="elevation-1"
        >
        </v-data-table>
  </div>
</template>

<script>
import apiClient from './../services/apiClient'

const PENDING_STATUS = "Pending";
const PROCESSING_STATUS = "Processing";
const DONE_STATUS = "Done";

export default {
    name: 'package-details-view',
    data: () => ({
        error: false,
        packageData: '',
        success: false,
        products: [],
        selected: [],
        packageItems: [],
        headers: [
            { text: "Name", value: "name" },
            { text: "Category", value: "category" },
            { text: "Amount", value: "amount" },
            { text: "Created At", value: "created_at" },
            { text: "UPI", value: "unique_product_id" },
            { text: "Scan", value: "is_scanned" },
        ],
    }),
    mounted() {

        apiClient.get(`/packages/${this.$route.params.package_id}`).then(response => {
            this.packageData = response.data.package
            this.products = response.data.products.data
            this.packageItems = response.data.packageItems.data
            console.log("Package loaded successfully: " + JSON.stringify(response.data.package))
        }).catch(error => {
            this.error = true
            console.log("Failed: " + error)
        })
    },
    methods: {
        async addToPackage() {
            await apiClient.put(`/packages/${this.$route.params.package_id}/add-products`, {products: this.selected}).then(response => {
                console.log("Products added successfully")
                this.success = true
            }).catch(error => {
                this.error = true
                this.success = false
                console.log("Failed: " + error)
            })
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
    .add-product-package{
        margin-bottom: 1em;
    }
    table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
    }
    th, td {
        padding: 5px;
        text-align: left;
    }
    .package {
        margin-bottom: 2em;
    }
</style>