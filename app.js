const MainWindow = {
  data() {
    return {
      maxPlayer: sandboxCapicity,
      mapSize: sandboxMapSize,
      tableData: Sandbox.playerList,
      settings: {
        maxPlayer: 10,
      },
    };
  },
  methods: {
    update() {
      sandboxCapicity = +this.maxPlayer;
      sandboxMapSize = +this.mapSize;
    },
    init() {
      initModel();
      this.tableData = Sandbox.playerList;
    },
  },
};

const app = Vue.createApp(MainWindow);
app.use(ElementPlus);
ElementPlus.locale(ElementPlus.lang.zhCn);
app.mount("#app");
