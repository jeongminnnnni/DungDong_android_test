<template>
  <BoxContainer>
    <SubTitle :title="title" :desc="desc"> </SubTitle>
    <v-row no-gutters justify="center">
      <v-img
        :width="300"
        aspect-ratio="1/1"
        cover
        src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
      ></v-img>
    </v-row>

    <v-row no-gutters justify="center" class="margin-48 | mt-10 | pl-14 | pr-14">
      <v-btn 
        @click="submitSurvey"
        color="#FF6161" rounded="xl" width="100%" 
        class="text-btn"
      >
        이미지 저장하기
      </v-btn>
    </v-row>

    <v-row no-gutters justify="center" class="margin-48 | mt-4 | pl-14 | pr-14">
      <v-btn 
        @click="submitSurvey"
        color="#FFFFFF" rounded="xl" width="100%" 
        class="w-text-btn"
      >
        다시하기
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



  </BoxContainer>
</template>

<script setup>
// ----- 선언부 ----- //
import { onMounted, onUnmounted, onBeforeMount, ref, computed, watch} from "vue";
import { useRouter, useRoute } from "vue-router";
import { routes } from "@/router"
// import axios from "axios";

import BoxContainer from "@/components/BoxContainer.vue";

const title = '짜잔! 결과 이미지가 나왔어요.'
const desc = '이미지를 저장하고 공유하여<br>마음에 맞는 룸메이트를 구해보세요.'

// ----- 라이프 사이클 ----- //
onBeforeMount(() => {


});


onMounted(() => {
  const existingSurvey = localStorage.getItem('userSurvey');
  console.log('get existingSurvey', existingSurvey);
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

</style>