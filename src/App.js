const MissionUtils = require("@woowacourse/mission-utils");
class App {
  print(message) {
    MissionUtils.Console.print(message);
  }
  pickComputerNum() {
    let computerNum = [];
    let num = MissionUtils.Random.pickNumberInRange(1, 9);
    computerNum.push(num);
    for (let digit = 1; digit < 3; digit++) {
      num = MissionUtils.Random.pickNumberInRange(1, 9);
      while (computerNum.includes(num) === 0) {
        num = MissionUtils.Random.pickNumberInRange(1, 9);
      }
      computerNum.push(num);
    }
    return computerNum.join("");
  }
  getUserNum() {
    let userNum;
    MissionUtils.Console.readLine("숫자를 입력해주세요 :", (answer) => {
      this.judgeUserNum(answer);
      userNum = answer;
      this.print(`숫자를 입력해주세요 : ${answer}`);
    });
    return userNum;
  }
  judgeUserNum(answer) {
    if (parseInt(answer) === NaN) {
      throw new Error("숫자를 입력해주세요");
    }
    if (answer.length !== 3) {
      throw new Error("입력한 숫자가 3 자리가 아닙니다");
    }
    let answerArr = answer.split("");
    let duplicates = answerArr.filter((value, index) => {
      return index !== answerArr.indexOf(value);
    });
    if (duplicates.length !== 0) {
      throw new Error("입력한 숫자에 중복된 숫자가 존재합니다");
    }
  }
  getResult(computer, user) {
    const { strike, ball } = this.compareNums(computer, user);
    const resultSring = this.printResult(strike, ball);
    return this.getResultFlag(resultSring);
  }
  getResultFlag(resultSring) {
    let resultFlag = 0;
    if (resultSring === "3스트라이크") {
      this.print("3개의 숫자를 모두 맞히셨습니다! 게임 종료");
      this.print("게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.");
      MissionUtils.Console.readLine(
        "게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.",
        (answer) => {
          this.judgeRestartNum(answer);
          this.print(`${answer}`);
          resultFlag = parseInt(answer);
        }
      );
    }
    return resultFlag;
  }
  judgeRestartNum(answer) {
    if (!(answer === "1" || answer === "2")) {
      throw new Error("1 과 2 중 하나를 입력해주세요");
    }
  }
  compareNums(computer, user) {
    let strike = 0;
    let ball = 0;
    for (let i = 0; i < user.length; i++) {
      if (user[i] === computer[i]) {
        strike++;
      } else if (computer.includes(user[i])) {
        ball++;
      }
    }
    return { strike, ball };
  }
  printResult(strike, ball) {
    let resultSring = "";
    if (ball !== 0) {
      resultSring += `${ball}볼 `;
    }
    if (strike !== 0) {
      resultSring += `${strike}스트라이크`;
    }
    if (ball === 0 && strike === 0) {
      resultSring = "낫싱";
    }
    this.print(resultSring);
    return resultSring;
  }
  play() {
    this.print("숫자 야구 게임을 시작합니다.");
    let gameFlag = 1; // 0: continue 1: restart, 2: end
    let computerNum;
    let userNum;
    while (gameFlag === 1) {
      computerNum = this.pickComputerNum();
      gameFlag = 0;
      while (gameFlag === 0) {
        userNum = this.getUserNum();
        gameFlag = this.getResult(computerNum, userNum);
      }
    }
  }
}

module.exports = App;
