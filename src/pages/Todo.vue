<template>
  <q-page class="bg-grey-3 column">
    <div class="row q-pa-sm bg-primary">
      <q-input
        v-model="newTask"
        @keyup.enter="addTask"
        square
        placeholder="Adicionar Tarefa 😁"
        class="col"
        filled
        bg-color="white"
        dense
      >
        <template v-slot:append>
          <q-btn @click="addTask" round dense flat icon="add" />
        </template>
      </q-input>
    </div>
    <q-list class="bg-white" separator bordered>
      <q-item
        v-for="task in tasks"
        :key="task.index"
        @click="
          task.done = !task.done;
          notifyStatusTask(task);
        "
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
        </q-item-section>
        <q-item-section v-if="task.done" side>
          <q-btn
            @click.stop="confirmDelete(task)"
            flat
            round
            dense
            color="primary"
            icon="delete"
          />
        </q-item-section>
      </q-item>
    </q-list>
    <div v-if="!tasks.length" class="no-tasks absolute-center">
      <q-icon name="check" size="4rem" color="primary"></q-icon>
      <div class="text-h6 text-primary text-center">Sem tarefas 😢</div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "TodoPage",
  setup() {
    const $q = useQuasar();

    function confirmDelete(task) {
      $q.dialog({
        title: "Confirmar",
        message: `Deletar tarefa ${task.title}`,
        cancel: true,
        persistent: true,
      }).onOk(() => {
        this.tasks.splice(task.index, 1);
        showNotification(`Tarefa ${task.title} excluída com sucesso! 👌`);
      });
    }

    function showNotification(message) {
      $q.notify({
        message: message,
        color: "primary",
      });
    }

    function notifyStatusTask(task) {
      if (task.done) {
        $q.notify({
          message: "Tarefa alterada para concluída! ✅",
          color: "primary",
        });
      } else {
        $q.notify({
          message: "Tarefa alterada para não concluída! ❎",
          color: "primary",
        });
      }
    }

    return {
      confirmDelete,
      showNotification,
      notifyStatusTask,
    };
  },
  data() {
    return {
      newTask: "",
      tasks: [],
    };
  },
  methods: {
    notify(notification) {
      this.$q.notify({
        message: notification,
        color: "primary",
      });
    },
    addTask() {
      if (this.newTask == "") {
        this.notify("Descrição vazia 😒");
        return;
      }
      this.tasks.push({
        title: this.newTask,
        done: false,
      });
      this.notify("Tarefa adicionada com sucesso! 🌻");
      this.newTask = "";
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
.no-tasks {
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.6;
}
</style>
