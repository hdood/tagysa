<template>
  <div class="p-4">
    <NuxtLink to="/admin/nfc">
      <icon
        name="ic:round-arrow-back"
        size="45"
        class="p-1 cursor-pointer hover:bg-base-300 rounded-md"
      />
    </NuxtLink>
  </div>
  <div
    class="bg-base-100 p-4 rounded-lg w-11/12 mx-auto overflow-x-scroll lg:overflow-x-hidden"
  >
    <div v-if="orders.length == 0">You didn't order yet</div>
    <table class="table" v-else>
      <!-- head -->
      <thead>
        <tr>
          <th>#</th>
          <th>Status</th>
          <th>Date</th>
          <th>Address</th>
          <th>Card type</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        <tr
          v-for="order in orders"
          :key="order.id"
          class="hover:bg-base-200 cursor-pointer"
        >
          <th>
            {{ order.id }}
          </th>

          <td>{{ order.status }}</td>
          <td>
            {{ order.created_at }}
          </td>
          <td class="">
            <address>
              {{ order.address }}
            </address>
          </td>
          <td>{{ order.card.type }}</td>
          <td v-if="order.status == 'paid'">
            <Button
              type="danger"
              :loading="loading"
              :onclick="`cancel_modal_${order.id}.showModal()`"
            >
              Cancel</Button
            >
          </td>
          <td v-if="order.status == 'delivering'">
            <Button
              type="primary"
              :loading="loading"
              :onclick="`confirm_receiving_modal_${order.id}.showModal()`"
            >
              Confirm receiving</Button
            >
          </td>

          <dialog :id="`cancel_modal_${order.id}`" class="modal">
            <form method="dialog" class="modal-box">
              <button
                class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
              <h3 class="font-bold text-lg">Cancel Order</h3>
              <p class="py-4">Are you sure you want to cancel this order?</p>
              <div class="w-full flex justify-end">
                <Button type="danger" @click="confirmCancel(order.id)"
                  >Yes cancel my order</Button
                >
              </div>
            </form>
          </dialog>

          <dialog :id="`confirm_receiving_modal_${order.id}`" class="modal">
            <form method="dialog" class="modal-box">
              <button
                class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
              <h3 class="font-bold text-lg">Order Received</h3>
              <p class="py-4">Confirm receiving the order please</p>
              <div class="w-full flex justify-end">
                <Button type="primary" @click="confirmOrderReceiving(order.id)"
                  >Yes I received my order</Button
                >
              </div>
            </form>
          </dialog>
        </tr>
      </tbody>
      <!-- foot -->
      <tfoot>
        <tr>
          <th>#</th>
          <th>Status</th>
          <th>Date</th>
          <th>Address</th>
          <th>Card type</th>
          <th></th>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useOrdersStore } from "~/stores/orders";

const ordersStore = useOrdersStore();
const { orders } = storeToRefs(ordersStore);
const { fetchAll, cancel, confirmReceiving } = ordersStore;
const loading = ref(false);

async function confirmCancel(id) {
  loading.value = true;
  await cancel(id);
  await fetchAll();
  loading.value = false;
}
async function confirmOrderReceiving(id) {
  loading.value = true;
  await confirmReceiving(id);
  await fetchAll();
  loading.value = false;
}
onMounted(async () => {
  await fetchAll();
});
</script>

<style scoped></style>
