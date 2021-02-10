<template>
  <div class="player-listing">
    <div v-if="hasPlayer || canAddSubstitute">
      <v-card
        v-for="player in players"
        :key="player.name"
        class="mb-2">
        <v-list-item>
          <v-list-item-avatar size="34">
            <img :src="player.image_url" alt="">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">{{ player.display_name }}</v-list-item-title>
            <v-list-item-subtitle>{{ player.position.name }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-btn
            v-if="isSelection || isLineup"
            color="deep-purple lighten-2"
            :disabled="isLineupAtMaximum && isSelection"
            :text="true"
            @click="handleClick(player)">
            {{ buttonText }}
          </v-btn>
        </v-list-item>
      </v-card>
    </div>
    <div v-else-if="(isLineup || isSelection) && !hasPlayer">{{ noDataText }}</div>
    <div v-else-if="isSubstitute && !canAddSubstitute">{{ noDataText }}</div>
    <div v-if="isSubstitute && canAddSubstitute">
      <v-btn
        :text="true"
        :disabled="!canAddSubstitute"
        @click="openAddSubstituteModal">
        <v-icon left>
          mdi-plus
        </v-icon>
        Add Substitute
      </v-btn>
    </div>
    <modal
      v-if="addSubstituteModal"
      :in-players="inPlayers"
      :out-players="outPlayers">
    </modal>
  </div>
</template>

<script>
import { isEmptyArray } from '../../helpers';
import Modal from './Modal.vue';

export default {
  components: {
    Modal,
  },

  props: {
    /**
     * @property {array} players
     */
    players: {
      type: Array,
      required: true,
    },
    /**
     * @property {string} noDataText
     */
    noDataText: {
      type: String,
      required: true,
    },
    /**
     * @property {string} listType
     */
    listType: {
      type: String,
      required: true,
    },
    /**
     * @property {boolean} isLineupAtMaximum
     */
    isLineupAtMaximum: {
      type: Boolean,
      required: true,
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
      addSubstituteModal: false,
    };
  },

  computed: {
    /**
     * @return {boolean}
     */
    hasPlayer () {
      return !isEmptyArray(this.players);
    },

    /**
     * @return {boolean}
     */
    isSelection () {
      return this.listType === 'selection';
    },

    /**
     * @return {boolean}
     */
    isLineup () {
      return this.listType === 'lineup';
    },

    /**
     * @return {boolean}
     */
    isSubstitute () {
      return this.listType === 'substitute';
    },

    /**
     * @return {string}
     */
    buttonText () {
      return this.isSelection ? 'Pick' : 'Unpick';
    },

    /**
     * @return {boolean}
     */
    canAddSubstitute () {
      return this.isSubstitute && this.isLineupAtMaximum;
    },
  },

  methods: {
    /**
     * @param {string} value
     * @return {void}
     */
    handleClick (value) {
      if (this.isSelection) {
        this.$emit('pickPlayer', value);

        return;
      }

      this.$emit('unpickPlayer', value);
    },

    /**
     * @return {void}
     */
    openAddSubstituteModal () {
      this.addSubstituteModal = true;
    },
  },
};
</script>

<style lang="scss" scoped>
  .player-listing {
    overflow-y: scroll;
    padding-right: 30px;
    width: 100%;
    height: 100%;
    box-sizing: content-box;
  }
</style>
