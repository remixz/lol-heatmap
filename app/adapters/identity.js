import ApplicationAdapter from './application';
import url from 'npm:url'

const API_HOST = 'https://acs.leagueoflegends.com/v1/stats/game'
export default ApplicationAdapter.extend({
  query (store, type, opts) {
    let { match } = opts
    let { hash } = url.parse(match)
    let route = API_HOST + hash.split('#match-details')[1].split('?')[0] + '?gameHash=' + hash.split('?gameHash=')[1]

    return this._request({ url: route })
  }
});
