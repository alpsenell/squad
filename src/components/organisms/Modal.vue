<template>
  <div class="modal-overlay">
    <div
      class="modal rounded-lg"
      :style="{ width: `${sizing.width}px`, height: `${sizing.height}px` }">
      <v-row>
        <v-col
          class="d-flex"
          cols="10">
          <v-select
            id="in-players"
            :items="inPlayers"
            :rules="['required']"
            label="OUT PLAYER"
            outlined
            @change="value => $emit('outPlayerSelected', value)">
          </v-select>
        </v-col>
        <v-col
          class="d-flex"
          cols="10">
          <v-select
            id="substitute-minute"
            :rules="['required']"
            label="IN PLAYER"
            :items="inPlayers"
            outlined
            @change="value => $emit('inPlayerSelected', value)">
          </v-select>
        </v-col>
        <v-col cols="10">
          <v-text-field
            label="SUBSTITUTION MINUTE"
            :rules="['required']"
            hide-details="auto">
          </v-text-field>
        </v-col>
      </v-row>
      <v-row class="d-flex justify-end">
        <v-col cols="4">
          <v-btn
            class="cancel-button rounded-lg"
            text
            elevation="0"
            @click="$emit('closeModal')">Cancel
          </v-btn>
        </v-col>
        <v-col cols="3">
          <v-btn
            class="rounded-lg"
            :disabled="confirmButtonStatus"
            color="primary"
            elevation="0"
            @click="$emit('confirmModal')">Confirm
          </v-btn>
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
      padding: 30px;
      .cancel-button {
        color: #e63846;
      }
    }
  }
</style>
