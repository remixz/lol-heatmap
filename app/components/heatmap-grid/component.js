import Ember from 'ember';

export default Ember.Component.extend({
  size: null,
  sizeArray: Ember.computed('size', function () {
    let size = this.get('size')
    return new Array(parseInt(size, 10)).fill(0)
  }),

  didInsertElement () {
    this.$('td').on('click', e => {
      let $target = this.$(e.target)
      let row = $target.data('row') + 1
      let column = $target.data('column') + 1
      let width = $target.outerWidth()
      let height = $target.outerHeight()
      let x = Math.round(column * width - width/2)
      let y = Math.round(row * height - height/2)

      this.sendAction('placeWard', { x, y })
    })
  }
});
