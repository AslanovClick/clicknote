import {getUrlData} from '@/Hooks/getUrlData'
import store from '@/store'
import {parseFilterQuery, filterProjects} from '@/Hooks/projectFilters'

// Shows the projects for the current URL filters. Filtering runs on the full list,
// which is loaded once; if that request fails, the server does the filtering.
export function updateProjects({ force } = {}) {
  const urlData = getUrlData();

  if (force || !store.state.allProjects) store.commit('setProjects', {});

  return store.dispatch('loadAllProjects', { force })
    .then((all) => {
      // The URL may have changed while the list was loading.
      store.commit('setProjects', filterProjects(all, parseFilterQuery(getUrlData() || '')));
    })
    .catch(() => {
      if (urlData) return store.dispatch('getProjectsByFilters', {query: urlData});
      return store.dispatch('getProjects');
    });
}
