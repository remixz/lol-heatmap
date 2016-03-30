import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  side: DS.attr('string'),
  winner: DS.attr('boolean'),
  players: DS.hasMany('identity')
});
