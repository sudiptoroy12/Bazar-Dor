
import Image from "next/image";
import NavLinks from "./NavLinks";
import UserInfo from "./UserInfo";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className=" ">
      <Navbar/>
      <NavLinks />
    </header>
  );
};

export default Header;

