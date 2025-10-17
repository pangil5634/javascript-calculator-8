import { Console } from "@woowacourse/mission-utils"; 

class App {
  async run() {
    // 문자열 입력
    const INPUT = await Console.readLineAsync('덧셈할 문자열을 입력해 주세요.\n');

    let arr = []; // 계산을 위한 배열 선언
    let result = 0; // 결과를 위한 변수 선언

    // 커스텀 구분자 존재 여부 확인에 따른 분기
    if (INPUT.slice(0, 2) === "//") {
      // 분기1 : 커스텀 구분자 존재 O

      // \n으로 커스텀 구분자 포함 문자열과 파싱 문자열을 구분
      let splitArr = INPUT.split("\\n"); 
      let custom = splitArr[0].slice(-1 * (splitArr[0].length - 2));  // 커스텀 구분자 추출
      let parsing = splitArr[1];                                      // 파싱 문자열 추출

      // 커스텀 구분자로 파싱 문자열을 분리
      arr = parsing.split(custom);
    }else {
      // 분기2 : 커스텀 구분자 존재 X

      let temp = []; // 파싱 문자열 분리 위한 임시 변수
      
      // 콤마(,)로 파싱 문자열을 분리
      INPUT.split(",").map(e => temp.push(e));
      // 콜론(:)으로 파싱 문자열을 분리
      temp.map(e => e.split(":").map(e => arr.push(e)));
    }

    // 문자열에서 정수형으로 변환 및 합계 계산
    arr.map(e => result += Number(e));

    // 결과 출력
    Console.print("결과 : " + result);
  }
}

export default App;
