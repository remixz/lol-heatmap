import Ember from 'ember';

function msToTime (s) {
  function addZ (n) {
    return (n < 10 ? '0' : '') + n;
  }

  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;

  return addZ(mins) + ':' + addZ(secs)
}

export default Ember.Component.extend({
  event: null,
  prettyTime: Ember.computed('event', function () {
    let event = this.get('event')

    return msToTime(event.get('timestamp'))
  })
});
