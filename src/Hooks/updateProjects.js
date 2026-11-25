import {getUrlData} from '@/Hooks/getUrlData'
import store from '@/store'

export function updateProjects() {
  const urlData = getUrlData();
  const categoryID = +localStorage.getItem('currentDirection');

  if (urlData) {
    console.log('getProjectsByFilters');
    store.dispatch('getProjectsByFilters', {query: urlData});
    localStorage.setItem('currentDirection', -1);
  
    return urlData.length ? urlData : 0;
  }
  
  if (categoryID === -1 || localStorage.getItem('currentDirection') === null) {
    console.log('getProjects'); 
    store.dispatch('getProjects');
    
  } else {
    console.log('getProjectsByCategoryID');
    store.dispatch('getProjectsByCategoryID', {categoryID});
  }

  return urlData.length ? urlData : 0;
}