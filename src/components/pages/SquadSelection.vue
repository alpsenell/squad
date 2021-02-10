<template>
  <squad-selection
    :load-status="loadStatus"
    :all-players="allPlayers"
    :team-name="teamName"
    :selected-players="selectedPlayers"
    :substitute-players="substitutes"
    :is-lineup-at-maximum="isLineupAtMaximum"
    :is-subs-at-maximum="isSubsAtMaximum"
    @pickPlayer="addPlayerToLineup"
    @unpickPlayer="removePlayerFromLineup"
    @substituteAdded="substituteAdded">
  </squad-selection>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import SquadSelection from '../templates/SquadSelection.vue';
import { ClubIds, LineupSelectionValue, SubsSelectionValue } from '../../enums/CommonEnums';

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

    /**
     * @return {boolean}
     */
    isSubsAtMaximum () {
      return this.selectedPlayers.length === SubsSelectionValue;
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
      'addSubstitute',
    ]),

    /**
     * @param {string} inPlayer
     * @param {string} outPlayer
     * @param {string} substituteMinute
     */
    substituteAdded ({ inPlayer, outPlayer, substituteMinute }) {
      const inPlayerPurified = this.allPlayers.find(
        (player) => player.display_name === inPlayer,
      );
      const outPlayerPurified = this.selectedPlayers.find(
        (player) => player.display_name === outPlayer,
      );

      this.addSubstitute({
        inPlayer: inPlayerPurified,
        outPlayer: outPlayerPurified,
        substituteMinute,
      });
    },
  },
};
</script>
