<template>
  <v-app class="background">
    <v-app-bar app color="#FBFBFB" flat height="140" v-if="sAppBar">
      <v-row class="align-center | justify-space-between | padding-32 | padding-top-76 | padding-bottom-16">
        <!-- 로고 -->
        <v-col cols="auto">
          <v-row class="align-center">
            <v-img 
            src="@/assets/logo.svg"
            :width="84" :height="30"
            min-width="84px" min-height="30px" 
            ></v-img>
          </v-row>
        </v-col>
        <v-col cols="8">
          <v-row class="align-center | justify-end">
            test
            <!-- <v-stepper 
              class="custom-stepper" 
              >
              <v-stepper-header>
                <v-stepper-item v-for="step in steps" :key="step" :value="step"></v-stepper-item>
                <template v-for="step in steps.length - 1">
                  <v-divider class="step-divider"></v-divider>
                </template>
              </v-stepper-header>
            </v-stepper> -->
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
        @hide-appbar="emitHideAppbar"
      ></router-view>
    </v-main>

    <v-footer color="#FBFBFB" flat v-if="sFooter">
      <v-row 
        class="align-center | justify-space-between | pl-6 | pr-6" 
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
</template>

<script setup>
// ----- 선언부 ----- //
import { onMounted, onUnmounted, onBeforeMount, ref, computed, watch} from "vue";
import { useRouter, useRoute } from "vue-router";
import { routes } from "@/router"

const router = useRouter();
const route = useRoute();

const steps = [1, 2, 3, 4, 5, 6, 7];
const surveyPage = ref([
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

const sNextBtn = ref(true);
const sFooter = ref(false);
const sAppBar = ref(false);

const survey = ref({
  dorm:  null,           // 기숙사 숫자 int
  birth: null,          // 생년 int /2002
  studentId: null,      // 학번 2자리 / 25
  college: null,        // 단과대 (문자열)
  mbti: null,           // MBTI List
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
  tags: [],           // 해시태그(태그) 배열 (문자열 리스트)
  notes: ""           // 기타 참고사항 (서술형 문자열)
});

// ----- 라이프 사이클 ----- //
onBeforeMount(() => {


});

onMounted(() => {
  if (!localStorage.getItem('appInitialized')) {
    initSurvey();
  }
});

onUnmounted(() => {

});

watch(() => route.path, (path) => {
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
      router.push("/end");
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
  initSurvey();
  router.push("/survey1");
};

function emitContinueSurvey(payload) {
  console.log('Event Received: Continue Survey', payload);

  const targetPath = surveyPage.value[payload.currentStep];

  if (targetPath) {
    console.log('Navigating to:', targetPath);
    router.push(targetPath); // 해당 경로로 이동
  } else {
    console.error('Invalid currentStep:', payload.currentStep);
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

.padding-top-76 {
  padding-top: 76px;
}

.padding-bottom-16 {
  padding-bottom: 16px;
}

/* .background {
  background-color: #FBFBFB;
} */
</style>
