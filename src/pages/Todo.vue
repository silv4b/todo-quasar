<template>
  <q-page class="bg-grey-3 column">
    <div class="row q-pa-sm bg-primary">
      <q-input
        v-model="novaTarefa"
        @keyup.enter="
          addNewTask();
          novaTarefa = '';
        "
        square
        placeholder="Adicione uma tarefa."
        class="col"
        filled
        bg-color="white"
        dense
      >
        <template v-slot:append>
          <q-btn
            @click="
              addNewTask();
              novaTarefa = '';
            "
            round
            dense
            flat
            icon="add"
          />
        </template>
      </q-input>
    </div>
    <q-list class="bg-white" separator bordered>
      <q-item
        v-for="task in tasks"
        :key="task.index"
        @click="changeStatusTask(task)"
        :class="{ 'status bg-blue-grey-2': task.status }"
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-checkbox
            v-model="task.status"
            class="no-pointer-events"
            color="primary"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ task.tittle }}</q-item-label>
          <q-item-label caption
            >Criada em {{ task.date }} às {{ task.hour }}</q-item-label
          >
        </q-item-section>
        <q-item-section v-if="task.status" side>
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
      <div class="text-h6 text-primary text-center">Sem tarefas!</div>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab
        :disable="tasks.length == 0"
        color="primary"
        icon="keyboard_arrow_left"
        direction="left"
      >
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
import { defineComponent, reactive, ref } from "vue";
import { date } from "quasar";
import useNotify from "../composables/useNotify";
import useDialog from "../composables/useDialog";

export default defineComponent({
  name: "TodoPage",
  setup() {
    const { notifySuccess, notifyError } = useNotify();
    const { dialogShow, dialogPromptShow } = useDialog();

    let tasks = reactive(JSON.parse(localStorage.getItem("my_tasks")) || []);
    let novaTarefa = ref("");

    /**
      let tasks = reactive([
      {
        tittle: "Tarefa incompleta 1",
        date: "30/05/2022",
        status: false,
        hour: "23:39:05",
        sId: "asdas",
      },
      ]);

     */

    /** Sources
     * https://blog.logrocket.com/localstorage-javascript-complete-guide
     * https://social.msdn.microsoft.com/Forums/en-US/f8795f0e-e482-455f-9ee9-780476f93552/delete-an-item-in-array-which-is-stored-in-localstorage
     */

    function changeStatusTask(task) {
      var indexTask = tasks.findIndex((x) => x.sId == task.sId);
      tasks[indexTask].status = !tasks[indexTask].status;

      localStorage.removeItem("my_tasks");
      localStorage.setItem("my_tasks", JSON.stringify(tasks));
    }

    function addNewTask() {
      if (novaTarefa.value == "") {
        notifyError("Descrição vazia!");
        return;
      } else {
        var id = Math.random().toString(36).substring(2, 7);
        const timeStamp = Date.now();
        tasks.push({
          sId: id,
          tittle: novaTarefa.value,
          date: date.formatDate(timeStamp, "DD/MM/YYYY"),
          hour: date.formatDate(timeStamp, "HH:mm:ss"),
          status: false,
        });

        localStorage.setItem("my_tasks", JSON.stringify(tasks));
        notifySuccess("Tarefa adicionada com sucesso!");
      }
    }

    function deleteTask(task) {
      dialogShow({ message: `Deletar tarefa ${task.tittle}?` }).onOk(() => {
        var taskIndex = tasks.indexOf(task);
        tasks.splice(taskIndex, 1);

        localStorage.removeItem("my_tasks");
        localStorage.setItem("my_tasks", JSON.stringify(tasks));

        notifySuccess(`Tarefa ${task.tittle} excluída com sucesso!`);
      });
    }

    function selectAllTasks(tasks) {
      if (tasks.length == 0) return notifyError("Lista vazia!");
      dialogShow({
        tittle: "Confirmar",
        message: "Selecionar todas as tarefas?",
      }).onOk(() => {
        for (var j = 0; j < tasks.length; j++) {
          if (tasks[j].status == false) {
            tasks[j].status = true;
          }
        }
        localStorage.removeItem("my_tasks");
        localStorage.setItem("my_tasks", JSON.stringify(tasks));
        notifySuccess("Mancando todas como feitas!");
      });
    }

    function deleteAllTasks(tasks) {
      if (tasks.length == 0) return notifyError("Lista vazia!");
      dialogShow({
        tittle: "Confirmar",
        message: "Deletar todas as tarefas?",
      }).onOk(() => {
        try {
          var result = tasks.filter(function (task) {
            return task.status == true;
          });
          for (var elemento of result) {
            var index = tasks.indexOf(elemento);
            tasks.splice(index, 1);
          }
          localStorage.removeItem("my_tasks");
          localStorage.setItem("my_tasks", JSON.stringify(tasks));
          notifySuccess("Tarefas removidas com sucesso!");
        } catch (err) {
          showError(err);
        }
      });
    }

    function editTask(task) {
      dialogPromptShow({
        tittle: "Editar tarefa",
        message: "Edite sua tarefa.",
        prompt: task.tittle,
      }).onOk((data) => {
        var indexTask = tasks.findIndex((x) => x.sId == task.sId);
        tasks[indexTask].tittle = data;
        localStorage.removeItem("my_tasks");
        localStorage.setItem("my_tasks", JSON.stringify(tasks));
        notifySuccess(`Tarefa ${task.tittle} editada com sucesso!`);
      });
    }

    return {
      tasks,
      novaTarefa,
      changeStatusTask,
      addNewTask,
      selectAllTasks,
      deleteAllTasks,
      deleteTask,
      notifySuccess,
      editTask,
      useNotify,
    };
  },
});
</script>

<style lang="scss">
.status {
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
