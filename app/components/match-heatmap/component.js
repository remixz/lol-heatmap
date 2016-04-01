import Ember from 'ember';
import heatmap from 'npm:heatmap.js'

export default Ember.Component.extend({
  heatmap: null,
  events: [],
  didInsertElement () {
    let instance = heatmap.create({
      container: this.$('.match-heatmap')[0]
    })
    this.set('heatmap', instance)
  },

  didUpdateAttrs () {
    let heatmap = this.get('heatmap')
    let events = this.get('events')

    let filtered = []
    let max = 1
    events.forEach(ev => {
      let x = ev.get('x')
      let y = ev.get('y')

      let dup = filtered.findIndex(ev => ev.x === x && ev.y === y)
      if (dup > -1) {
        filtered[dup].value = filtered[dup].value + 1
        max = Math.max(max, filtered[dup].value)
      } else {
        filtered.push({
          x, y,
          value: 1,
          radius: 30
        })
      }
    })

    // resets heatmap, and adds coords
    heatmap.setData({
      max,
      data: filtered
    })
  }
});
