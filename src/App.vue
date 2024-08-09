<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>My App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="$router.push('/')">Home</v-btn>
      <v-btn text @click="$router.push('/dashboard')">Dashboard</v-btn>
    </v-app-bar>

    <v-main>
      <router-view style="margin-bottom: 100px;"></router-view>
    </v-main>

    <v-footer fixed padless>
      <v-col class="text-center">©2025 칸타르동방구함위원회</v-col>
    </v-footer>
  </v-app>
</template>

<script setup>
// ----- 선언부 ----- //
import { onMounted, onUnmounted, ref, computed, watch} from "vue";
import { useRouter, useRoute } from "vue-router";
import { routes } from "@/router"

const survey = ref({
  dorm: "",           // 기숙사 (문자열)
  birth: "",          // 생년월일 8자리 (문자열 권장)
  studentId: "",      // 학번 8자리 (문자열 권장)
  college: "",        // 단과대 (문자열)
  mbti: "",           // MBTI (문자열)
  smoke: 0,           // 흡연 여부 0,1,2 (int)
  drink: "",          // 음주 정보 (예: "120000")
  sdEtc: "",  // 음주/흡연 관련 기타 (서술형 문자열)
  wakeUp: "",         // 기상 시간 ("00-00")
  lightOff: "",       // 소등 시간 ("00-00")
  bedTime: "",        // 취침 시간 ("00-00")
  sleepHabit: 0,      // 잠버릇 0,1,2,3 (int)
  noise: 0,           // 소음 허용/민감도 0,1,2 (int)
  share: 0,           // 공유·공용물품 성향 0,1,2,3 (int)
  clean: 0,           // 청소·정리정돈 성향 0,1,2,3 (int)
  bug: 0,             // 벌레에 대한 민감도 0,1,2 (int)
  eatIn: 0,           // 실내취식 0,1,2,3 (int)
  home: 0,      // 귀가 주기 0,1,2,3 (int)
  tags: [],           // 해시태그(태그) 배열 (문자열 리스트)
  notes: ""           // 기타 참고사항 (서술형 문자열)
});

// ----- 라이프 사이클 ----- //
onMounted(() => {
  localStorage.setItem('survey', JSON.stringify(survey.value));
});

onUnmounted(() => {

})

// ----- 함수 정의 ----- //

</script>

<style>

</style>
