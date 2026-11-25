export function getUrlData() {
  const queryString = window.location.search;

  return queryString.length ? queryString : 0;
}