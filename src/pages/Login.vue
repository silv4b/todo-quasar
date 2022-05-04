<template>
  <q-page class="bg-primary row justify-center items-center">
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-white q-my-md">Todo Login</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                square
                filled
                clearable
                v-model="email"
                type="email"
                label="email"
              />
              <q-input
                square
                filled
                clearable
                v-model="password"
                type="password"
                label="password"
              />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn
              unelevated
              color="primary"
              size="lg"
              class="full-width"
              label="Login"
              @Click="verifyRequest()"
            />
          </q-card-actions>
          <q-card-section class="text-center q-pa-none">
            <p>
              <a
                class="text-grey-6"
                href="https://quasar.dev/layout/routing-with-layouts-and-pages"
                style="text-decoration: none"
                target="_blank"
                >Created an Account</a
              >
            </p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { onBeforeUnmount } from "vue";

export default {
  name: "LoginPage",
  setup() {
    const $q = useQuasar();
    let timer;

    onBeforeUnmount(() => {
      if (timer !== void 0) {
        clearTimeout(timer);
        $q.loading.hide();
      }
    });

    function showLoading() {
      $q.loading.show();
      timer = setTimeout(() => {
        $q.loading.hide();
        timer = void 0;
      }, 2000);
    }

    return {
      showLoading,
    };
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    verifyRequest() {
      if (this.email == "" && this.password == "") {
        this.$q.notify({
          message: "Senha/Email vazios 😢",
          color: "red",
        });
      } else {
        this.email = "";
        this.password = "";
        this.showLoading();
        setTimeout(() => {
          this.$router.push("/todo");
        }, 2000);
      }
    },
  },
  beforeMount() {
    this.email = "";
    this.password = "";
  },
};
</script>

<style>
.q-card {
  width: 360px;
}

.q-px-md {
  margin-bottom: 1rem;
}
</style>
