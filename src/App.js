import { Console } from "@woowacourse/mission-utils"; 

class App {
  async run() {
    // 문자열 입력
    const INPUT = await Console.readLineAsync('덧셈할 문자열을 입력해 주세요.\n');

    // 에러 처리 (빈 문자열 입력한 경우)
    if (INPUT === "") {
      Console.print("결과 : 0");
      return; 
    }

    let numbers = []; // 계산을 위한 배열 선언
    let result = 0; // 결과를 위한 변수 선언

    // 커스텀 구분자 존재 여부 확인에 따른 분기
    const customMatch = INPUT.match(/^\/\/(.+?)\\n([\d\D]+)$/);

    // 구분자 배열
    const delimiters = [",", ":"];

    // 구분자로 파싱 문자열 분리
    if (customMatch) {
      // 1) 커스텀 구분자인 경우

      const custom = customMatch[1]; // 커스텀 구분자
      const parsing = customMatch[2]; // 파싱 문자열

      delimiters.push(custom);

      // 파싱 문자열에 커스텀 구분자가 존재하는지 검사
      if (!parsing.includes(custom)) {
        // 커스텀 구분자가 없는 경우, 기본 구분자로 파싱 문자열 분리
        numbers = parsing.split(/,|:/);
      } else {
        // 커스텀 구분자가 있는 경우, 커스텀 구분자로 파싱 문자열 분리
        const pattern = delimiters.join('|'); 
        numbers = parsing.split(new RegExp(pattern));
      }
    } else {
      // 2) 기본 구분자인 경우

      // 기본 구분자로 파싱 문자열 분리
      numbers = INPUT.split(/,|:/);
    }

    // 구분자로 끝나거나, 구분자 사이에 숫자가 없는 경우에 대한 검사
    if (numbers.some(n => n.trim() === "")) {
      throw new Error("[ERROR] Invalid syntax: separator cannot be consecutive or at the end");
    }

    // 문자열에서 정수형으로 변환 및 유효성 검사
    numbers = numbers.map((n) => {
      const num = Number(n.trim()); // 숫자 변환 및 공백 제거
      if (isNaN(num)) {
        throw new Error("[ERROR] Must input the number and seperator");
      }

      return num;
    });

    // 음수 검사
    if (numbers.filter(n => n < 0).length > 0) {
      throw new Error("[ERROR] Must input the positve number")
    }

    // 합계 계산
    result = numbers.reduce((sum, n) => sum + Number(n), 0);

    // 결과 출력
    Console.print("결과 : " + result);
  }
}

export default App;
