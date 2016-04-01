import Ember from 'ember';

export default Ember.Component.extend({
  match: '',
  actions: {
    submit () {
      this.attrs.gotoMap(this.get('match'))
    }
  }
});
