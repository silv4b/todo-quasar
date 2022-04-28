<template>
  <q-page class="bg-grey-3 column">
    <q-list class="bg-white" separator bordered>
      <q-item
        v-for="task in tasks"
        :key="task.id"
        @click="task.done = !task.done"
        :class="{ 'done bg-blue-1': task.done }"
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-checkbox
            v-model="task.done"
            class="no-pointer-events"
            color="primary"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ task.title }}</q-item-label>
          <q-item-label caption>{{ task.description }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "TodoPage",
  data() {
    return {
      tasks: [
        {
          id: 1,
          title: "Buscar a Mel.",
          description: "Pet-Shop fecha ás 10:00.",
          done: true,
        },
        {
          id: 2,
          title: "Comprar Abacaxi",
          description: "Comprar 3x.",
          done: false,
        },
        {
          id: 3,
          title: "Comprar Bananas",
          description: "5 cachos não verdes.",
          done: false,
        },
      ],
    };
  },
});
</script>

<style lang="scss">
.done {
  .q-item__label {
    text-decoration: line-through;
    color: #bbb;
  }
}
</style>
