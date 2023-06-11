import "./Root.css";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";

function Root() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Root;
