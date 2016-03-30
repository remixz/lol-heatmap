import Ember from 'ember';

export default Ember.Component.extend({
  size: null,
  sizeArray: Ember.computed('size', function () {
    let size = this.get('size')
    return new Array(parseInt(size, 10)).fill(0)
  })
});
