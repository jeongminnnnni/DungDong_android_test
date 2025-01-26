<template>
  <BoxContainer>
    <SubTitle 
      :title="title" :desc="desc"
    ></SubTitle>
    <v-row 
      v-if="loading" 
      no-gutters justify="center" align-content="center" 
      style="min-height: 300px; min-width: 300px;"
    >
      <v-progress-circular
        indeterminate
        color="#FF5858"
        size="64"
        class="progress-circular"
      ></v-progress-circular>
      <v-col cols="12" class="mt-14" >
          <v-img aspect-ratio="1/3" :src="`/ad/ad_1.jpeg`"></v-img>
      </v-col>  
    </v-row>
    <v-row no-gutters justify="center" width="300px" style="min-height: 300px; min-width: 300px; align-items: center; border: 1px; border-color: #D9D9D9;">
      <div ref="captureRef"  class="hidden-capture-area">
        <ImageFrame :survey="survey"></ImageFrame>
      </div>
      <v-img
        :src="capturedImage"
        aspect-ratio="1/1"
        cover
      ></v-img>
    </v-row>

    <v-row no-gutters justify="center" class="margin-48 | mt-10 | pl-14 | pr-14">
      <v-btn 
        @click="copyImageToClipboard"
        color="#FF6161" rounded="xl" width="100%" 
        class="text-btn"
      >
        이미지 저장하기
      </v-btn>
    </v-row>

    <v-row no-gutters justify="center" class="margin-48 | mt-4 | pl-14 | pr-14">
      <v-btn 
        @click="handleClickRestartBtn"
        color="#FFFFFF" rounded="xl" width="100%" 
        class="w-text-btn"
      >
        처음부터 다시하기
      </v-btn>
    </v-row>

    <v-row no-gutters justify="center" class="margin-48 | mt-4 | pl-14 | pr-14">
      <v-btn 
        @click="submitSurvey"
        color="#FFFFFF" rounded="xl" width="100%" 
        class="w-text-btn"
      >
        룸메찾기 알리기
      </v-btn>
    </v-row>
    <v-row no-gutters>      
        <v-col
          cols="12"
          no-gutters justify="start" 
          class="text-subtitle | mb-1 | margin-top-96"
        >
          둥지동지를 제작한
        </v-col>
        <v-col
          cols="12"
          no-gutters justify="start" 
          class="text-title | mb-6"
        >
         <칸타르동방구함위원회> 를 소개합니다
        </v-col>
        <v-col
          cols="12"
          no-gutters justify="start" 
          class="text-subtitle | mb-12"
          v-html="ourInfo"
        >
        </v-col>
        <v-col cols="12" class="mb-10" >
          <v-img aspect-ratio="1/3" :src="`/ad/ad_1.jpeg`"></v-img>
        </v-col>
    </v-row>
  </BoxContainer>

  <v-snackbar
    v-model="showToast"
    :timeout="3000"
    color="white"
    rounded="pill"
    class="mb-12"
    @update:model-value="handleSnackbarClose"
  >
    <v-icon color="info" icon="mdi-information" class="mr-2"></v-icon>
    {{ toastMessage }}
  </v-snackbar>

</template>

<script setup>
// ----- 선언부 ----- //
import { onMounted, onUnmounted, onBeforeMount, ref, nextTick} from "vue";
import { useRouter, useRoute } from "vue-router";
import { routes } from "@/router"
import { db } from "@/common/Firebase"; // Firestore 초기화 파일
import { collection, addDoc } from "firebase/firestore"; // Firestore 함수

import axios from "axios";
import html2canvas from "html2canvas";

import BoxContainer from "@/components/BoxContainer.vue";
import ImageFrame from "@/components/ImageFrame.vue";

const emit = defineEmits(['restart-survey', 'continue-survey']);

const title = '짜잔! 결과 이미지가 나왔어요.'
const desc = '이미지를 저장하고 공유하여<br>마음에 맞는 룸메이트를 구해보세요.'

