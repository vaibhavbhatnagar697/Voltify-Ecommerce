import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./Misc/Header";

function App() {
  return (
    <>
      <ToastContainer />
      <Header />
      <Outlet />
    </>
  );
}
export default App;
