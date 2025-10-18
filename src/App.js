import { Console } from '@woowacourse/mission-utils'; 
import {StringCalculator} from './utils/StringCalculator.js';

class App {
  async run() {

    // 0. 클래스 선언
    const CALCULATOR = new StringCalculator();

    // 1. 입력 받기
    const INPUT = await Console.readLineAsync('덧셈할 문자열을 입력해 주세요.\n'); 

    // 2. 함수 실행
    const RESULT = CALCULATOR.add(INPUT);

    // 3. 결과 출력
    Console.print(`결과 : ${RESULT}`); 
  }
}

export default App;
