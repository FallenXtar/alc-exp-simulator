import { SandboxInstance } from "./sandbox";
import _ from "lodash";
import { fixLocation, expToLevel, expTransfer } from "./core";

export class Player {
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
