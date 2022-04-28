<template>
  <q-page class="bg-grey-3 column">
    <q-list class="bg-white" separator bordered>
      <q-item
        v-for="(task, index) in tasks"
        :key="task.index"
        @click="task.done = !task.done"
        :class="{ 'done bg-blue-grey-2': task.done }"
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
        <!-- <q-item-section v-if="task.done" side> 🍔 </q-item-section> -->
        <q-item-section v-if="task.done" side>
          <q-btn
            @click.stop="deleteTask(index)"
            flat
            round
            dense
            color="primary"
            icon="delete"
          />
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
          title: "Buscar a Mel.",
          description: "Pet-Shop fecha ás 10:00.",
          done: true,
        },
        {
          title: "Comprar Abacaxi",
          description: "Comprar 3x.",
          done: false,
        },
        {
          title: "Comprar Bananas",
          description: "5 cachos não verdes.",
          done: false,
        },
      ],
    };
  },
  methods: {
    deleteTask(index) {
      console.log(`Deleting task with index: ${index}`);
      this.tasks.splice(index, 1);
    },
  },
});
</script>

<style lang="scss">
.done {
  .q-item__label {
    text-decoration: line-through;
    color: rgb(154, 151, 151);
  }
}
</style>
