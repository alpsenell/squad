<template>
  <v-container>
    <v-row class="top-part">
      <v-col sm="9">{{ teamName }}</v-col>
      <v-col sm="3">
        <v-btn :disabled="!isLineupAtMaximum">Confirm Selection</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="option in columnConfig"
        :key="option.title"
        class="listing"
        cols="12"
        sm="4">
        <v-card>{{ option.title }}</v-card>
        <squad-list
          :no-data-text="option.noDataText"
          :list-type="option.type"
          :players="option.data"
          :in-players="inPlayers"
          :out-players="outPlayers"
          :is-lineup-at-maximum="isLineupAtMaximum"
          @pickPlayer="value => $emit('pickPlayer', value)"
          @unpickPlayer="value => $emit('unpickPlayer', value)">
        </squad-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SquadList from '../organisms/SquadList.vue';

export default {
  components: {
    SquadList,
  },

  props: {
    /**
     * @property {boolean} loadStatus
     */
    loadStatus: {
      type: Boolean,
      required: true,
    },
    /**
     * @property {array} allPlayers
     */
    allPlayers: {
      type: Array,
      required: true,
    },
    /**
     * @property {array} selectedPlayers
     */
    selectedPlayers: {
      type: Array,
      required: true,
    },
    /**
     * @property {array} substitutePlayers
     */
    substitutePlayers: {
      type: Array,
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
     * @property {string} teamName
     */
    teamName: {
      type: String,
      required: true,
    },
  },

  computed: {
    /**
     * @return {Array<object>}
     */
    columnConfig () {
      return [
        {
          title: 'All Players',
          data: this.allPlayers,
          type: 'selection',
          noDataText: 'No Data',
        },
        {
          title: 'Lineup',
          data: this.selectedPlayers,
          type: 'lineup',
          noDataText: 'No Data',
        },
        {
          title: 'Substitute',
          data: this.substitutePlayers,
          type: 'substitute',
          noDataText: 'No Data',
        },
      ];
    },

    /**
     * @return {array}
     */
    inPlayers () {
      return this.allPlayers.map((player) => player.display_name);
    },

    /**
     * @return {array}
     */
    outPlayers () {
      return this.selectedPlayers.map((player) => player.display_name);
    },
  },
};
</script>

<style scoped lang="scss">
  .top-part {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .listing {
    overflow: hidden;
    height: 550px;
  }
</style>
