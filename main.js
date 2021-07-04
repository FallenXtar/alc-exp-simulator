/* 沙盒基本参数设置 */

var sandboxCapicity = 100;
// 定义最大玩家数量；

var sandboxMapSize = 1000;
// 定义一维地图大小，地图会向原点两边扩展这个大小；

/* 生成沙盒对象 */

var Sandbox = {
  playerList: [],
  // 玩家列表

  map: [],
  // 地图

  internalTime: 0,
  // 本次运行到的回合数

  timesRun: 0,
  // 沙盒运行过的次数

  initPlayer() {
    this.playerList = [];
    for (let index = 0; index < sandboxCapicity; index++) {
      let i = Object.create(Player);
      i.id = index;
      this.playerList.push(i);
    }
  },
  // 定义玩家初始化函数，生成指定数量的玩家，并填入玩家列表
};

var Player = {
  id: 0,
  // 玩家ID，用于区分不同玩家，由 0 开始的整数

  status: 0,
  // 玩家当前经验值，如果为-1代表玩家目前未复活

  kill: 0,
  // 玩家击败次数

  death: 0,
  // 玩家被击败次数

  get kd() {
    return this.kill + "/" + this.death;
  },
  // 返回玩家的击杀/死亡比

  get timesBattled() {
    return this.kill + this.death;
  },
  // 返回玩家的总战斗场次

  battleLog: [],
  //玩家的战斗记录
};

/* 一些公用函数 */

function expToLevel(exp) {
  let level = 0;
  let index = 1;
  while (index < exp) {
    level++;
    exp -= index;
    index++;
  }
  return [level, exp];
}
// 输入经验值，输出当前等级和溢出的经验数量组成的数组

function expTransfer(exp) {
  if (exp < 3) {
    return 1;
  } else {
    return _.floor(exp / 3);
  }
}
// 死亡时经验值结算，获得对方经验的1/3，最低获得1点
