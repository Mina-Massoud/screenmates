import { redirect } from "react-router-dom";
import Cookies from "js-cookie";

export function auth() {
  // Cookies.remove("token")
  // localStorage.clear();
  return true

  const token = Cookies.get("token");
  console.log(token);
  if (!token) {
    throw redirect("/start");
  }
  return null;
}
