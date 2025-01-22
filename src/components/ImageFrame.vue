<template>
    <v-container style="width: 1000px; height: 1000px;">
        <v-row no-gutters>
            <v-col>

            </v-col>
            <v-col>
                <v-row no-gutters>
                    <v-col>
                        asdfasdf
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col>
                        asdfasdf
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row no-gutters>
            <v-col col="7">
                <v-row no-gutters>
                    <v-col>민감함</v-col>
                    <v-col>시끄러운 통화</v-col>
                </v-row>

                <v-row no-gutters>
                    <v-col>민감함</v-col>
                    <v-col>시끄러운 통화</v-col>
                </v-row>

                <v-row no-gutters>
                    <v-col>민감함</v-col>
                </v-row>
                <v-row no-gutters>
                    <v-chip>비허용</v-chip>
                    <v-chip>허용</v-chip>
                    <v-chip>논의 필요</v-chip>
                </v-row>

                <v-row no-gutters>
                    <v-col>민감함</v-col>
                </v-row>
                <v-row no-gutters>
                    <v-chip>안함</v-chip>
                    <v-chip>필요함</v-chip>
                    <v-chip>상관업음</v-chip>
                </v-row>

                <v-row no-gutters>
                    <v-col>민감함</v-col>
                </v-row>
                <v-row no-gutters>
                    <v-chip>못잡음</v-chip>
                    <v-chip>작은것만</v-chip>
                    <v-chip>벌레헌터</v-chip>
                </v-row>
            </v-col>

            <v-divider vertical></v-divider>

            <v-col col="5">
                <v-row no-gutters>
                    <v-col>민감함</v-col>
                    <v-col>시끄러운 통화</v-col>
                </v-row>

                <v-row no-gutters>
                    <v-col>민감함</v-col>
                    <v-col>시끄러운 통화</v-col>
                </v-row>

                <v-row no-gutters>
                    <v-col>민감함</v-col>
                    <v-col>시끄러운 통화</v-col>
                </v-row>

                <v-row no-gutters>
                    <v-col>민감함</v-col>
                </v-row>
                <v-slider
                    :max="4" :step="1"
                    color="#FF5858" thumb-color="#FF5858" track-color="#D9D9D9" track-fill-color="#FF5858" 
                    tick-size="4" show-ticks="always" track-size="4" thumb-size="16"
                ></v-slider>
                
                <v-row no-gutters>
                    <v-col>민감함</v-col>
                </v-row>
                <v-slider
                    :max="4" :step="1"
                    color="#FF5858" thumb-color="#FF5858" track-color="#D9D9D9" track-fill-color="#FF5858" 
                    tick-size="4" show-ticks="always" track-size="4" thumb-size="16"
                ></v-slider>

            </v-col>
        </v-row>
        <v-divider></v-divider>
    </v-container>
</template>
  

<script setup>
// ----- 선언부 ----- //
import { onMounted, onUnmounted, ref, computed, watch} from "vue";

const props = defineProps({
    survey: Object
});

// ----- 라이프 사이클 ----- //
onMounted(() => {
    console.log('component get survey object', props.survey.value);
});

onUnmounted(() => {

})

// ----- 함수 정의 ----- //


</script>

<style scoped>
.text-title {
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.5px;
}

.text-subtitle {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.4px;
    color: #404040;
}
</style>


