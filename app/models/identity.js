import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  playerId: DS.attr('number'),
  champion: DS.attr('string'),
  events: DS.hasMany('event'),
  team: DS.belongsTo('team')
});
