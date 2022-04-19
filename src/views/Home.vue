<template>
    <div>
        <h1>ORDERS</h1>
        <v-data-table
            :headers="headers"
            :items="orders"
            :items-per-page="5"
            class="elevation-1"
        >
        <template v-slot:[`item.status`]="{ item }">
            <v-chip :color="getColor(item.status)" dark>
            {{ getStatus(item.status) }}
            </v-chip>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
            <router-link :to="`/orders/${item.id}`">
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
  name: "home-view",

  data() {
    return {
      orders: [],
      headers: [
        { text: "Order reference", value: "order_reference" },
        { text: "Status", value: "status" },
        { text: "Created At", value: "created_at" },
        { text: "Customer", value: "customer" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  async mounted() {

    await apiClient.get('/orders')
        .then((response) => {
            this.orders = response.data.orders.data;
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
};
</script>