const ourInfo = '안녕하세요, 둥지동지를 제작한 예술공학부 동아리 칸타르 소속의 <b><칸타르동방구함위원회></b> 입니다.<br><br>둥지동지는 룸메이트를 빠르고 편하게 구할 수 있게 하기 위해 기획한 프로젝트입니다.<br><br>제작에 도움을 주신 예공 친구들에게 감사드리며, 모두 좋은 룸메이트를 찾으시길 바랍니다.<br>새해 복 많이 받으세요!'


const loading = ref(false); // 로딩 상태 관리
const captureRef = ref(null); // 캡처할 컴포넌트의 참조
const capturedImage = ref(''); // 캡처된 이미지의 URL 저장

const toastMessage = ref("");
const showToast = ref(false); 

const survey = ref({
  title:  null,
  dorm:  null,
  birth: null,
  studentId: null,
  college: "",
  collegeId: 0,
  mbti: "",
  smoke: null,
  drink: "",
  sdEtc: "",
  wakeUp: "",
  lightOff: "",
  bedTime: "",
  sleepHabit: 0,
  clean: 0,
  bug: 0,
  eatIn: 0,
  noise: 0,
  share: 0,
  home: 0,
  tags: [],
  notes: "",
  selectTag: []
});

const parsedSurvey = ref(null)

// ----- 라이프 사이클 ----- //
onBeforeMount(() => {
});


onMounted(async () => {
  loadSurveyData();
  await nextTick(); // DOM이 렌더링 완료된 후 실행
  startCaptureProcess();
});

onUnmounted(() => {

})

// ----- 함수 정의 ----- //

function loadSurveyData() {
  const existingSurvey = localStorage.getItem('userSurvey');
  console.log('get existingSurvey', existingSurvey);

  if (existingSurvey) {
    parsedSurvey.value = JSON.parse(existingSurvey);
    
    // 데이터 매핑 및 할당
    survey.value.title = parsedSurvey.value.title || "깔끔한 올빼미형 룸메";
    survey.value.dorm = parsedSurvey.value.dorm || "선택안함";
    survey.value.birth = parsedSurvey.value.birth
      ? parsedSurvey.value.birth === 0
        ? "비공개"
        : String(parsedSurvey.value.birth).slice(-2)
      : "비공개";
    survey.value.studentId = parsedSurvey.value.studentId
      ? parsedSurvey.value.studentId === 0
        ? "비공개"
        : String(parsedSurvey.value.studentId).slice(-2)
      : "비공개";
    survey.value.college = parseCollege(parsedSurvey.value.college || 0);
    survey.value.collegeId = parsedSurvey.value.college || 0;
    survey.value.mbti = parsedSurvey.value.mbti || "선택안함";
    survey.value.smoke = parseSmokeStatus(parsedSurvey.value.smoke || 0);
    survey.value.drink = parseDrinkFormat(parsedSurvey.value.drink);
    survey.value.sdEtc = parsedSurvey.value.sdEtc || "선택안함";
    survey.value.wakeUp = parsedSurvey.value.wakeUp || "00:00";
    survey.value.lightOff = parsedSurvey.value.lightOff || "00:00";
    survey.value.bedTime = parsedSurvey.value.bedTime || "00:00";
    survey.value.sleepHabit = parseSleepHabit(parsedSurvey.value.sleepHabit || 0);
    survey.value.clean = parsedSurvey.value.clean || 0;
    survey.value.bug = parsedSurvey.value.bug || 0;
    survey.value.eatIn = parsedSurvey.value.eatIn || 0;
    survey.value.noise = parsedSurvey.value.noise || 0;
    survey.value.share = parsedSurvey.value.share || 0;
    survey.value.home = parsedSurvey.value.home || 0;
    survey.value.notes = parsedSurvey.value.notes || "";
    survey.value.selectTag = parsedSurvey.value.selectTag || [];

    console.log('set and parse survey object', survey.value);
  }
}

