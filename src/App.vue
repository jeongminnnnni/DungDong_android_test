<template>
  <v-app class="background">
    <v-app-bar app color="#FBFBFB" flat height="100" v-if="sAppBar">
      <v-row class="align-center | justify-space-between | padding-32 | padding-top-56 | padding-bottom-16">
        <!-- 로고 -->
        <v-col cols="auto">
          <v-row class="align-center | pl-3">
            <v-img 
            src="@/assets/logo.svg"
            :width="84" :height="30"
            min-width="84px" min-height="30px" 
            ></v-img>
          </v-row>
        </v-col>
        <v-col cols="8">
          <v-row v-if="sFooter" class="align-center | justify-end | pr-2">
            <v-col cols="auto" class="progress-bar">
                <div
                v-for="(step, index) in 7"
                :key="index"
                class="circle"
                :class="{ active: index === pageIndex }"
                >
                <div class="line" v-if="index !== 6"></div>
                </div>
            </v-col>
          </v-row>
        </v-col>
        <v-divider class="margin-top-16" />
      </v-row>
    </v-app-bar>

    <v-main>
      <router-view
        @start-survey="emitStartSurvey"
        @restart-survey="emitRestartSurvey"
        @continue-survey="emitContinueSurvey"
        @fix-survey="emitFixSurvey"
        @hide-appbar="emitHideAppbar"
      ></router-view>
    </v-main>

    <v-footer color="#FBFBFB" flat v-if="sFooter">
      <v-row 
        class="align-center | justify-space-between | pl-6 | pr-6 | pt-4 | pb-4" 
        no-gutters
      >
        <v-btn 
          prepend-icon="mdi-arrow-left" 
          variant="text"
          @click="handleClickGoPage('back')"
        >
          <template v-slot:prepend>
            <v-icon color="#FF5858"></v-icon>
          </template>
          Back
        </v-btn>

        <v-btn 
          v-if="sNextBtn"
          append-icon="mdi-arrow-right" 
          variant="text"
          @click="handleClickGoPage('next')"
        >
          <template v-slot:append>
            <v-icon color="#FF5858"></v-icon>
          </template>
          Next
        </v-btn>
        <v-btn 
          v-else="sNextBtn"
          append-icon="mdi-arrow-right" 
          variant="text"
          @click="handleClickGoPage('finish')"
        >
          <template v-slot:append>
            <v-icon color="#FF5858"></v-icon>
          </template>
          Finish
        </v-btn>

      </v-row>
    </v-footer>
  </v-app>

  <!-- 다이얼로그 -->
  <v-dialog v-model="dialog.dialogActive" width="auto">
    <v-card class="pa-2 | pb-3" rounded="lg">
      <v-card-title class="text-title | pl-4 | pr-4 | pt-4">
        <v-row style="justify-content: start; align-items: center;">
          <v-col class="pt-0 | pb-0 | pl-4 | pr-1" cols="auto">
            <v-img
              src="@/assets/logo.png"
              height="24"
              width="24"
              class=""
            ></v-img>
          </v-col>
          <v-col class="pl-1" cols="auto">
            {{ dialog.title }}
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text class="text-subtitle | pl-4 | pr-4 | pt-2 | pb-3" v-html="dialog.text"></v-card-text>
      <template v-slot:actions>
          <v-row no-gutters justify="end">
              <v-btn color="#FF5858" width="25%" rounded="xl" variant="outlined" @click="dialog.dialogActive = false">취소</v-btn>
              <v-btn color="#FF5858" width="25%" rounded="xl" variant="flat" class="ml-2" @click="dialog.okButton">확인</v-btn>
          </v-row>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup>
// ----- 선언부 ----- //
import { onMounted, onUnmounted, ref, computed, watch} from "vue";
import { useRouter, useRoute } from "vue-router";
import { routes } from "@/router"

import { db } from "@/common/Firebase"; // Firestore 초기화 파일
import { collection, addDoc, updateDoc, doc } from "firebase/firestore"; // Firestore 함수

import axios from "axios";

const router = useRouter();
const route = useRoute();

