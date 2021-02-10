<template>
  <v-container
    id="header"
    fluid>
    <v-container class="justify-lg-space-between">
      <v-row>
        <v-col cols="6">
          <v-img
            src="../../assets/Logo.png"
            max-height="18"
            max-width="132">
          </v-img>
        </v-col>
        <v-col cols="6">
          <v-img
            src="../../assets/Avatar.png"
            max-height="34"
            max-width="34">
          </v-img>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
};
</script>

<style scoped lang="scss">
  #header {
    background-color: #02063f;
  }
</style>
