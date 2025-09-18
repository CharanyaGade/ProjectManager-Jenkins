const config = {
  DEV_API_URL: "http://localhost:1982/projectapi",
  TOMCAT_API_URL: "http://localhost:2030/springbootprojectapi/projectapi"
};

const API_URL =
  window.location.hostname === "localhost" && window.location.port === "5173"
    ? config.DEV_API_URL
    : config.TOMCAT_API_URL;

export default API_URL;