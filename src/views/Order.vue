<template>
    <div>
        <h1>ORDER #{{order.order_reference}}</h1>
        <table style="width:100%" class="order">
            <tr>
                <th>Order reference</th>
                <td>{{order.order_reference}}</td>
            </tr>
            <tr>
                <th>Status</th>
                <td>{{getStatus(order.status)}}</td>
            </tr>
            <tr>
                <th>Created At</th>
                <td>{{order.created_at}}</td>
            </tr>

            <tr>
                <th>Customer</th>
                <td>{{order.customer}}</td>
            </tr>

            <tr>
                <th>Items</th>
                <td>{{order_items.length}} products</td>
            </tr>

            <tr>
                <th>Total Amount</th>
                <td>${{(order.total).toFixed(2)}}</td>
            </tr>
        </table>
        <v-card class="mx-auto">
        <v-toolbar color="pink" dark>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title>Products</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon>mdi-checkbox-marked-circle</v-icon>
            </v-btn>
        </v-toolbar>

        <v-list two-line>
        <v-list-item-group
            v-model="selected"
            active-class="pink--text"
            multiple
        >
            <template v-for="(item, index) in order_items">
            <v-list-item :key="item.name">
                <template>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.name"></v-list-item-title>

                        <v-list-item-subtitle
                        class="text--primary"
                        v-text="item.headline"
                        ></v-list-item-subtitle>

                        <v-list-item-subtitle v-text="`$${item.amount}`"></v-list-item-subtitle>
                        <v-list-item-subtitle v-text="item.created_at"></v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                        <router-link :to="`/orders/${order.id}/products/${item.id}`">
                            <v-icon color="yellow darken-3">
                                mdi-eye-outline
                            </v-icon>
                        </router-link>
                    </v-list-item-action>
                </template>
            </v-list-item>

            <v-divider
                v-if="index < order_items.length - 1"
                :key="index"
            ></v-divider>
            </template>
        </v-list-item-group>
        </v-list>
    </v-card>
    <!-- ITEMS -->
    </div>
</template>

<script>
import apiClient from './../services/apiClient'

const PENDING_STATUS = 'Pending'
const PROCESSING_STATUS = 'Processing'
const DONE_STATUS = 'Done'

export default {
    name: 'order-view',

    data () {
        return {
            order_items: [],
            order: '',
            selected: [2]
        }
    },
    async mounted () {
        await apiClient.get(`orders/${this.$route.params.id}`).then(response => {
            console.log("Orders loaded successfully : " + JSON.stringify(response))
            this.order_items = response.data.order_items.data
            this.order = response.data.order
        }).catch(error => {
            console.log("Failed : " + error)
        })
    },
    methods: {
      getStatus (status) {
        if (status === 1) return PENDING_STATUS
        else if (status === 2) return PROCESSING_STATUS
        else return DONE_STATUS
      }
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
</style>