<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import store from '@/store';

export default {
  mounted () {
    this.$taskHub.$on('score-changed', this.taskNew);
    this.isMobile();
  },
  methods: {
    taskNew({ message }) {
      this.notify(message);
    },
    //Тестовый метод уведомления
    notify (msg) {
      this.$notification.show('АИС "Диспетчерская служба"', {
          body: msg
      }, {})

      this.$notify({
        title: 'Уведомление',
        message: msg,
        duration: 0,
      });

      store.commit("setSystemNotify", true);
    },
    isMobile() {
      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        store.commit("setSystemUserAgentMobile", true);
      } else {
        store.commit("setSystemUserAgentMobile", false);
      }
    }
  }
}
</script>