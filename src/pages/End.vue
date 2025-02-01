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
    </v-row>
    <v-row no-gutters justify="center" width="300px" 
      style="min-height: 300px; min-width: 300px; 
      align-items: center;"
      class="elevation-6"
      v-else="loading" 
    >
      <div ref="captureRef"  class="hidden-capture-area">
        <ImageFrame :survey="survey"></ImageFrame>
      </div>
      <v-img
        :src="capturedImage"
        aspect-ratio="1/1"
        cover
      ></v-img>
    </v-row>
    <v-row no-gutters justify="center | mt-3">
      <v-label>▲ 꾹 눌러 저장하기 ▲</v-label>
    </v-row>

    <v-row no-gutters justify="center" class="margin-48 | mt-10 | pl-14 | pr-14">
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
    <v-row>
      <v-col cols="12" class="mt-10 | mb-10" >
        <v-img rounded="lg" aspect-ratio="1/3" v-bind:src="currentAd.img"></v-img>
      </v-col>
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
          <v-img rounded="lg" aspect-ratio="1/3" v-bind:src="currentAd.img"></v-img>
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


const ads = ref([
  { num: 1, url: '', img: './ad/ad_1.jpeg'},
  { num: 2, url: '', img: './ad/ad_2.jpeg'},
  { num: 3, url: '', img: './ad/ad_3.jpeg'},
])
let adIndex = 0; 
const currentAd = ref(ads.value[0]); 

const toastMessage = ref("");
const showToast = ref(false); 

const survey = ref({
  title:  null,
  titleId:  "",
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
  intervalId = setInterval(updateAd, 3000);
});

onUnmounted(() => {
  // clearInterval(intervalId); 
})

// ----- 함수 정의 ----- //
function updateAd() {
  adIndex = (adIndex + 1) % ads.value.length; // 다음 광고 인덱스 계산
  currentAd.value = ads.value[adIndex]; // 현재 광고 업데이트
}

function loadSurveyData() {
  const existingSurvey = localStorage.getItem('userSurvey');
  console.log('get existingSurvey', existingSurvey);

  if (existingSurvey) {
    parsedSurvey.value = JSON.parse(existingSurvey);
  
    // 데이터 매핑 및 할당
    survey.value.dorm = parsedSurvey.value.dorm;
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
    survey.value.sdEtc = parsedSurvey.value.sdEtc || "";
    survey.value.wakeUp = parsedSurvey.value.wakeUp || "00:00";
    survey.value.lightOff = parsedSurvey.value.lightOff || "00:00";
    survey.value.bedTime = parsedSurvey.value.bedTime || "00:00";
    survey.value.sleepHabit = parseSleepHabit(parsedSurvey.value.sleepHabit || 0);
    survey.value.clean = parsedSurvey.value.clean || 0; // 낮을수록 깨끗, 높을수록 더럽
    survey.value.bug = parsedSurvey.value.bug || 0; // 낮을수록 못잡음, 높을수록 잘잡음
    survey.value.eatIn = parsedSurvey.value.eatIn || 0; // 낮을수록 더럽, 높을수록 깨끗
    survey.value.noise = parsedSurvey.value.noise || 0; //낮을수록 예민, 높을수록 덤덤
    survey.value.share = parsedSurvey.value.share || 0; // 낮을수록 개인물품만 사용, 높을수록 공동사용
    survey.value.home = parsedSurvey.value.home || 0; // 낮을수록 자주 집에감, 높을수록 학교에 오래 있음
    survey.value.notes = parsedSurvey.value.notes || "";
    survey.value.selectTag = parsedSurvey.value.selectTag || []; // 적을수록 덤덤, 높을수록 예민

    const titleInfo = generateTitle(survey.value);
    survey.value.title = titleInfo.title;
    survey.value.titleId = titleInfo.titleId;

    console.log('set and parse survey object', survey.value);
  }
}

