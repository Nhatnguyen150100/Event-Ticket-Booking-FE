import { RouterProvider } from "react-router-dom";
import router from "./routers";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsMobile } from "./lib/reducer/generalSlice";

const DEFINE_MOBILE_SCREEN = 640;

function App() {
  const dispatch = useDispatch();

  function isMobile() {
    return window.innerWidth <= DEFINE_MOBILE_SCREEN;
  }

  useEffect(() => {
    dispatch(setIsMobile(isMobile()));
    
    const handleResize = () => {
      dispatch(setIsMobile(isMobile()));
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