function parseDrinkFormat(drink) {
  if (!drink) return "선택안함";  // 기본값 설정

  const parts = drink.split('-');  // 'ab-c-de'를 '-'로 분리
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
}

function parseSmokeStatus(value) {
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
}

function parseSleepHabit(value) {
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
}

function parseCollege(value) {
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
}


// 다시 시작
function handleClickRestartBtn() {
  localStorage.setItem('appInitialized', 'false');
  console.log("emitting restart-survey event.");
  emit('restart-survey'); 
}

// 캡처 프로세스 시작 함수
async function startCaptureProcess() {
  loading.value = true; // 로딩 시작
  await captureAndSetImage(); // 캡처 실행
  loading.value = false; // 로딩 종료
}

// 캡처 실행 함수
async function captureAndSetImage() {
  if (!captureRef.value) {
    console.error("캡처할 요소가 존재하지 않습니다.");
    return;
  }
  try {
    const canvas = await html2canvas(captureRef.value, {
      useCORS: true, 
      scale: 2,       
      logging: true,  
      width: captureRef.value.offsetWidth,  
      height: captureRef.value.offsetHeight
    });
    capturedImage.value = canvas.toDataURL("image/png");
    console.log("캡처 완료");
  } catch (error) {
    console.error("캡처 중 오류 발생:", error.message);
    toastMessage.value = "캡처 중 오류가 발생했습니다.";
    showToast.value = true;
  }
}

// 설문 데이터를 Firestore에 저장하는 함수
const submitSurvey = async () => {
  try {
    // Firestore의 'surveys' 컬렉션에 데이터 추가
    // TODO 배포할때만 주석 풀어 적용!
    // const docRef = await addDoc(collection(db, "surveys"), parsedSurvey.value);
    console.log("Survey submitted successfully with ID:", docRef.id);
  } catch (error) {
    console.error("Error submitting survey:", error);
  }
};

// 클립보드에 이미지 복사
async function copyImageToClipboard() {
  if (!capturedImage.value) {
    console.error("캡처된 이미지가 없습니다.");
    return;
  }

  if (!navigator.clipboard || typeof ClipboardItem === "undefined") {
    console.error("브라우저가 클립보드 복사를 지원하지 않습니다.");
    toastMessage.value = "브라우저가 클립보드 복사를 지원하지 않습니다.";
    showToast.value = true;
    return;
  }

  try {
    const response = await fetch(capturedImage.value);
    const blob = await response.blob();
    const clipboardItem = new ClipboardItem({ "image/png": blob });
    await navigator.clipboard.write([clipboardItem]);
    console.log("이미지가 클립보드에 복사되었습니다!");
    toastMessage.value = "클립보드에 이미지가 복사되었습니다!";
    showToast.value = true;
  } catch (error) {
    console.error("클립보드 복사 중 오류 발생:", error.message);
    toastMessage.value = "클립보드 복사 중 오류가 발생했습니다.";
    showToast.value = true;
  }
}

function handleSnackbarClose(value) {
  if (!value) {
    showToast.value = false; // 상태를 false로 리셋
    console.log("Snackbar 닫힘");
  }
}

</script>

<style scoped>
.text-btn {
  color: #FFF;
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.w-text-btn {
  color: #000;
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: -0.5px;
}

.hidden-capture-area {
  position: absolute;
  top: -99999px; /* 화면에서 숨김 */
  left: -99999px;
}

.text-title {
    font-size: 19.5px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.5px;
}

.text-subtitle {
    font-size: 15x;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: -0.4px;
    color: #404040;
}

.margin-top-96 {
  margin-top: 96px;
}

.text-label-container {
  margin-top: 56px;
  justify-content: center;
  align-items: center;
  align-content: center;
  text-align: center;
}

.text-label {
  color: #B1B1B1;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.3px;
}
</style>