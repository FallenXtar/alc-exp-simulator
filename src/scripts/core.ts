import _ from "lodash";

const sandboxCapicity = 10;
// 定义最大玩家数量；

const sandboxMapSize = 10;
// 定义一维地图大小，地图会向原点右边扩展这个大小；

const modelPause = false;

class Player {
  /* 玩家原型对象 */

  id;
  status;
  highestExp;
  kill;
  death;
  location;
  battleLog: (number | boolean)[][] = [];

  constructor() {
    this.id = NaN;
    this.status = 0;
    this.highestExp = 0;
    this.kill = 0;
    this.death = 0;
    this.location = NaN;
    this.battleLog = [];
  }
  set log(content: (number | boolean)[]) {
    if (this.battleLog.length < 20) {
      this.battleLog.push(content);
    } else {
      this.battleLog = _.tail(this.battleLog);
      this.battleLog.push(content);
    }
  }

  set gotoLocation(target: number) {
    _.pull(SandboxInstance.map[this.location], this.id);
    this.location = target;
    SandboxInstance.map[target].push(this.id);
  }

  get kd(): string {
    return this.kill + "/" + this.death;
  }
  // 实用属性，返回玩家的击杀/死亡比

  get timesBattled(): number {
    return this.kill + this.death;
  }
  // 实用属性，返回玩家的总战斗场次

  get level(): number[] {
    return expToLevel(this.status);
  }
  // 实用属性，返回玩家的当前等级，和多余的经验数量，以数组呈现

  get highestLevel(): number[] {
    return expToLevel(this.highestExp);
  }

  win(exp: number): void {
    this.status = this.status + expTransfer(exp);
    this.kill++;
    if (this.highestExp < this.status) {
      this.highestExp = this.status;
    }
  }
  // 玩家战斗胜利，传入参数为对方的经验值

  dead(): void {
    this.status = -1; // 状态记为死亡
    this.death++; // 记录死亡次数
    this.location = NaN;
    _.pull(SandboxInstance.map[this.location], this.id);
  }
  // 玩家死亡，经验值变为-1，从地图上消失。

  move(path: number): number {
    this.gotoLocation = fixLocation(this.location + path);
    return this.location;
  }
}

interface Sandbox {
  playerList: Player[];
  map: number[][];
  internalTurn: number;
  expRecord: number;
  timesRun: number;
  deadPlayerList: number[];
  totalExp: number;
  getLeaderBoard(number: number): number[];
  updateHighest(): number;
  initMap(): void;
  initPlayer(): void;
  initModel(): void;
  run(turns: number): void;
}

/* 生成沙盒对象 */
const SandboxInstance: Sandbox = {
  playerList: [],
  // 玩家列表

  map: [],
  // 地图

  internalTurn: 0,
  // 本次运行到的回合数

  timesRun: 0,
  // 沙盒运行过的次数

  expRecord: 0,

  get deadPlayerList() {
    const a: number[] = [];
    this.playerList.forEach((element: Player) => {
      if (element.status < 0) {
        a.push(element.id);
      }
    });
    return a;
  },

  get totalExp() {
    let exp = 0;
    this.playerList.forEach((element) => {
      if (element.status > 0) {
        exp = exp + element.status;
      }
    });
    return exp;
  },

  getLeaderBoard(number: number) {
    let array = this.playerList;
    array = _.orderBy(array, ["status"], ["desc"]);
    return _.slice(_.map(array, "id"), number);
  },

  updateHighest() {
    const h = _.orderBy(this.playerList, "highestExp", "desc");
    if (h[0].highestExp > this.expRecord) {
      this.expRecord = h[0].highestExp;
      return h[0].highestExp;
    }
    return this.expRecord;
  },

  initMap() {
    this.map = [];
    for (let index = 0; index < sandboxMapSize; index++) {
      this.map.push([]);
    }
  },

  initPlayer() {
    this.playerList = [];
    for (let index = 0; index < sandboxCapicity; index++) {
      const i = new Player();
      i.id = index;
      i.gotoLocation = _.random(sandboxMapSize - 1);
      i.battleLog = [];
      // i.status = _.random(-100, 100);
      this.playerList.push(i);
    }
  },
  // 定义玩家初始化函数，生成指定数量的玩家，并填入玩家列表

  initModel() {
    SandboxInstance.initMap();
    SandboxInstance.initPlayer();
    SandboxInstance.internalTurn = 0;
    SandboxInstance.expRecord = 0;
  },

  run(turns) {
    while (turns > 0) {
      if (modelPause) {
        break;
      }
      revalStage();
      moveStage();
      battleStage();
      this.updateHighest();

      this.internalTurn++;
      turns--;
    }
  },
};

/* 一些公用函数 */

function expToLevel(exp: number) {
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

function expTransfer(exp: number) {
  if (exp < 3) {
    return 1;
  } else {
    return _.floor(exp / 3);
  }
}
// 死亡时经验值结算，获得对方经验的1/3，最低获得1点

function battle(params: number[]) {
  switch (params.length) {
    case 0:
      // console.log("No one in the arena!!!");
      break;

    case 1:
      // console.log(params[0].id + " battled himself");
      break;

    default:
      while (params.length > 1) {
        const a = _.sampleSize(params, 2);
        params.splice(fight(a[0], a[1]), 1);
      }
      // 这里放打架时候的代码
      break;
  }
}

function fight(a: number, b: number) {
  // 仅传入战斗双方的ID
  const ra = SandboxInstance.playerList[a];
  const rb = SandboxInstance.playerList[b];
  if (_.random(ra.status + rb.status + 1) < ra.status + 1) {
    ra.log = [SandboxInstance.timesRun, ra.location, b, rb.status, true];
    rb.log = [SandboxInstance.timesRun, rb.location, a, rb.status, false];

    ra.win(rb.status);

    rb.dead();

    return 1;
  } else {
    rb.log = [SandboxInstance.timesRun, rb.location, a, rb.status, true];
    ra.log = [SandboxInstance.timesRun, ra.location, b, rb.status, false];

    rb.win(ra.status);

    ra.dead();

    return 0;
  }
}

function reval(target: Player) {
  if (target.status > -1) {
    throw "Living cannot reval";
  } else {
    target.status = 0;
    target.location = _.random(sandboxMapSize - 1);
  }
}

function fixLocation(a: number) {
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

function revalStage() {
  SandboxInstance.playerList.forEach((element) => {
    if (element.status < 0) {
      reval(element);
    }
  });
}

function moveStage() {
  SandboxInstance.playerList.forEach((element) => {
    element.move(_.random(-1, 1));
  });
}

function battleStage() {
  SandboxInstance.map.forEach((element) => {
    battle(element);
  });
}

export default { sandboxCapicity, sandboxMapSize, SandboxInstance, Player };
