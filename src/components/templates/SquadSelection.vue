<template>
  <div id="main-page">
    <custom-header></custom-header>
    <v-container class="selection mt-5 rounded-lg">
      <v-row class="top-part">
        <v-col
          v-if="!squadConfirmed"
          class="text-h6"
          sm="9">
          {{ teamName }}
        </v-col>
        <v-col
          v-if="!squadConfirmed"
          class="d-flex justify-end"
          sm="3">
          <v-btn
            :disabled="!isLineupAtMaximum"
            color="primary"
            @click="$emit('confirmSelection')">
            Confirm
          </v-btn>
        </v-col>
        <v-col
          v-if="squadConfirmed"
          cols="12"
          class="fill-height d-flex flex-column justify-center align-center">
          <span class="text-h5">
            <v-icon
              class="mr-0"
              large
              left>
              mdi-check-circle
            </v-icon>
              Squad saved successfully
          </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-if="!loadStatus"
          v-for="option in columnConfig"
          :key="option.title"
          class="listing rounded-lg"
          cols="4">
          <v-card
            class="text-h6"
            elevation="0">
            {{ option.title }}
          </v-card>
          <squad-list
            :no-data-text="option.noDataText"
            :list-type="option.type"
            :players="option.data"
            :team-name="teamName"
            :in-players="inPlayers"
            :squad-confirmed="squadConfirmed"
            :out-players="outPlayers"
            :is-lineup-at-maximum="isLineupAtMaximum"
            :is-subs-at-maximum="isSubsAtMaximum"
            @pickPlayer="value => $emit('pickPlayer', value)"
            @unpickPlayer="value => $emit('unpickPlayer', value)"
            @substituteAdded="value => $emit('substituteAdded', value)">
          </squad-list>
        </v-col>
        <v-skeleton-loader
          v-else
          class="mx-auto"
          min-width="300"
          height="550"
          type="image">
        </v-skeleton-loader>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SquadList from '../organisms/SquadList.vue';
import CustomHeader from '../organisms/CustomHeader.vue';

export default {
  components: {
    SquadList,
    CustomHeader,
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
     * @property {boolean} squadConfirmed
     */
    squadConfirmed: {
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
     * @property {boolean} isSubsAtMaximum
     */
    isSubsAtMaximum: {
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
          noDataText: 'You haven’t selected any player for lineup yet.',
        },
        {
          title: 'Substitute',
          data: this.substitutePlayers,
          type: 'substitute',
          noDataText: 'Please pick 11 players for lineup before creating any substitutions',
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
  #main-page {
    background-color: #e9eaeb;
    height: 100vh;
    width: 100vw;
    .selection {
      background-color: white;
      .top-part {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .listing {
        overflow: hidden;
        height: 550px;
        padding-bottom: 30px;
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
      }
    }
  }
</style>