const steps = [1, 2, 3, 4, 5, 6, 7];
const surveyPage = ref([
  { path: "/", meta: { appbar: false, index: 0 } },
  { path: "/home", meta: { appbar: false, index: 0 } },
  { path: "/survey1", meta: { appbar: true, index: 1 } },
  { path: "/survey2", meta: { appbar: true, index: 2 } },
  { path: "/survey3", meta: { appbar: true, index: 3 } },
  { path: "/survey4", meta: { appbar: true, index: 4 } },
  { path: "/survey5", meta: { appbar: true, index: 5 } },
  { path: "/survey6", meta: { appbar: true, index: 6 } },
  { path: "/survey7", meta: { appbar: true, index: 7 } },
  // { path: "/end", meta: { appbar: false, index: 8 } },
]);
const pageIndex = ref(0);

const sNextBtn = ref(true);
const sFooter = ref(false);
const sAppBar = ref(false);

const dialog = ref({
  title: '',
  text: '',
  isActive: false,
  okButton() {}
});

const lastDocumentId = ref(null)
const survey = ref({
  dorm:  null,           // 기숙사 숫자 int
  birth: null,          // 생년 int /2002
  studentId: null,      // 학번 2자리 / 25
  college: 0,        // 단과대 (문자열)
  mbti: "",           // MBTI List
  smoke: null,           // 흡연 여부 0,1,2 (int)
  drink: "",          // 음주 정보 (예: "12-0-00")
  sdEtc: "",  // 음주/흡연 관련 기타 (서술형 문자열)
  wakeUp: "",         // 기상 시간 ("00-00")
  lightOff: "",       // 소등 시간 ("00-00")
  bedTime: "",        // 취침 시간 ("00-00")
  sleepHabit: 0,      // 잠버릇 0,1,2,3 (int)
  clean: 0,           // 청소·정리정돈 성향 0,1,2,3 (int)
  bug: 0,             // 벌레에 대한 민감도 0,1,2 (int)
  eatIn: 0,           // 실내취식 0,1,2,3 (int)
  noise: 0,           // 소음 허용/민감도 0,1,2 (int)
  share: 0,           // 공유·공용물품 성향 0,1,2,3 (int)
  home: 0,      // 귀가 주기 0,1,2,3 (int)
  selectTag: [],           // 해시태그(태그) 배열 (문자열 리스트)
  notes: ""           // 기타 참고사항 (서술형 문자열)
});


// ----- 라이프 사이클 ----- //
onMounted(() => {
  console.log(import.meta.env)
  
  if (!localStorage.getItem('appInitialized')) {
    initSurvey();
  }
});

onUnmounted(() => {

});

watch(() => route.path, (path) => {
    // Update the pageIndex based on the current route
    const currentPage = surveyPage.value.find((page) => page.path === path);
    if (currentPage) {
      pageIndex.value = currentPage.meta.index - 1;
    } else {
      console.error("Current path does not exist in surveyPage:", path);
    }

    if (path === "/home" || path === "/") {
      sFooter.value = false;
      sAppBar.value = false;

    } else if (path === "/end") {
      sFooter.value = false;
      sAppBar.value = true;

    } else {
      sFooter.value = true;
      sAppBar.value = true;
    }

    if (path === "/survey7") {
      sNextBtn.value = false;
    } else {
      sNextBtn.value = true;
    }
  },
  { immediate: true }
);

// ----- 함수 정의 ----- //
function initSurvey() {
  localStorage.setItem('appInitialized', 'true');
  localStorage.setItem('userProgress', JSON.stringify({ currentStep: 0}));
  localStorage.setItem('userSurvey', JSON.stringify(survey.value));

  console.log("set localStorage appInitialized:", localStorage.getItem('appInitialized'))
  console.log("set localStorage userProgress:", localStorage.getItem('userProgress'))
  console.log("set localStorage userProgress:", localStorage.getItem('userSurvey'))
}

