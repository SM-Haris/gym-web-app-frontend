import { ReactElement } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

interface Props {
  children?: ReactElement | null;
}

function LayoutView({ children }: Props): JSX.Element {
  return (
    <>
      <Navbar/>
      {children}
      <Footer/>
    </>
  );
};

export default LayoutView