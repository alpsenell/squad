<template>
  <div class="modal-overlay">
    <div
      class="modal"
      :style="{ width: `${sizing.width}px`, height: `${sizing.height}px` }">
      <v-row>
        <v-col
          class="d-flex"
          cols="12"
          sm="12">
          <v-select
            id="in-players"
            :items="inPlayers"
            label="OUT PLAYER"
            outlined>
          </v-select>
        </v-col>
        <v-col
          class="d-flex"
          cols="12"
          sm="12">
          <v-select
            id="substitute-minute"
            label="IN PLAYER"
            :items="inPlayers"
            outlined>
          </v-select>
        </v-col>
        <v-col>
          <v-text-field
            label="SUBSTITUTION MINUTE"
            :rules="['required']"
            hide-details="auto">
          </v-text-field>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * @property {object} sizing
     */
    sizing: {
      type: Object,
      default: () => ({ height: 350, width: 350 }),
    },
    /**
     * @property {array} outPlayers
     */
    outPlayers: {
      type: Array,
      required: true,
    },
    /**
     * @property {array} inPlayers
     */
    inPlayers: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
  .modal-overlay {
    background-color: rgba(43, 44, 63, 0.86);
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    align-items: center;
    .modal {
      background-color: white;
    }
  }
</style>
