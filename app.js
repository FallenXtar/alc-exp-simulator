const MainWindow = {
  data() {
    return {
      maxPlayer: sandboxCapicity,
      mapSize: sandboxMapSize,
    };
  },
  methods: {
    update() {
      sandboxCapicity = +this.maxPlayer;
      sandboxMapSize = +this.mapSize;
    },
    init() {
      initModel();
    },
  },
};

const app = Vue.createApp(MainWindow);
app.use(ElementPlus);
app.mount("#app");
