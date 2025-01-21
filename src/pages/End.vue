<template>
  <v-container>
    <v-btn @click="submitSurvey">Submit Survey</v-btn>

  </v-container>
</template>

<script setup>
// ----- 선언부 ----- //
import { onMounted, onUnmounted, ref, computed, watch} from "vue";
import { useRouter, useRoute } from "vue-router";
import { routes } from "@/router"

import axios from "axios";


// ----- 라이프 사이클 ----- //
onMounted(() => {
  const existingSurvey = localStorage.getItem('userSurvey');
  console('get existingSurvey', existingSurvey);
});

onUnmounted(() => {

})

// ----- 함수 정의 ----- //

const submitSurvey = async () => {
  const scriptURL = "1pnk6bSmCt5eo3bQ3NvOv87fY3xZ-RaeHFqFFDXEnxf6NVZmMzs8Z4b9n"; // Google Apps Script URL
  try {
    const response = await axios.post(scriptURL, userSurvey.value, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Google Sheet response:", response.data);
  } catch (error) {
    console.error("Error sending data to Google Sheet:", error);
  }
};

</script>

<style scoped>


</style>