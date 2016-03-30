import DS from 'ember-data';
import Champions from '../static/champion'

export default DS.Serializer.extend({
  normalizeResponse (store, primaryModelClass, payload, id, requestType) {
    let result = {
      data: [],
      included: []
    }

    result.data = payload.participants.map((player, id) => ({
      type: 'identity',
      id: `${payload.platformId}/${payload.gameId}:${player.participantId}`,
      attributes: {
        name: payload.participantIdentities[id].player.summonerName,
        playerId: player.participantId,
        champion: Object.keys(Champions.data).find(ch => parseInt(Champions.data[ch].key, 10) === player.championId)
      },
      relationships: {
        team: {
          data: {
            type: 'team',
            id: `${payload.platformId}/${payload.gameId}:${player.teamId}`
          }
        }
      }
    }))

    result.included = payload.teams.map(team => ({
      type: 'team',
      id: `${payload.platformId}/${payload.gameId}:${team.teamId}`,
      attributes: {
        side: (team.teamId === 100 ? 'Blue' : 'Red'),
        winner: (team.win === 'Win')
      }
    }))

    return result
  }
});
