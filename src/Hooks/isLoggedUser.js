export function isLoggedUser() {
  const AUTH_TOKEN = localStorage.getItem("X-AUTH-TOKEN");
  const ROLE = localStorage.getItem("ROLE");
  
  return AUTH_TOKEN !== null && ROLE !== null;
}