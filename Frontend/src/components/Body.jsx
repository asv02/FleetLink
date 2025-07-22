import { Outlet } from "react-router";
import NavBar from "./NavBar";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const Body = () => {
  const Navigate = useNavigate()
    useEffect(() => 
    {
        Navigate('/vehicle/registration')
    }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Body;
