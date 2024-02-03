import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import { MdOutlinePermContactCalendar } from "react-icons/md";
import { TbHomeSignal } from "react-icons/tb";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { IoIosArrowRoundForward } from "react-icons/io";
import { MdOutlinePersonOutline } from "react-icons/md";
import { wait } from "@testing-library/user-event/dist/utils";
import "./styles.css";

const TopNav = () => {
  const Navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const profileref = useRef(null);
  const [showuserdropdwn, setshowuserdropdown] = React.useState(false);

  const profiledropdownlist = [
    {
      icon: <FaHome />,
      name: "New Admin Home",
    },
    {
      icon: <FaHome />,
      name: " Admin Home",
    },
    {
      icon: <BsFillPersonCheckFill />,
      name: "Qualify user",
    },
    {
      icon: <TbHomeSignal />,
      name: "Custom Plan Management",
    },
    {
      icon: <MdOutlinePermContactCalendar />,
      name: "Manage Customers",
    },
    {
      icon: <FiCheckCircle />,
      name: "Suppression_lists",
    },
    {
      icon: <MdOutlinePersonOutline />,
      name: "Account & Billing",
    },
    {
      icon: <IoIosArrowRoundForward />,
      name: "Log out",
    },
  ];

  const handledropdown = (e) => {
    e.stopPropagation();
    setshowuserdropdown(!showuserdropdwn);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileref.current && !profileref.current.contains(event.target)) {
        if (showuserdropdwn === true) {
          setshowuserdropdown(false);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showuserdropdwn]);
  const path = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Contact Search",
      path: "/contact",
    },
  ];
  return (
    <>
      <div
        className="headerWrapper"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "rgba(250, 112, 200, 0.15)",
          height: "64px",
          padding: "0px 30px",
        }}
      >
        <div style={{ gap: "20px", display: "flex", alignItems: "center" }}>
          <a href="https://www.adapt.io" class="jsx-2795865956 logoWrapper">
            <img
              src="https://www.adapt.io/images/static/webp/logo.webp"
              alt="adaptLogoIcon"
              className="logo"
            />
          </a>
          {path.map(({ name, path }) => (
            <button
              key={name}
              style={{
                border: "none",
                backgroundColor: pathname === path ? "#f7f7f7" : "transparent",
                cursor: "pointer",
                height: "65px",
                marginTop: "6px",
                borderRadius: "5px",
                fontWeight: "bold",
                fontSize: "18px",
              }}
              onClick={() => Navigate(path)}
            >
              {name}
            </button>
          ))}
        </div>
        <div
          style={{
            border: "none",
            borderRadius: "50%",
            width: "28px",
            height: "28px",
            textAlign: "center",
            backgroundColor: "rgba(249, 112, 199, 1)",
            position: "relative",
            display: "block",
            fontWeight: "bold",
            lineHeight: "28px",
          }}
          onClick={handledropdown}
        >
          <span style={{ color: "white", cursor: "pointer" }}>L</span>
        </div>
        {showuserdropdwn && (
          <div className="logoutdropdown" ref={profileref}>
            <div
              style={{
                margin: 0,
                borderBottom: "0.5px solid #F7F7F7",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "5px 0px",
              }}
            >
              <CiMail />
              <span
                style={{
                  color: "#2c7be5",
                }}
              >
                sasiganth@adapt.io
              </span>
            </div>
            {profiledropdownlist.map((item) => (
              <div
                key={item.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "5px 0px",
                }}
              >
                <span>{item.icon}</span>
                <span style={{ textAlign: "left" }}>{item.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default TopNav;
