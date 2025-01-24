const Util = (function () {
    // 싱글톤 인스턴스
    let instance;

    // 인스턴스 생성 함수
    function createInstance() {
        return {
            // 유효성 검사 함수
            // 숫자만 입력 가능 여부 확인
            isNumeric(number) {
                return /^[0-9]+$/.test(number);
            },
            // 문자만 입력 가능 여부 확인
            isAlphabetic(input) {
                return /^[a-zA-Z]+$/.test(input);
            },

            // 입력값에서 숫자 외의 문자 제거
            formatNumeric(number) {
                return number.replace(/[^0-9]/g, '');
            },

            // 입력값에서 문자 외의 내용 제거
            formatAlphabetic(input) {
                return input.replace(/[^a-zA-Z]/g, '');
            },

            parseDrinkFormat(value) {
                if (!value) return "선택안함";  // 기본값 설정

                const parts = value.split('-');  // 'ab-c-de'를 '-'로 분리
                if (parts.length !== 3) return "선택안함";  // 형식이 맞지 않는 경우 기본값 반환

                // 정수 변환을 사용해 앞자리 '0' 제거
                const ab = parseInt(parts[0], 10);  // 'ab' 정수로 변환하여 앞자리 '0' 제거
                const c = parseInt(parts[1], 10);  // 'c' 정수로 변환
                const de = parseInt(parts[2], 10);  // 'de' 정수로 변환하여 앞자리 '0' 제거

                // 'c'의 값에 따라 '일', '개월', '년', '주' 단위 결정
                let unit;
                switch (c) {
                    case 0:
                    unit = "일";
                    break;
                    case 1:
                    unit = "개월";
                    break;
                    case 2:
                    unit = "년";
                    break;
                    case 3:
                    unit = "주";  // 주 단위 추가
                    break;
                    default:
                    unit = "일";  // 기본값 설정
                }

                return `${ab}${unit}에 ${de}번`;
            },

            parseSmokeStatus(value) {
                switch (value) {
                    case 0:
                    return "비흡연자";
                    case 1:
                    return "흡연자(연초)";
                    case 2:
                    return "흡연자(전자담배)";
                    default:
                    return "비흡연자";  // 기본값 설정
                }
            },

            parseSleepHabit(value) {
                switch (value) {
                    case 0:
                    return "없음";
                    case 1:
                    return "잠꼬대";
                    case 2:
                    return "코골이";
                    default:
                    return "이갈이";  // 기본값 설정
                }
            },

            parseCollege(value) {
                switch (value) {
                    case 0:
                    return "비공개";
                    case 1:
                    return "예술대학";
                    case 2:
                    return "체육대학";
                    case 3:
                    return "예술공학대학";
                    case 4:
                    return "생명공학대학";
                    case 5:
                    return "공과대학";
                    default:
                    return "미선택"; 
                }
            },
        };
    }

    return {
        // 싱글톤 인스턴스를 반환
        getInstance() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        },
    };
})();

// 사용 예시
// Vue 컴포넌트에서 가져오기:
// const util = Util.getInstance();
// 유효성 검사 호출: util.isNumeric("123"), util.formatPhoneNumber("1234567890")

// 혹은 Util.getInstance().isNumeric("123") 로 바로 사용 가능
