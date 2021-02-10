import { Mutation } from './types';

export default {
  /**
   * @name setClubPlayers
   * @param {object} state
   * @param {object} players
   */
  [Mutation.SET_CLUB_PLAYERS] (state, players) {
    state.allPlayers = players;
  },

  /**
   * @name addPlayerToLineup
   * @param {object} state
   * @param {object} player
   */
  [Mutation.ADD_PLAYER_TO_LINEUP] (state, player) {
    const playerIndex = state.allPlayers.findIndex(
      (selectedPlayer) => selectedPlayer.id === player.id,
    );

    state.selectedPlayers.push(player);
    state.allPlayers.splice(playerIndex, 1);
  },

  /**
   * @name removePlayerFromLineup
   * @param {object} state
   * @param {object} player
   */
  [Mutation.REMOVE_PLAYER_FROM_LINEUP] (state, player) {
    const playerIndex = state.selectedPlayers.findIndex(
      (selectedPlayer) => selectedPlayer.id === player.id,
    );

    state.selectedPlayers.splice(playerIndex, 1);
    state.allPlayers.unshift(player);
  },

  /**
   * @name addPlayerToOut
   * @param {object} state
   * @param {string} playerName
   */
  [Mutation.ADD_PLAYER_TO_OUT] (state, playerName) {
    state.outPlayer = playerName;
  },

  /**
   * @name addPlayerToIn
   * @param {object} state
   * @param {string} playerName
   */
  [Mutation.ADD_PLAYER_TO_IN] (state, playerName) {
    state.inPlayer = playerName;
  },
};
