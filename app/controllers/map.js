import Ember from 'ember';
import FileSaver from 'npm:filesaver.js'
import url from 'npm:url'

export default Ember.Controller.extend({
  queryParams: ['match'],
  match: null,
  selectedIdentities: [],
  isMapping: false,
  _updatedEvents: null, // dummy prop to trigger whenever updated events change

  mappedEvents: Ember.computed('_updatedEvents', function () {
    let identities = this.get('selectedIdentities')

    let events = identities.getEach('events')
    let results = [].concat(...events.map(ev => ev.filterBy('mapped', true)))

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

    updateEvents () {
      this.notifyPropertyChange('_updatedEvents')
    },

    toggleMapping () {
      this.toggleProperty('isMapping')
    }
  }
});
