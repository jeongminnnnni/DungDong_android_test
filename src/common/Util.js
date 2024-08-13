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

            // 포맷 함수
            // 전화번호 포맷팅 (예: 01012345678 -> 010-1234-5678 형식으로 변환)
            formatPhoneNumber(number) {
                return number.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
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
