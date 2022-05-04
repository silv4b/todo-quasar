<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
      </q-toolbar>
      <div class="q-px-lg q-pt-xl q-mb-md">
        <div class="text-h3">Todo App</div>
        <div class="text-subtitle1">{{ todaysDate }}</div>
      </div>
      <q-img src="../statics/coffee.jpg" class="header-image absolute-top" />
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="250"
      :breakpoint="600"
    >
      <q-scroll-area
        style="
          height: calc(100% - 192px);
          margin-top: 192px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item exact to="/todo" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>

            <q-item-section> Todo </q-item-section>
          </q-item>

          <q-item exact to="/help" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="help" />
            </q-item-section>

            <q-item-section> Help </q-item-section>
          </q-item>

          <q-item
            class="fixed-bottom"
            exact
            @Click="logoutDialog()"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>

            <q-item-section> Logout </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="../statics/coffee.jpg"
        style="height: 192px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://avatars.githubusercontent.com/u/17997794?v=4" />
          </q-avatar>
          <div class="text-weight-bold">Bruno Silva</div>
          <div>@Silv4b</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, onBeforeUnmount } from "vue";
import { useQuasar } from "quasar";
import { date } from "quasar";

export default defineComponent({
  name: "MainLayout",
  components: {},
  computed: {
    todaysDate() {
      const timeStamp = Date.now();
      return date.formatDate(timeStamp, "dddd, D MMMM.");
    },
  },
  setup() {
    const leftDrawerOpen = ref(false);
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
      }, 1400);
    }

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }

    return {
      leftDrawerOpen,
      toggleLeftDrawer,
      showLoading,
    };
  },
  methods: {
    logoutDialog() {
      this.$q
        .dialog({
          title: "Confirmar Logout",
          message: "Deseja mesmo sair do sistema?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.showLoading();
          setTimeout(() => {
            this.$router.push("/");
          }, 1400);
        });
    },
  },
});
</script>

<style lang="scss">
.header-image {
  height: 100%;
  z-index: -1;
  opacity: 0.2;
  filter: grayscale(100%);
}
</style>
