const ERROR_MESSAGES = {
    INVALID_SYNTAX: '[ERROR] Invalid syntax: separator cannot be consecutive or at the end',
    INVALID_NUMBER: '[ERROR] Must input numbers only',
    NEGATIVE_NUMBER: '[ERROR] Must input positive numbers',
};

export class StringCalculator {
    /** 문자열을 더하는 주요 메서드 */
    add(input) {
        // 0. 에러 처리 (빈 문자열 입력한 경우)
        if (input === '') 
            return 0;

        // 1. 파싱 문자열 분리
        let numbers = this.parse(input);

        // 2. 에러 처리 및 정수형 변환
        numbers = this.validate(numbers);

        // 3. 합계 계산
        return this.sum(numbers);

    }

    /** 문자열을 숫자 배열로 변환 */
    parse(input) {

        // 0. 배열 선언
        let numbers = []; // 파싱 문자열을 분리한 내용을 담을 배열
        const CUSTOMMATCH = input.match(/^\/\/(.+?)\\n([\d\D]+)$/); // 커스텀 구분자 정규식
        const DELIMITERS = [',', ':']; // 구분자 배열

        // 1. 파싱 문자열을 배열로 변환하기
        if (CUSTOMMATCH) {
            // 1) 커스텀 구분자인 경우
            const CUSTOM = CUSTOMMATCH[1]; // 커스텀 구분자
            const PARSING = CUSTOMMATCH[2]; // 파싱 문자열

            // 특수문자 이스케이프 처리
            const ESCAPEDCUSTOM = CUSTOM.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            DELIMITERS.push(ESCAPEDCUSTOM);

            // 파싱 문자열에 커스텀 구분자가 존재하는지 검사
            if (!PARSING.includes(CUSTOM)) {
                // 커스텀 구분자가 없는 경우, 기본 구분자로 파싱 문자열 분리
                numbers = PARSING.split(/,|:/);
            } else {
                // 커스텀 구분자가 있는 경우, 커스텀 구분자로 파싱 문자열 분리
                const pattern = DELIMITERS.join('|');
                numbers = PARSING.split(new RegExp(pattern));
            }
        } else {
            // 2) 기본 구분자인 경우 

            // 커스텀 구분자 포맷이나, 입력하지 않는 경우에 대한 검사
            if (input.startsWith("//\\n"))
                input = input.replace(/^\/\/\\n/, '');

            // 기본 구분자로 파싱 문자열 분리
            numbers = input.split(/,|:/);
        }

        // 3. 파싱 문자열 분리한 배열 반환
        return numbers;
    }

     /** 숫자 배열 검증 */
    validate(numbers) {
        // 1. 구분자로 끝나거나, 구분자 사이에 숫자가 없는 경우에 대한 검사
        if (numbers.some((n) => n.trim() === '')) {
            throw new Error(ERROR_MESSAGES.INVALID_NUMBER);
        }

        // 2. 문자열에서 정수형으로 변환 및 유효성 검사
        numbers = numbers.map((n) => {
            const NUM = Number(n.trim()); // 숫자 변환 및 공백 제거
            if (isNaN(NUM)) {
                throw new Error(ERROR_MESSAGES.INVALID_SYNTAX);
            }

            return NUM;
        });

        // 3.음수 검사
        const NEGATIVES = numbers.filter((n) => n < 0);
        if (NEGATIVES.length > 0) {
            throw new Error(ERROR_MESSAGES.NEGATIVE_NUMBER)
        }

        return numbers;

    }

    /** 합산 계산 */
    sum(numbers) {
        // 1. 합계 계산
        const RESULT = numbers.reduce((sum, n) => sum + n, 0);

        return RESULT;
    }
}