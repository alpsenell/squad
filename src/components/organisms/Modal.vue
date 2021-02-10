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
            id="out-players"
            :items="outPlayers"
            v-model="outPlayer"
            label="OUT PLAYER"
            outlined>
          </v-select>
        </v-col>
        <v-col
          class="d-flex"
          cols="10">
          <v-select
            id="in-players"
            v-model="inPlayer"
            label="IN PLAYER"
            :items="inPlayers"
            outlined>
          </v-select>
        </v-col>
        <v-col cols="10">
          <v-text-field
            ref="substituteMinute"
            label="SUBSTITUTION MINUTE"
            v-model="substituteMinute"
            :rules="substituteMinuteRule"
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
            :disabled="disableConfirmButton"
            color="primary"
            elevation="0"
            @click="confirmSubstitute">Confirm
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

  data () {
    return {
      substituteMinuteRule: [
        (value) => {
          const pattern = /^\d+$/;
          return pattern.test(value) || 'Please Enter number';
        },
        (value) => (value <= 120 && value > 0) || 'It should be less than 120 and greater than 0',
      ],
      substituteMinute: '',
      inPlayer: '',
      outPlayer: '',
    };
  },

  computed: {
    /**
     * @return {boolean}
     */
    disableConfirmButton () {
      return this.outPlayer === ''
        || this.inPlayer === ''
        || this.substituteMinute === ''
        || !/^\d+$/.test(this.substituteMinute)
        || this.substituteMinute > 120
        || this.substituteMinute <= 0;
    },
  },

  methods: {
    /**
     * @return {void}
     */
    confirmSubstitute () {
      this.$emit('substituteAdded', {
        inPlayer: this.inPlayer,
        outPlayer: this.outPlayer,
        substituteMinute: this.substituteMinute,
      });
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
