// Filtering of projects by the sidebar / tab facets, done on the client.
//
// The API already returns the full project list with every facet on each project,
// so filtering locally is instant and lets the sidebar show how many works each
// option would give. Semantics match the API: options of one facet are OR-ed,
// different facets are AND-ed.

export const FACETS = [
  "direction",
  "scope",
  "type",
  "program",
  "format",
  "client",
  "tag",
  "executor",
];

// Where each facet lives on a project.
const PROJECT_FIELD = { tag: "tags" };

// "?scope[0]=34&type[0]=5&utm_source=x" -> { scope: [34], type: [5] }
export function parseFilterQuery(search) {
  const result = {};
  new URLSearchParams(search || "").forEach((value, rawKey) => {
    const key = rawKey.replace(/\[[^\]]*\]/g, "");
    const id = Number(value);
    if (!FACETS.includes(key) || !Number.isFinite(id)) return;
    if (!result[key]) result[key] = [];
    if (!result[key].includes(id)) result[key].push(id);
  });
  return result;
}

// { scope: [34], type: [5] } -> "?scope[0]=34&type[0]=5" (keys in FACETS order).
export function buildFilterQuery(filters) {
  const parts = [];
  FACETS.forEach((key) => {
    (filters[key] || []).forEach((id, index) => parts.push(`${key}[${index}]=${id}`));
  });
  return parts.length ? `?${parts.join("&")}` : "";
}

export function hasFilters(filters) {
  return Object.values(filters).some((ids) => ids && ids.length);
}

function projectFacetIds(project, key) {
  const value = project[PROJECT_FIELD[key] || key];
  if (!value) return [];
  return (Array.isArray(value) ? value : [value]).map((item) => item && item.id);
}

// Does the project pass every active facet, optionally ignoring one of them?
export function matchesFilters(project, filters, skipKey) {
  return Object.keys(filters).every((key) => {
    const ids = filters[key];
    if (key === skipKey || !ids || !ids.length) return true;
    const own = projectFacetIds(project, key);
    return ids.some((id) => own.includes(id));
  });
}

export function filterProjects(projects, filters) {
  return projects.filter((project) => matchesFilters(project, filters));
}

// For one facet: { optionId: number of projects it would give } with the other
// active facets applied (the usual faceted-search count).
export function facetCounts(projects, filters, key) {
  const counts = {};
  projects.forEach((project) => {
    if (!matchesFilters(project, filters, key)) return;
    new Set(projectFacetIds(project, key)).forEach((id) => {
      counts[id] = (counts[id] || 0) + 1;
    });
  });
  return counts;
}
