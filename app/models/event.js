import DS from 'ember-data';

export default DS.Model.extend({
  gameId: DS.attr('string'),
  timestamp: DS.attr('number'),
  type: DS.attr('string'),
  playerId: DS.attr('number'),
  x: DS.attr('number', { defaultValue: -1 }),
  y: DS.attr('number', { defaultValue: -1 }),
  mapped: DS.attr('boolean', { defaultValue: false }),
  identity: DS.belongsTo('identity')
});
