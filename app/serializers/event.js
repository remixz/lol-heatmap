import DS from 'ember-data';

export default DS.Serializer.extend({
  normalizeResponse (store, primaryModelClass, payload, id, requestType) {
    let result = {
      data: []
    }

    let filteredEvents = [].concat(...payload.frames.map(
      frame => frame.events.filter(
        ev => ev.type === 'WARD_PLACED' && ev.wardType !== 'UNDEFINED' && ev.creatorId !== 0
      )
    ))

    result.data = filteredEvents.map(ev => ({
      type: 'event',
      id: `${payload.idPrefix}:${ev.creatorId}:${ev.timestamp}`,
      attributes: {
        gameId: payload.idPrefix,
        type: ev.wardType,
        timestamp: ev.timestamp,
        playerId: ev.creatorId
      }
    }))

    return result
  },

  pushPayload (store, payload) {
    let result = {
      data: []
    }

    result.data = JSON.parse(payload).map(ev => ({
      type: 'event',
      id: `${ev.gameId}:${ev.playerId}:${ev.timestamp}`,
      attributes: ev
    }))

    store.push(result)
  }
});
