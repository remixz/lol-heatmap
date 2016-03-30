import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    gotoMap (match) {
      this.transitionToRoute('map', { queryParams: { match } })
    }
  }
});
