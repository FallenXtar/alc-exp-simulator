const MainWindow = {
  data() {
    return {
      tableData: [],
      settings: {
        maxPlayer: sandboxCapicity,
        mapSize: sandboxMapSize,
        targetTurns: 10,
      },
      showResult: true,
      helpVisible: false,
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
        Sandbox.initModel();
        this.tableData = Sandbox.getLeaderboard(20);
      } catch (error) {
        this.$notify.error({
          title: "有错误发生",
          message: "查看控制台获取详情",
          duration: 0,
        });
        throw error;
      }
      this.showResult = false;
    },
    start() {
      this.$message({ message: "开始运行模型", center: true });

      Sandbox.run(this.settings.targetTurns);
      this.$message({ message: "模型运行结束", center: true });
      this.tableData = Sandbox.getLeaderboard(20);
    },
    step() {
      Sandbox.run(1);
      this.tableData = Sandbox.getLeaderboard(20);
    },
    pause() {},
  },
};

const app = Vue.createApp(MainWindow);
app.use(ElementPlus);
ElementPlus.locale(ElementPlus.lang.zhCn);
app.mount("#app");
