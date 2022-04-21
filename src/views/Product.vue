<template>
    <div>
        <h1>PRODUCT</h1>
        <table style="width:100%" class="order">
            <tr>
                <th>Name</th>
                <td>{{product.name}}</td>
            </tr>
            <tr>
                <th>Amount</th>
                <td>${{product.amount}}</td>
            </tr>
            <tr>
                <th>Created At</th>
                <td>{{product.created_at}}</td>
            </tr>

            <tr>
                <th>Category</th>
                <td>{{product.category}}</td>
            </tr>

            <tr>
                <th>Description</th>
                <td>{{product.description}}</td>
            </tr>

            <tr>
                <th>Scanned?</th>
                <td>{{ product.is_scanned ? 'YES' : 'NO' }}</td>
            </tr>
        </table>

        <v-alert v-if="error"
            border="bottom"
            color="pink darken-1"
            dark
        >
            {{error}}
        </v-alert>
        <v-row v-if="!product.is_scanned">
            <v-col cols="6">
                <v-card>
                    <v-card-title>Product Scanner</v-card-title>
                    <qrcode-stream @decode="onDecode" @init="onInit"></qrcode-stream>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import Vue from "vue";
import VueQrcodeReader from "vue-qrcode-reader"
import apiClient from './../services/apiClient'

Vue.use(VueQrcodeReader);

const PENDING_STATUS = 'Pending'
const PROCESSING_STATUS = 'Processing'
const DONE_STATUS = 'Done'

export default {
    name: 'product-view',
    data () {
        return {
            product: {},
            error: '',
            result: '',
            is_scanned: false
        }
    },
    async mounted () {
        await apiClient.get(`products/${this.$route.params.product_id}`).then(response => {
            console.log("Product loaded successfully : " + JSON.stringify(response))
            this.product = response.data.product
        }).catch(error => {
            console.log("Failed : " + error)
        })
    },
    methods: {
        getStatus (status) {
            if (status === 1) return PENDING_STATUS
            else if (status === 2) return PROCESSING_STATUS
            else return DONE_STATUS
        },
        async onDecode (decodedString) {
            console.log("DECODE STRING: " + JSON.stringify(decodedString))
            this.result = decodedString
            if(decodedString == this.product.unique_product_id){
                await apiClient.put(`products/${this.$route.params.product_id}`).then(response => {
                    console.log("Product is scanned : " + JSON.stringify(response.data.product))
                    this.product = response.data.product
                }).catch(error => {
                    console.log("Failed : " + error)
                })
            }
        },
        async onInit(promise){
            console.log('onInit process...');
        try {
          await promise
        } catch (error) {
          if (error.name === 'NotAllowedError') {
            this.error = "ERROR: you need to grant camera access permission"
          } else if (error.name === 'NotFoundError') {
            this.error = "ERROR: no camera on this device"
          } else if (error.name === 'NotSupportedError') {
            this.error = "ERROR: secure context required (HTTPS, localhost)"
          } else if (error.name === 'NotReadableError') {
            this.error = "ERROR: is the camera already in use?"
          } else if (error.name === 'OverconstrainedError') {
            this.error = "ERROR: installed cameras are not suitable"
          } else if (error.name === 'StreamApiNotSupportedError') {
            this.error = "ERROR: Stream API is not supported in this browser"
          } else if (error.name === 'InsecureContextError') {
            this.error = 'ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.';
          } else {
            this.error = `ERROR: Camera error (${error.name})`;
          }
        }
      },
    },
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
    .order {
        margin-bottom: 2em;
    }

    .error {
        font-weight: bold;
        color: red;
    }
</style>