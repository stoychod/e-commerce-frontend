import "./Root.css";
import { Outlet } from "react-router-dom";
import MenuAppBar from "../../components/MenuAppBar/MenuAppBar";

function Root() {
  return (
    <>
      <MenuAppBar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Root;
