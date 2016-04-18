import Ember from 'ember';

export default Ember.Component.extend({
  match: '',
  actions: {
    submit () {
      this.sendAction('gotoMap', this.get('match'))
    }
  }
});
