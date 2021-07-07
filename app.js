const MainWindow = {
  data() {
    return {
      tableData: Sandbox.playerList,
      settings: {
        maxPlayer: sandboxCapicity,
        mapSize: sandboxMapSize,
      },
    };
  },

  created() {
    this.$alert(
      "请勿尝试使用异常或过大的参数初始化模型！可能导致你的浏览器冻结甚至设备死机！",
      "重要提示",
      {
        confirmButtonText: "知道了",
      }
    );
  },
  methods: {
    update() {
      sandboxCapicity = +this.settings.maxPlayer;
      sandboxMapSize = +this.settings.mapSize;
      this.$message.success({ message: "参数已更新", center: true });
    },
    init() {
      try {
        initModel();
        this.tableData = Sandbox.playerList;
      } catch (error) {
        this.$notify.error({
          title: "有错误发生",
          message: "查看控制台获取详情",
          duration: 0,
        });
        throw error;
      }
    },
    start() {
      this.$message({ message: "什么都没有发生，因为还没写好", center: true });
    },
  },
};

const app = Vue.createApp(MainWindow);
app.use(ElementPlus);
ElementPlus.locale(ElementPlus.lang.zhCn);
app.mount("#app");
