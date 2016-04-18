import Ember from 'ember';
import FileSaver from 'npm:filesaver.js'
import url from 'npm:url'

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

export default Ember.Controller.extend({
  queryParams: ['match'],
  match: null,
  selectedIdentities: [],
  selectedRange: [0],
  isMapping: false,

  _updatedEvents: null, // dummy prop to trigger whenever updated events change

  gameLength: Ember.computed('model', function () {
    let length = this.get('model.identities').objectAt(0).get('team.game.length')

    return length
  }),
  gameLengthStart: Ember.computed('gameLength', function () {
    let length = this.get('gameLength')

    return [0, length]
  }),
  formattedLengths: Ember.computed('selectedRange', function () {
    let selectedRange = this.get('selectedRange')

    if (!selectedRange[1]) selectedRange[1] = this.get('gameLength')
    return [msToTime(selectedRange[0]), msToTime(selectedRange[1])]
  }),
  mappedEvents: Ember.computed('_updatedEvents', 'selectedRange', function () {
    let identities = this.get('selectedIdentities')
    let isMapping = this.get('isMapping')

    let events = identities.getEach('events')
    let results = [].concat(...events.map(ev => ev.filterBy('mapped', true)))

    if (!isMapping) {
      let selectedRange = this.get('selectedRange')

      if (!selectedRange[1]) selectedRange[1] = this.get('gameLength')
      results = results.filter(ev => {
        let timestamp = ev.get('timestamp')
        return timestamp >= selectedRange[0] && timestamp <= selectedRange[1]
      })
    }

    return results
  }),
  unmappedEvents: Ember.computed('_updatedEvents', function () {
    let identities = this.get('selectedIdentities')

    let events = identities.getEach('events')
    let results = [].concat(...events.map(ev => ev.filterBy('mapped', false)))

    return results.sortBy('timestamp')
  }),

  actions: {
    uploadJson (files) {
      let file = files[0]

      if (file.type !== 'application/json') {
        return alert('Error: Invalid file')
      }

      let reader = new FileReader()

      reader.onload = ev => {
        this.store.pushPayload('event', ev.target.result)
        this.notifyPropertyChange('_updatedEvents')
      }
      reader.readAsText(file)
    },

    downloadJson () {
      let events = this.get('model.events')
      let match = this.get('match')
      let { hash } = url.parse(match)

      let blob = new Blob([JSON.stringify(events.toArray())], { type: 'application/json;charset=utf-8' })
      let fileName = `${hash.split('#match-details/')[1].split('?')[0].replace('/', '-')}.json`
      FileSaver.saveAs(blob, fileName)
    },

    placeWard (coords) {
      let isMapping = this.get('isMapping')
      if (!isMapping) return false;

      let event = this.get('unmappedEvents').objectAt(0)

      event.setProperties({
        ...coords,
        mapped: true
      })

      this.notifyPropertyChange('_updatedEvents')

      if (this.get('unmappedEvents').length === 0) {
        this.set('isMapping', false)
      }
    },

    setRangeValue (val) {
      this.set('selectedRange', val)
    },

    updateEvents () {
      this.notifyPropertyChange('_updatedEvents')
    },

    toggleMapping () {
      this.toggleProperty('isMapping')
    }
  }
});
