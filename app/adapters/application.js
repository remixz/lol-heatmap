import Ember from 'ember';
import DS from 'ember-data';

export default DS.Adapter.extend({
  _request (opts) {
    let req = {
      url: 'https://cors-anywhere.herokuapp.com/' + opts.url,
      type: 'GET',
      dataType: 'json'
    }

    return new Ember.RSVP.Promise((resolve, reject) => {
      Ember.$.ajax(req).then((body, textStatus, xhr) => {
        if (opts.extend) {
          body = {...body, ...opts.extend}
        }
        Ember.run.join(null, resolve, body)
      }, err => {
        err.then = null
        Ember.run.join(null, reject, err)
      })
    })
  }
});
