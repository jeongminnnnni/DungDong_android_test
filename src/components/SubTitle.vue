<template>
    <v-row>
        {{ props.title }}
    </v-row>
    <v-row>
        {{ props.desc }}
    </v-row>
</template>

<script setup>
// ----- 선언부 ----- //
import { onMounted, onUnmounted, ref, computed, watch} from "vue";
import { useRouter, useRoute } from "vue-router";
import { routes } from "@/router"

const props = defineProps({
    title: String,
    desc: String
})


// ----- 라이프 사이클 ----- //
onMounted(() => {
    
});

onUnmounted(() => {

})

// ----- 함수 정의 ----- //




</script>

<style scoped>

.container-box {
  padding: 20px;            /* 내부 여백 */
  width: 100%;              /* 반응형 지원 */
}
</style>