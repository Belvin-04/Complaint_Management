import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  sessionStorage.clear();
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
    window.location.reload();
  }, []);
};

export default Logout;
