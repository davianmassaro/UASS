import { setToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();

  const login = () => {
    // DUMMY LOGIN (nanti ganti call API)
    setToken("dummy-jwt-token");
    nav("/dashboard");
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={login}>Login Dummy</button>
    </div>
  );
}
