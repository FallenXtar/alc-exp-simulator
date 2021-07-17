import _ from "lodash";
import { SandboxInstance } from "./sandbox";
import { Player } from "./player";
/* 一些公用函数 */

export function expToLevel(exp: number) {
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

export function expTransfer(exp: number) {
  if (exp < 3) {
    return 1;
  } else {
    return _.floor(exp / 3);
  }
}
// 死亡时经验值结算，获得对方经验的1/3，最低获得1点

export function battle(params: number[]) {
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

export function fight(a: number, b: number) {
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

export function reval(target: Player) {
  if (target.status > -1) {
    throw "Living cannot reval";
  } else {
    target.status = 0;
    target.location = _.random(SandboxInstance.sandboxMapSize - 1);
  }
}

export function fixLocation(a: number) {
  if (a < 0) {
    a = SandboxInstance.sandboxMapSize + a;
    a = fixLocation(a);
    return a;
  } else if (a > SandboxInstance.sandboxMapSize - 1) {
    a = a - SandboxInstance.sandboxMapSize;
    a = fixLocation(a);
    return a;
  } else {
    return a;
  }
}
// 这个函数将坐标限制在MapSize范围内，使得这个坐标系实际上是一个一维封闭坐标系，可以考虑每次坐标处理都套一层这个函数
