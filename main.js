/* 模型基本参数设置 */

//玩家数量
var playerAmount = 100;

// 随机战斗设定运行次数
var runTimes = 1000;

/* 初始化环境 */
var playerList = [];
var timesRun = 0;
var modelRun = 0;

function genPlayer(amount) {
  playerList = [];
  for (let index = 0; index < amount; index++) {
    playerList.push(0);
  }
  console.log(playerList);
  return null;
}

function selectBattle() {
  b1 = _.random(playerList.length - 1);
  b2 = _.random(playerList.length - 1);
  while (b1 == b2) {
    b2 = _.random(playerList.length - 1);
  }

  battle(b1, b2);
}

function battle(a, b) {
  console.log(a + " and " + b + " came to fight!!!");
  w1 = playerList[a] + 1;
  w2 = playerList[b] + 1;
  if (_.random(w1 + w2 - 1) < w1) {
    playerList[a] = playerList[a] + calcExp(playerList[b]);
    playerList[b] = 0;
    console.log("And " + a + " Win!!!");
  } else {
    playerList[b] = playerList[b] + calcExp(playerList[a]);
    playerList[a] = 0;
    console.log("And " + b + " Win!!!");
  }
  timesRun++;
}

function calcExp(amount) {
  if (amount > 3) {
    return _.floor(amount / 3);
  } else {
    return 1;
  }
}

// 运行模型的函数
function runModel(amount) {
  for (let index = 0; index < amount; index++) {
    genPlayer(playerAmount);
    for (let index = 0; index < runTimes; index++) {
      selectBattle();
    }
    modelRun++;

    // console.log("Times set to run: " + runTimes);
    // console.log("Times actually run: " + timesRun);
    // console.log("Highest Exp is: " + _.max(playerList));
    // console.log("Total Exp is: " + _.sum(playerList));

    document.write("Model now on " + modelRun + "<br/>");
    document.write("Times set to run: " + runTimes + "<br/>");
    document.write("Times actually run: " + timesRun + "<br/>");
    document.write("Highest Exp is: " + _.max(playerList) + "<br/>");
    document.write("Total Exp is: " + _.sum(playerList) + "<br/>");
    document.write("<br/>");
  }
}

/* 展示结果 */
runModel(5);
