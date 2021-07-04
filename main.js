/* 沙盒基本参数设置 */

var sandboxCapicity = 1000;

var sandboxMapSize = 1000;

/* 生成沙盒对象 */

var Sandbox = {
  playerList: [],
  map: [],
  internalTime: 0,
  timesRun: 0,
  initPlayer() {
    this.playerList.push(0);
  },
  reset() {
    this.playerList = [];
  },
};

var Player = {
  id: 0,
  status: 0,
  kill: 0,
  death: 0,
  get kd() {
    return this.kill + "/" + this.death;
  },
  get timesBattled() {
    return this.kill + this.death;
  },
  battleLog: [],
};
