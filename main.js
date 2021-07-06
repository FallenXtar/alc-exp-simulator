/* 沙盒基本参数设置 */

var sandboxCapicity = 10;
// 定义最大玩家数量；

var sandboxMapSize = 10;
// 定义一维地图大小，地图会向原点右边扩展这个大小；

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

  initMap() {
    this.map = [];
    for (let index = 0; index < sandboxMapSize; index++) {
      this.map.push([]);
    }
  },

  initPlayer() {
    this.playerList = [];
    for (let index = 0; index < sandboxCapicity; index++) {
      let i = Object.create(Player);
      i.id = index;
      i.setLocation = _.random(sandboxMapSize - 1);
      i.status = 0;
      this.playerList.push(i);
    }
  },
  // 定义玩家初始化函数，生成指定数量的玩家，并填入玩家列表
};

/* 玩家原型对象 */
var Player = {
  id: 0,
  // 玩家ID，用于区分不同玩家，由 0 开始的整数

  status: 0,
  // 玩家当前经验值，如果为-1代表玩家目前未复活

  highestExp: 0,

  kill: 0,
  // 玩家击败次数

  death: 0,
  // 玩家被击败次数

  location: NaN,

  set setLocation(target) {
    _.pull(Sandbox.map[this.location], this.id);
    this.location = target;
    Sandbox.map[target].push(this.id);
  },

  get kd() {
    return this.kill + "/" + this.death;
  },
  // 实用属性，返回玩家的击杀/死亡比

  get timesBattled() {
    return this.kill + this.death;
  },
  // 实用属性，返回玩家的总战斗场次

  get level() {
    return expToLevel(this.status);
  },

  // 实用属性，返回玩家的当前等级，和多余的经验数量，以数组呈现

  win(exp) {
    this.status = this.status + expTransfer(exp);
    this.kill++;
  },
  // 玩家战斗胜利，传入参数为对方的经验值

  dead() {
    this.status = -1; // 状态记为死亡
    this.death++; // 记录死亡次数
    this.location = NaN;
    _.pull(Sandbox.map[this.location], this.id);
  },
  // 玩家死亡，经验值变为-1，从地图上消失。

  battleLog: [],

  //玩家的战斗记录

  move(path) {
    this.setLocation = fixLocation(this.location + path);
    console.log(Sandbox.map);
  },
};

/* 一些公用函数 */

function expToLevel(exp) {
  let level = 0;
  let index = 1;
  while (index <= exp) {
    level++;
    exp -= index;
    index++;
  }
  return [level, exp];
}
// 输入经验值，计算出当前等级和溢出的经验数量组成的数组

function expTransfer(exp) {
  if (exp < 3) {
    return 1;
  } else {
    return _.floor(exp / 3);
  }
}
// 死亡时经验值结算，获得对方经验的1/3，最低获得1点

function battle(params) {
  switch (params.length) {
    case 0:
      console.log("No one in the arena!!!");
      break;

    case 1:
      console.log(params[0].id + " battled himself");
      break;

    default:
      params.sort(function () {
        return 0.5 - Math.random();
      });
      while (params.length > 1) {
        params.splice(fight(params[0], params[1]), 1);
      }
      // 这里放打架时候的代码
      break;
  }
}

function fight(a, b) {
  // 仅传入战斗双方的ID
  let ra = _.find(Sandbox.playerList, { id: a });
  let rb = _.find(Sandbox.playerList, { id: b });
  if (_.random(ra.status + rb.status + 1) < ra.status + 1) {
    ra.win(rb.status);

    rb.dead();

    return 1;
  } else {
    rb.win(ra.status);

    ra.dead();

    return 0;
  }
}

function reval(target) {
  if (target.status > -1) {
    throw "Living cannot reval";
  } else {
    target.status = 0;
    target.location = _.random(sandboxMapSize - 1);
  }
}

function fixLocation(a) {
  if (a < 0) {
    a = sandboxMapSize + a;
    a = fixLocation(a);
    return a;
  } else if (a > sandboxMapSize - 1) {
    a = a - sandboxMapSize;
    a = fixLocation(a);
    return a;
  } else {
    return a;
  }
}
// 这个函数将坐标限制在MapSize范围内，使得这个坐标系实际上是一个一维封闭坐标系，可以考虑每次坐标处理都套一层这个函数

function initModel() {
  Sandbox.initMap();
  Sandbox.initPlayer;
}
