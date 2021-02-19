import { Redirect } from "react-router-dom";

function Logout(props) {
  localStorage.clear();
  return <Redirect to="/register/login" />;
}

export default Logout;
