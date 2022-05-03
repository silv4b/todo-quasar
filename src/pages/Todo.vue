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
        <!-- v-touch-hold:2000.mouse="handleHold" -->
        <q-item-section avatar>
          <q-checkbox
            v-model="task.done"
            class="no-pointer-events"
            color="primary"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ task.title }}</q-item-label>
          <q-item-label caption
            >Criada em {{ task.date }} às {{ task.hour }}</q-item-label
          >
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
        <q-item-section v-else side>
          <q-btn
            @click.stop="editTask(task)"
            flat
            round
            dense
            color="primary"
            icon="edit"
          />
        </q-item-section>
      </q-item>
    </q-list>
    <div v-if="!tasks.length" class="no-tasks absolute-center">
      <q-icon name="check" size="4rem" color="primary"></q-icon>
      <div class="text-h6 text-primary text-center">Sem tarefas 😢</div>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn @click="selectAllTasks(tasks)" fab icon="check" color="primary" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useQuasar, date } from "quasar";

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
        var taskIndex = this.tasks.indexOf(task);
        this.tasks.splice(taskIndex, 1);
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

    function editTask(task) {
      $q.dialog({
        title: "Editar tarefa",
        message: "Edite sua tarefa.",
        prompt: {
          model: task.title,
          type: "text",
        },
        cancel: true,
        persistent: true,
      }).onOk((data) => {
        var indexTask = this.tasks.findIndex((x) => x.sId == task.sId);
        this.tasks[indexTask].title = data;
        showNotification(`Tarefa ${task.title} editada com sucesso! 👌`);
      });
    }

    return {
      confirmDelete,
      showNotification,
      notifyStatusTask,
      editTask,
    };
  },
  data() {
    return {
      newTask: "",
      tasks: [
        {
          sId: "lkjhs",
          title: "Tarefa 1.",
          date: "02/05/2022",
          hour: "00:16:01",
          done: false,
        },
        {
          sId: "yuiii",
          title: "Tarefa 2.",
          date: "02/05/2022",
          hour: "00:18:07",
          done: false,
        },
        {
          sId: "qwrdd",
          title: "Tarefa 3.",
          date: "02/05/2022",
          hour: "00:18:67",
          done: false,
        },
      ],
    };
  },
  methods: {
    selectAllTasks(tasks) {
      for (var j = 0; j < tasks.length; j++) {
        if (tasks[j].done == false) {
          tasks[j].done = true;
        }
      }
      this.notify("Mancando todas como feitas! 💝");
    },
    generateStringId() {
      return Math.random().toString(36).substring(2, 7);
    },
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
      } else {
        var id = this.generateStringId();
        const timeStamp = Date.now();
        this.tasks.push({
          sId: id,
          title: this.newTask,
          date: date.formatDate(timeStamp, "DD/MM/YYYY"),
          hour: date.formatDate(timeStamp, "HH:mm:ss"),
          done: false,
        });

        this.notify("Tarefa adicionada com sucesso! 🌻");
        this.newTask = "";
      }
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
