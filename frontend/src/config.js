export const BASE_IP =
  process.env.NODE_ENV === "production"
    ? window.location.host
    : process.env.REACT_APP_BASE_URL || window.location.host;
export const BASE_PROTOCOL =
  process.env.NODE_ENV === "production"
    ? window.location.protocol
    : process.env.REACT_APP_BASE_PROTOCOL || window.location.protocol;
export const BASE_URL = BASE_PROTOCOL + "//" + BASE_IP;
export const BASE_URL_API = BASE_URL + "/api";
