import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    match: {
      refreshModel: true
    }
  },

  model (params) {
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
