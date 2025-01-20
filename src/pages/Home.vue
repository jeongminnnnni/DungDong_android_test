<template>
  <v-container>
    <v-row no-gutters justify="center" class="margin-88 | margin-top-180">
      <v-img 
      src="@/assets/logo.svg"
      :width="207" :height="71"
      min-width="207px" min-height="72px" 
      ></v-img>
    </v-row>
    <v-row no-gutters justify="center" class="margin-88px | mt-2">
      <v-col class="title-text-sub">
        선호를 이미지로, 나만의 룸메이트 매칭
      </v-col>
    </v-row>

    <v-card
      class="mx-auto | margin-top-80"
      max-width="344"
    >
      <v-card-text>
        <div class="text-medium-emphasis | text-align-center">
          본 서비스는 품질 향상과 인사이트 도출을 위해<br>
          응답을 수집하여 통계 및 데이터 분석에 활용합니다.<br>
          위 내용은 해당 목적 외에는 사용되지 않으며,<br>
          관련 법령을 준수하여 안전하게 관리됩니다.
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions justify="center">
        <v-checkbox label="응답내용 수집에 동의합니다" hide-details density="compact"></v-checkbox>
      </v-card-actions>
    </v-card>

    <v-row no-gutters justify="center" class="margin-48">
      <v-btn 
        @click="handleClickStartBtn"
      >
        설문 시작
      </v-btn>
    </v-row>
    <v-row no-gutters justify="center" class="margin-48">
      <v-btn 
        @click="handleClickRestartBtn"
      >
        다시 시작
      </v-btn>
    </v-row>
    <v-row no-gutters justify="center" class="margin-48">
      <v-btn 
        @click="handleClickContBtn"
      >
        이어하기
      </v-btn>
    </v-row>
  </v-container>
</template>

<script setup>
// ----- 선언부 ----- //
import { onMounted, onUnmounted, ref, computed, watch} from "vue";
import { useRouter, useRoute } from "vue-router";
import { routes } from "@/router"

const emit = defineEmits(['hide-appbar', 'start-survey', 'restart-survey', 'continue-survey']);


// ----- 라이프 사이클 ----- //
onMounted(() => {
  emit('hide-appbar'); 
  localStorage.setItem('userProgress', JSON.stringify({ currentStep: 0}));
  console.log("set localStorage userProgress:", localStorage.getItem('userProgress'));
});

onUnmounted(() => {

})

// ----- 함수 정의 ----- //

// 설문 시작
function handleClickStartBtn() {
  localStorage.setItem('appInitialized', 'false');
  console.log("emitting start-survey event.");
  emit('start-survey');
}

// 다시 시작
function handleClickRestartBtn() {
  localStorage.setItem('appInitialized', 'false');
  console.log("emitting restart-survey event.");
  emit('restart-survey'); 
}

// 이어서 작성하기
function handleClickContBtn() {
  console.log("emitting continue-survey event.");

  const userProgress = JSON.parse(localStorage.getItem('userProgress')) || {};
  const currentStep = userProgress.currentStep || 0; // 기본값 0

  emit('continue-survey', { currentStep });

  console.log("Current Step sent with continue-survey:", currentStep);
}


</script>

<style scoped>
.margin-top-180 {
  margin-top: 180px;
}

.margin-48 {
  margin-left: 48px;
  margin-right: 48px;
}

.margin-top-80 {
  margin-top: 80px;
}

.margin-88 {
  margin-left: 88px;
  margin-right: 88px;
}

.title-text-sub {
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.5px;
}


</style>