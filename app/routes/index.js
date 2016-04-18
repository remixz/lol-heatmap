import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    gotoMap (match) {
      this.transitionTo('map', { queryParams: { match } })
    }
  }
});
