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

<script>
export default {
  name: 'App'
}
</script>

<style>

</style>
