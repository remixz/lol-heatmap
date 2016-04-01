import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    match: {
      refreshModel: true
    }
  },

  setupController () {
    let match = this.controller.get('match')
    if (match.indexOf('#') === -1) {
      this.controller.set('match', match + window.location.hash)
    }
  },

  model (params) {
    if (params.match.indexOf('#') === -1) {
      params.match = params.match + window.location.hash
    }
    return Ember.RSVP.hash({
      identities: this.store.query('identity', params),
      events: this.store.query('event', params)
    })
  },

  afterModel (data) {
    data.identities.forEach(id => {
      let events = data.events.filterBy('playerId', id.get('playerId'))
      id.set('events', events)
    })
  }
});
