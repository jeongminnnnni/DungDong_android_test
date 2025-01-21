<template>
  <BoxContainer>
    <SubTitle :title="title" :desc="desc"> </SubTitle>

    <v-btn @click="submitSurvey">이미지 저장하기</v-btn>
    <v-btn @click="submitSurvey">룸메찾기 공유하기</v-btn>

  </BoxContainer>
</template>

<script setup>
// ----- 선언부 ----- //
import { onMounted, onUnmounted, ref, computed, watch} from "vue";
import { useRouter, useRoute } from "vue-router";
import { routes } from "@/router"
// import axios from "axios";

import BoxContainer from "@/components/BoxContainer.vue";

const title = '짜잔! 결과 이미지가 나왔어요.'
const desc = '이미지를 저장하고 공유하여<br>마음에 맞는 룸메이트를 구해보세요.'

// ----- 라이프 사이클 ----- //
onMounted(() => {
  const existingSurvey = localStorage.getItem('userSurvey');
  console('get existingSurvey', existingSurvey);
});

onUnmounted(() => {

})

// ----- 함수 정의 ----- //

// const submitSurvey = async () => {
//   const scriptURL = "1pnk6bSmCt5eo3bQ3NvOv87fY3xZ-RaeHFqFFDXEnxf6NVZmMzs8Z4b9n"; // Google Apps Script URL
//   try {
//     const response = await axios.post(scriptURL, userSurvey.value, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     console.log("Google Sheet response:", response.data);
//   } catch (error) {
//     console.error("Error sending data to Google Sheet:", error);
//   }
// };

</script>

<style scoped>


</style>