<template>
  <squad-selection
    :load-status="loadStatus"
    :all-players="allPlayers"
    :team-name="teamName"
    :selected-players="selectedPlayers"
    :substitute-players="substitutes"
    :is-lineup-at-maximum="isLineupAtMaximum"
    @pickPlayer="addPlayerToLineup"
    @unpickPlayer="removePlayerFromLineup"
    @outPlayerSelected="addPlayerToOut"
    @inPlayerSelected="addPlayerToIn">
  </squad-selection>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import SquadSelection from '../templates/SquadSelection.vue';
import { ClubIds, LineupSelectionValue } from '../../enums/CommonEnums';

export default {
  components: {
    SquadSelection,
  },

  data () {
    return {
      loadStatus: true,
    };
  },

  computed: {
    ...mapState([
      'allPlayers',
      'selectedPlayers',
      'substitutes',
    ]),

    /**
     * @return {string}
     */
    teamName () {
      return ((this.allPlayers[0] || {}).team || {}).display_name || '';
    },

    /**
     * @return {boolean}
     */
    isLineupAtMaximum () {
      return this.selectedPlayers.length === LineupSelectionValue;
    },
  },

  async beforeMount () {
    await this.fetchClubPlayers({ clubId: ClubIds.Besiktas, count: 25 });

    this.loadStatus = false;
  },

  methods: {
    ...mapActions([
      'fetchClubPlayers',
    ]),

    ...mapMutations([
      'addPlayerToLineup',
      'removePlayerFromLineup',
      'addPlayerToOut',
      'addPlayerToIn',
    ]),
  },
};
</script>
