import { redirect } from "react-router-dom";
// import Cookies from "js-cookie";
export function auth() {
  const token = function getCookie(name) {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Check if this cookie is the one we're looking for
      if (cookie.startsWith(name + "=")) {
        // Extract and return the cookie value
        return cookie.substring(name.length + 1);
      }
    }
    // If the cookie is not found, return null or handle it as needed
    return null;
  };

  if (token) {
    return true;
  } else throw redirect("/start");
}