function generateTitle(item) {
  console.log('Input item:', item); // 로그 출력을 좀 더 명확하게 변경했습니다.

  let prefix = "무던한"; 
  let prefixId = "MU"; 
  let suffix = "그냥새";
  let suffixId = "standard";

  // 설문 결과에서 값을 추출
  const { clean, eatIn, noise, share, home, selectTag, wakeUp, bedTime } = item;

  // 평균 계산을 위한 함수
  const average = (...nums) => nums.reduce((a, b) => a + b, 0) / nums.length;

  // 성격 태그 조건 검사
  const isNeat = eatIn <= 1 || clean >= 3;
  const isCasual = share >= 3 && (noise >= 2 || clean >= 2) && selectTag.length <= 1;
  const isLively = (noise >= 3 && home <= 1) || noise >= 3;
  const isQuiet = (home >= 3 && average(share, noise) <= 1) || average(share, noise) <= 1;
  const isDetailed = noise <= 1 && clean >= 3 || selectTag.length >= 3;

  if (isLively) {
    prefix = "흥많은";
    prefixId = "HE";
  } else if (isQuiet) {
    prefix = "조용한";
    prefixId = "JO";
  } else if (isNeat) {
    prefix = "깔끔한";
    prefixId = "KK";
  } else if (isDetailed) {
    prefix = "세심한";
    prefixId = "SE";
  } else if (isCasual) {
    prefix = "무던한";
    prefixId = "MU";
  }

  // 기상 및 취침 시각 추출
  const wakeupHour = parseInt(wakeUp.split(':')[0], 10);
  const bedTimeHour = parseInt(bedTime.split(':')[0], 10);

  // 1) 각 태그에 대한 점수 계산
  const scoreOwl = (bedTimeHour >= 0 && bedTimeHour < 6)
    ? (1 + bedTimeHour)     // 0시에 취침하면 1점, 5시에 취침하면 6점
    : 0;

  const scoreBaby = (bedTimeHour >= 20 && bedTimeHour < 23)
    ? (25 - bedTimeHour)    // 20시면 5점, 22시면 3점
    : 0;

  const scoreMorning = (wakeupHour >= 4 && wakeupHour <= 8)
    ? (8 - wakeupHour + 1)  // 4시면 5점, 8시면 1점
    : 0;

  const scoreSleep = (wakeupHour >= 10 && wakeupHour < 15)
    ? (wakeupHour - 9)      // 10시면 1점, 14시면 5점
    : 0;

  // 그냥새는 기본 0점, 혹은 다른 계산 로직을 추가해도 됨
  const scoreStandard = 1;  

  // 2) 서브픽스를 객체 리스트로 관리
  const suffixOptions = [
    { tag: "올빼미",   id: "owl",      score: scoreOwl },
    { tag: "아기새",   id: "baby",     score: scoreBaby },
    { tag: "아침새",   id: "morning",  score: scoreMorning },
    { tag: "늦잠새",   id: "sleep",    score: scoreSleep },
    { tag: "그냥새",   id: "standard", score: scoreStandard },
  ];

  // 3) 점수 확인 (디버깅용)
  console.log("Suffix Scores:", {
    scoreOwl,
    scoreBaby,
    scoreMorning,
    scoreSleep,
    scoreStandard,
  });

  // 4) 가장 높은 점수를 가진 서브픽스 결정
  const bestSuffix = suffixOptions.reduce((best, current) =>
    current.score > best.score ? current : best
  );

  suffix = bestSuffix.tag;
  suffixId = bestSuffix.id;

  console.log(`${suffix}:  wakeupHour ${wakeupHour}  bedTimeHour ${bedTimeHour}`)

  return { title: `${prefix} ${suffix}`, titleId: `${prefixId}_${suffixId}` };
}



// 테스트 데이터
const testItems = [
  { clean: 2, eatIn: 3, noise: 3, share: 2, home: 1, selectTag: [1, 2], wakeUp: "10:00", bedTime: "01:30" }, // 올빼미
  { clean: 0, eatIn: 1, noise: 2, share: 4, home: 2, selectTag: [1], wakeUp: "08:30", bedTime: "22:30" }, // 아기새
  { clean: 1, eatIn: 2, noise: 3, share: 3, home: 2, selectTag: [], wakeUp: "06:30", bedTime: "23:30" }, // 아침새
  { clean: 1, eatIn: 1, noise: 1, share: 3, home: 3, selectTag: [1, 2, 3], wakeUp: "11:30", bedTime: "00:30" }, // 늦잠새
  { clean: 2, eatIn: 2, noise: 2, share: 2, home: 2, selectTag: [], wakeUp: "09:00", bedTime: "23:00" }, // 그냥새
];

// 테스트 실행
testItems.forEach((item, index) => {
  const result = generateTitle(item);
  console.log(`테스트 ${index + 1}:`, result);
});


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
  console.log("emitting restart-survey event.");
  localStorage.setItem('appInitialized', 'false');
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
      allowTaint: true,
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
  top: -99999px;
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