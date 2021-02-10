<template>
  <div
    class="player-listing"
    :class="{ 'd-flex justify-center align-center': noData || squadConfirmed && isSelection }">
    <div v-if="squadConfirmed && isSelection">
      <v-img
        src="../../assets/clubLogo.png"
        max-height="64"
        max-width="64">
      </v-img>
      <p>{{ teamName }}</p>
    </div>
    <div v-else-if="hasPlayer">
      <v-card
        v-if="isSelection || isLineup"
        v-for="player in players"
        :key="player.display_name"
        elevation="0"
        class="m-0 p-0 mb-2">
        <v-list-item class="px-0">
          <v-list-item-avatar size="34">
            <img :src="player.image_url" alt="">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">{{ player.display_name }}</v-list-item-title>
            <v-list-item-subtitle>{{ player.position.name }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-btn
            v-if="!squadConfirmed"
            :color="isSelection ? 'deep-purple lighten-2' : 'error'"
            :disabled="isLineupAtMaximum && isSelection"
            :text="true"
            @click="handleClick(player)">
            {{ buttonText }}
          </v-btn>
        </v-list-item>
      </v-card>
      <v-card
        v-else
        v-for="substitutes in players"
        :key="substitutes.inPlayer.display_name"
        elevation="0"
        class="m-0 p-0 mb-2">
        <v-list-item class="px-0">
          <v-list-item-avatar size="34">
            <img :src="substitutes.inPlayer.image_url" alt="">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">
              {{ substitutes.inPlayer.display_name }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ substitutes.inPlayer.position.name }}</v-list-item-subtitle>
          </v-list-item-content>
          <span class="text-caption">
            <v-icon
              class="mr-0"
              small
              left>
              mdi-arrow-up
            </v-icon>
              {{ `${substitutes.substituteMinute}'` }}
          </span>
        </v-list-item>
      </v-card>
    </div>
    <div
      v-else-if="(isLineup || isSelection) && !hasPlayer"
      class="no-data-text text-center">
      {{ noDataText }}
    </div>
    <div
      v-else-if="isSubstitute && !canAddSubstitute"
      class="no-data-text text-center">
      {{ noDataText }}
    </div>
    <div v-if="isSubstitute && canAddSubstitute && !squadConfirmed">
      <v-btn
        :text="true"
        :disabled="!canAddSubstitute"
        class="add-substitute-text text-caption text-capitalize"
        @click="openAddSubstituteModal">
        <v-icon left>mdi-plus</v-icon>
        Add Substitution
      </v-btn>
    </div>
    <modal
      v-if="addSubstituteModal"
      :in-players="inPlayers"
      :out-players="outPlayers"
      @substituteAdded="substituteAdded"
      @closeModal="closeModal">
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
     * @property {boolean} squadConfirmed
     */
    squadConfirmed: {
      type: Boolean,
      required: true,
    },
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
     * @property {boolean} isSubsAtMaximum
     */
    isSubsAtMaximum: {
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
    /**
     * @property {string} teamName
     */
    teamName: {
      type: String,
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
      return this.isSubstitute && this.isLineupAtMaximum && !this.isSubsAtMaximum;
    },

    /**
     * @return {boolean}
     */
    noData () {
      return ((this.isLineup || this.isSelection) && !this.hasPlayer)
        || (this.isSubstitute && !this.canAddSubstitute && !this.isSubsAtMaximum);
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

    /**
     * @return {void}
     */
    closeAddSubstituteModal () {
      this.addSubstituteModal = false;
    },

    /**
     * @return {void}
     */
    closeModal () {
      this.closeAddSubstituteModal();
      this.$emit('closeModal');
    },

    /**
     * @return {void}
     */
    substituteAdded (value) {
      this.closeAddSubstituteModal();
      this.$emit('substituteAdded', value);
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
    .no-data-text {
      color: #586f8f;
    }
    .add-substitute-text {
      color: #12c990;
    }
  }
</style>
