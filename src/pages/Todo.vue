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
          <q-item-label caption
            >Criada em {{ task.date }} às {{ task.hour }}</q-item-label
          >
        </q-item-section>
        <q-item-section v-if="task.done" side>
          <q-btn
            @click.stop="deleteTask(task)"
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
      <q-fab color="primary" icon="keyboard_arrow_left" direction="left">
        <q-fab-action
          color="primary"
          @click="selectAllTasks(tasks)"
          icon="check"
        />
        <q-fab-action
          color="primary"
          @click="deleteAllTasks(tasks)"
          icon="delete"
        />
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { date } from "quasar";
import useNotify from "../composables/useNotify";
import useDialog from "../composables/useDialog";

export default defineComponent({
  name: "TodoPage",
  setup() {
    const { notifySuccess } = useNotify();
    const { dialogShow, dialogPromptShow } = useDialog();

    function deleteTask(task) {
      dialogShow({ message: `Deletar tarefa ${task.title}?` }).onOk(() => {
        var taskIndex = this.tasks.indexOf(task);
        this.tasks.splice(taskIndex, 1);
        notifySuccess(`Tarefa ${task.title} excluída com sucesso! 👌`);
      });
    }

    function notifyStatusTask(task) {
      if (task.done) {
        notifySuccess("Tarefa alterada para concluída! ✅");
      } else {
        notifySuccess("Tarefa alterada para não concluída! ✅");
      }
    }

    /**
     * TO-DO: Criar composable de dialog com prompt (done!).
     */

    function editTask(task) {
      dialogPromptShow({
        title: "Editar tarefa",
        message: "Edite sua tarefa.",
        prompt: task.title,
      }).onOk((data) => {
        var indexTask = this.tasks.findIndex((x) => x.sId == task.sId);
        this.tasks[indexTask].title = data;
        notifySuccess(`Tarefa ${task.title} editada com sucesso! 👌`);
      });
    }

    return {
      deleteTask,
      notifySuccess,
      notifyStatusTask,
      editTask,
      useNotify,
    };
  },
  data() {
    return {
      newTask: "",
      notifyQ: useNotify(),
      dialogQ: useDialog(),
      tasks: [],
    };
  },
  methods: {
    generateStringId() {
      return Math.random().toString(36).substring(2, 7);
    },
    selectAllTasks(tasks) {
      if (tasks.length == 0) return this.notifyQ.notifyWarnig("Lista vazia!");
      this.dialogQ
        .dialogShow({
          tittle: "Confirmar",
          message: "Selecionar todas as tarefas?",
        })
        .onOk(() => {
          for (var j = 0; j < tasks.length; j++) {
            if (tasks[j].done == false) {
              tasks[j].done = true;
            }
          }
          this.notifyQ.notifySuccess("Mancando todas como feitas! 💝");
        });
    },
    deleteAllTasks(tasks) {
      if (tasks.length == 0) return this.notifyQ.notifyWarnig("Lista vazia!");
      this.dialogQ
        .dialogShow({
          tittle: "Confirmar",
          message: "Deletar todas as tarefas?",
        })
        .onOk(() => {
          try {
            var result = tasks.filter(function (task) {
              return task.done == true;
            });

            for (var elemento of result) {
              var index = tasks.indexOf(elemento);
              tasks.splice(index, 1);
            }

            this.notifyQ.notifySuccess("Tarefas removidas com sucesso!");
          } catch (err) {
            this.notifyQ.showError(err);
          }
        });
    },
    addTask() {
      if (this.newTask == "") {
        this.notifyQ.notifyError("Descrição vazia 😒");
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

        this.notifyQ.notifySuccess("Tarefa adicionada com sucesso! 🌻");
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
