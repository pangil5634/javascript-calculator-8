import App from "../src/App.js";
import {MissionUtils} from "@woowacourse/mission-utils";

const mockQuestions = (inputs) => {
    MissionUtils.Console.readLineAsync = jest.fn();

    MissionUtils
        .Console
        .readLineAsync
        .mockImplementation(() => {
            const input = inputs.shift();
            return Promise.resolve(input);
        });
};

const getLogSpy = () => {
    const logSpy = jest.spyOn(MissionUtils.Console, "print");
    logSpy.mockClear();
    return logSpy;
};

describe("문자열 계산기", () => {
    describe("문자열 계산기 - 기분 구분자 테스트 케이스", () => {

        const testCasesByDefaultSeperator = [
            {
                name: "기본 구분자 사용1",
                inputs: ["1,2,3"],
                expected: ["결과 : 6"]
            }, {
                name: "기본 구분자 사용2",
                inputs: ["2,4:5"],
                expected: ["결과 : 11"]
            }, {
                name: "기본 구분자 사용3",
                inputs: ["3:4:5"],
                expected: ["결과 : 12"]
            }
        ];

        testCasesByDefaultSeperator.forEach(({name, inputs, expected}) => {
            test(name, async () => {
                // 입력값 모킹
                mockQuestions(inputs);
                const logSpy = getLogSpy();

                // 실행
                const app = new App();
                await app.run();

                // 결과 검증
                expected.forEach((output) => {
                    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
                });
            });
        });
    });

    describe("문자열 계산기 - 커스텀 구분자 테스트 케이스", () => {
        const testCasesByCustomSeperator = [
            {
                name: "커스텀 구분자 사용1",
                inputs: ["//xo\\n2xo4xo8"],
                expected: ["결과 : 14"]
            }, {
                name: "커스텀 구분자 사용2",
                inputs: ["//?*\\n2?*9?*8"],
                expected: ["결과 : 19"]
            }, {
                name: "커스텀 구분자 사용3",
                inputs: ["//!\\n1!2!3!4"],
                expected: ["결과 : 10"]
            }, {
                name: "커스텀 구분자 사용4",
                inputs: ["//\\n1,2,3:4"],
                expected: ["결과 : 10"]
            }
        ];

        testCasesByCustomSeperator.forEach(({name, inputs, expected}) => {
            test(name, async () => {
                // 입력값 모킹
                mockQuestions(inputs);
                const logSpy = getLogSpy();

                // 실행
                const app = new App();
                await app.run();

                // 결과 검증
                expected.forEach((output) => {
                    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
                });
            });
        });
    });

    describe("문자열 계산기 - 예외 테스트", () => {
        const errorCases = [
            {
                name: "예외 테스트1 - 음수",
                inputs: ["-1,2,3"]
            }, {
                name: "예외 테스트2 - 구분자로 끝남",
                inputs: ["//!\\n1!2!3!"]
            }, {
                name: "예외 테스트3 - 구분자 연속 사용",
                inputs: ["//!\\n1!!2!3"]
            }, {
                name: "예외 테스트4 - 기본 및 커스텀 구분자 밖의 구분자 사용1",
                inputs: ["//!\\n1?2?3!4"]
            }, {
                name: "예외 테스트5 - 기본 및 커스텀 구분자 밖의 구분자 사용2",
                inputs: ["//!\\n1!2xo3"]
            }
        ];

        errorCases.forEach(({name, inputs}) => {
            test(name, async () => {
                mockQuestions(inputs);

                const app = new App();

                await expect(app.run())
                    .rejects
                    .toThrow("[ERROR]");
            });
        });
    });

});