function handleClickGoPage(state) {
  // 현재 경로에 해당하는 인덱스를 찾음
  const currentIndex = surveyPage.value.findIndex((page) => page.path === route.path);

  if (currentIndex === -1) {
    console.warn("현재 경로가 surveyPage에 없습니다.");
    return;
  }

  switch (state) {
    case "back":
      if (currentIndex > 0) {
        const previousPage = surveyPage.value[currentIndex - 1]; 
        console.log("현재 페이지:", route.path);
        console.log("이동한 페이지:", previousPage.path);
        router.push(previousPage.path); 
      }
      break;

    case "next":
      if (currentIndex < surveyPage.value.length - 1) {
        const nextPage = surveyPage.value[currentIndex + 1]; 
        console.log("현재 페이지:", route.path);
        console.log("이동한 페이지:", nextPage.path);
        router.push(nextPage.path); 
      } 
      break;

    case "finish":
      openDialog(
        '이미지 생성하기',
        '설문조사를 끝내고 이미지를 생성할까요?<br>물론, 다시 돌아와 수정할 수 있습니다.',
        submitSurveyToFB
      )
      break;

    default:
      console.warn("Invalid state:", state);
      break;
  }
};


function emitHideAppbar() {
  console.log('Event Received: hide appbar');
  sFooter.value = false;
};

function emitStartSurvey() {
  console.log('Event Received: Start Survey');
  initSurvey();
  router.push("/survey1");
};

function emitRestartSurvey() {
  console.log('Event Received: Restart Survey');
  router.push("/home");
  initSurvey();
};

function emitFixSurvey() {
  console.log('Event Received: Fix Survey');
  router.push("/survey7");
};

// function emitContinueSurvey(payload) {
//   console.log('Event Received: Continue Survey', payload);

//   const targetPath = surveyPage.value[payload.currentStep];

//   if (targetPath) {
//     console.log('Navigating to:', targetPath);
//     router.push(targetPath); // 해당 경로로 이동
//   } else {
//     console.error('Invalid currentStep:', payload.currentStep);
//   }
// };
function emitContinueSurvey() {
  console.log('Event Received: Continue Survey');
  router.push("/survey1");
};

function openDialog(title, text, onConfirm) {
  dialog.value.title = title;
  dialog.value.text = text;
  dialog.value.okButton = onConfirm;
  dialog.value.dialogActive = true;
}

// 파이어베이스
function submitSurveyToFB() {
  const existingSurvey = localStorage.getItem('userSurvey');
  console.log('get existingSurvey', existingSurvey);

  if (existingSurvey) {
    const parseSurvey = JSON.parse(existingSurvey);

    if (!lastDocumentId.value) {
      submitSurvey(parseSurvey); // TODO 배포시에 주석 풀기
    } else {
      updateSurvey(parseSurvey); // TODO 배포시에 주석 풀기
    }
  } else {
    console.error("No survey data to submit.");
    return;
  }

  dialog.value.dialogActive = false;
  router.push("/end");
}

// 설문 데이터를 Firestore에 저장하는 함수
const submitSurvey = async (survey) => {
  console.log(typeof survey, survey);
  try {
    const docRef = await addDoc(collection(db, "surveys"), survey);
    console.log("Survey submitted successfully with ID:", docRef.id);
    localStorage.setItem('surveyId', docRef.id);
    lastDocumentId.value = docRef.id;  // 문서 ID 저장
  } catch (error) {
    console.error("Error submitting survey:", error);
    localStorage.setItem('surveyId', null);
  }
};

// 문서 ID를 사용하여 해당 문서를 업데이트하는 함수
const updateSurvey = async (updates) => {
  if (!lastDocumentId.value) {
    console.error("No document ID found. Submitting a survey first.");
    return;
  }
  try {
    const surveyRef = doc(db, "surveys", lastDocumentId.value);
    await updateDoc(surveyRef, updates);
    console.log("Survey updated successfully with ID:", lastDocumentId.value);
  } catch (error) {
    console.error("Error updating survey:", error);
  }
};


</script>

<style scoped>

.margin-top-16 {
  margin-top: 16px;
}

.padding-32 {
  padding: 32px;
}

.padding-top-56 {
  padding-top: 56px;
}

.padding-bottom-16 {
  padding-bottom: 16px;
}

.progress-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px; /* 원 사이 간격 */
}

.circle {
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #B1B1B1; /* 기본 배경색 */
  display: flex;
  align-items: center;
  justify-content: center;
}

.circle.active {
  background-color: #ff5858; /* 현재 단계 배경색 */
}

.line {
  position: absolute;
  width: 17px;
  height: 0.6px;
  background-color: #B1B1B1;
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
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


</style>
