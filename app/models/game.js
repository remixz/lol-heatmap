import DS from 'ember-data';

export default DS.Model.extend({
  length: DS.attr('number'),
  teams: DS.hasMany('team')
});
