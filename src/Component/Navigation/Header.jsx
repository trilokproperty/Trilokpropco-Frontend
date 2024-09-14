import { FaRegHeart } from "react-icons/fa6";
import "./Navigation.css";
import { IoGitCompareOutline, IoMenu } from "react-icons/io5";
import { useEffect, useState } from "react";
import CompareDrawer from "../CompareDrawer/CompareDrawer";
import { Link } from "react-router-dom";

const Header = ({ isDefault = true }) => {
  const [compareCount, setCompareCount] = useState();
  const [favCount, setFavCount] = useState();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const menuLiMobile = (
    <ul
      tabIndex={0}
      className={`menu menu-sm dropdown-content ${
        isDefault ? "bg-base-100 text-black" : "bg-white text-black border"
      } rounded-box z-[1] mt-3 w-52 p-2 shadow ml-10`}
    >
      <li>
        <Link to="/properties">Property</Link>
      </li>
      <li>
        <Link to='/services'>Services</Link>
      </li>
      <li>
        <Link to="/blog">Blog</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
    </ul>
  );

  const menuLiLarge = (
    <ul className={`menu menu-horizontal px-1 ${isDefault ? "text-white" : "text-black"}`}>
      <li>
        <Link to="/properties">Property</Link>
      </li>
      <li>
        <Link to='/services'>Services</Link>
      </li>
      <li>
        <Link to="/blog">Blog</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
    </ul>
  );

  useEffect(() => {
    const compareList = JSON.parse(localStorage?.getItem("compareList")) || [];
    const favList = JSON.parse(localStorage?.getItem("favList")) || [];

    setCompareCount(compareList?.length);
    setFavCount(favList?.length);

    const handleCompareListUpdate = () => {
      const updatedCompareList = JSON.parse(localStorage.getItem("compareList")) || [];
      setCompareCount(updatedCompareList.length);
    };

    const handleFavListUpdate = () => {
      const updatedFavList = JSON.parse(localStorage.getItem("favList")) || [];
      setFavCount(updatedFavList.length);
    };

    window.addEventListener('compareListUpdated', handleCompareListUpdate);
    window.addEventListener('favListUpdated', handleFavListUpdate);

    return () => {
      window.removeEventListener('compareListUpdated', handleCompareListUpdate);
      window.removeEventListener('favListUpdated', handleFavListUpdate);
    };
  }, []);

  const toggleDrawer = () => {
    setIsDrawerVisible(!isDrawerVisible);
  };

  return (
    <div>
      <div className={`nav-section navbar`}
    style={isDefault? {
      background: 'rgba( 255, 255, 255, 0.25 )',
      boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
      backdropFilter: 'blur( 6px )',
      borderRadius: '20px',
      WebkitBackdropFilter: 'blur( 6px )',
      border: '1px solid rgba( 255, 255, 255, 0.18 )',
    }:{
    background:"#fff0",
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0px',
    }}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className={`btn btn-ghost lg:hidden text-[22px] menu-icon ${isDefault ? "text-white" : "text-black"}`}>
            <IoMenu />
          </div>
          {menuLiMobile}
        </div>

        <a href="/">
          <div className="md:w-[104px] lg:h-[50px] w-full navbar-start">
            <img
              src={isDefault ? "https://i.ibb.co/stKQtrJ/1000278004-1.webp" : "https://i.ibb.co/f1L99L9/18a006575c097b8b99494b75da063caf-removebg-preview-2.webp"}
              alt=""
              className="logo"
            />
          </div>
        </a>
      </div>

      <nav className="navbar-center navbar-end">
        <div className="hidden lg:flex">{menuLiLarge}</div>
      </nav>

      <div className="flex items-center md:gap-4 gap-3 navbar-end">
        <div
          onClick={toggleDrawer}
          className={`indicator border rounded-full p-1 lg:p-2 md:mr-3 cursor-pointer ${isDefault ? "text-white border-white" : "text-black border-black"} text-xl`}
        >
          <span className="indicator-item badge bg-[#046307] text-white border-0">
            {compareCount || 0}
          </span>
          <IoGitCompareOutline />
        </div>

        <Link to="/favourite">
          <div className={`indicator border rounded-full p-1 lg:p-2 ${isDefault ? "text-white border-white" : "text-black border-black"} text-xl lg:mr-0 mr-5`}>
            <span className="indicator-item badge bg-[#046307] text-white border-0">
              {favCount || 0}
            </span>
            <FaRegHeart />
          </div>
        </Link>
      </div>
    </div>

<CompareDrawer isVisible={isDrawerVisible} onClose={toggleDrawer} />
    </div>
  );
};

export default Header;
