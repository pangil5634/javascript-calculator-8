import { Console } from "@woowacourse/mission-utils"; 

class App {
  async run() {
    // 문자열 입력
    const INPUT = await Console.readLineAsync('덧셈할 문자열을 입력해 주세요.\n');

    let arr = []; // 계산을 위한 배열 선언
    // 커스텀 구분자 존재 여부 확인에 따른 분기
    if (INPUT.slice(0, 2) === "//") {
      // 분기1 : 커스텀 구분자 존재 O

      // \n으로 커스텀 구분자 포함 문자열과 파싱 문자열을 구분
      let splitArr = INPUT.split("\\n"); 
      let custom = splitArr[0].slice(-1 * (splitArr[0].length - 2));  // 커스텀 구분자 추출
      let parsing = splitArr[1];                                      // 파싱 문자열 추출

      // 커스텀 구분자로 파싱 문자열을 분리
      arr = parsing.split(custom);
    }
  }
}

export default App;
