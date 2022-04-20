<template>
    <div>
        <h1>PACKAGE ITEMS</h1><br/>
        <v-alert type="success" v-if="success">
            Products was successfully removed from the selected Package
        </v-alert>
        <router-link :to="`/packages/${this.$route.params.package_id}`">
            <v-btn
            color="success"
            class="mr-4 add-product-package"
            >
                Package
            </v-btn>
        </router-link>
        <router-link :to="`/packages`">
            <v-btn
            color="success"
            class="mr-4 add-product-package"
            >
                Package List
            </v-btn>
        </router-link>
        <v-btn
            color="error"
            class="mr-4 add-product-package"
            @click="removeProducts()"
            >
                Remove from the package
            </v-btn>
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
    name: 'package-items-view',
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

        apiClient.get(`/packages/${this.$route.params.package_id}/items`).then(response => {
            this.products = response.data.packageItems.data
            console.log("Package items loaded successfully")
        }).catch(error => {
            this.error = true
            console.log("Failed: " + error)
        })
    },
    methods: {
        async removeProducts() {
            await apiClient.put(`/packages/${this.$route.params.package_id}/remove-products`, {products: this.selected}).then(response => {
                console.log("Products removed successfully")
                this.success = true
            }).catch(error => {
                this.error = true
                this.success = false
                console.log("Failed: " + error)
            })
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