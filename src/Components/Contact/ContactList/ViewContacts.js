import React, { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { AiFillLinkedin } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { GrPhone } from "react-icons/gr";
import { VscClose } from "react-icons/vsc";

const ViewContacts = (props) => {
  const { contactDetail = {}, setContactDetail = () => {} } = props;
  const {
    name = "",
    designation = "",
    email = "",
    percentage = "",
    phone = "",
    openMail = false,
    address = "",
    contactType = "",
  } = contactDetail;
  const [searchName, setSearchName] = useState("");

  const renderContactIcon = (contactType) => {
    switch (contactType) {
      case "linkedin":
        return <AiFillLinkedin />;
      case "twitter":
        return <FaSquareXTwitter style={{ color: "black" }} />;
      case "instagram":
        return <FaInstagramSquare style={{ color: "#fe7575" }} />;
      default:
        return null;
    }
  };

  const getDate = () => {
    let month_names = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let toDate = new Date();
    let incomingDay = toDate.getDate();
    let incomingMonth = toDate.getMonth();

    let incomingYear = toDate.getFullYear();
    if (incomingDay < 10) {
      incomingDay = "0" + incomingDay;
    }

    toDate =
      month_names[incomingMonth] + " " + incomingDay + ", " + incomingYear;
    return toDate;
  };

  const handleSave = () => {
    const created_date = getDate();
    const data = localStorage.getItem("savedContacts");
    if (data) {
      const contacts = JSON.parse(data);
      if (contacts.some((contact) => contact.id === contactDetail.id)) {
        setContactDetail({});
        alert("Contact already saved !!!");
        return;
      }
      contacts.push({ ...contactDetail, searchName, created_date });
      localStorage.setItem("savedContacts", JSON.stringify(contacts));
    } else {
      localStorage.setItem(
        "savedContacts",
        JSON.stringify([{ ...contactDetail, searchName, created_date }])
      );
    }
    setContactDetail({});
    alert("Contact saved successfully :)");
  };

  return (
    <>
      <div
        className="centerPopup"
        style={{
          height: "auto",
          minHeight: "300px",
          width: "300px",
          translate: "-150px -150px",
        }}
      >
        <div
          style={{
            margin: 0,
            padding: "10px 10px",
            color: "#2c7be5",
            fontSize: "20px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Contact Details
          <VscClose
            style={{
              float: "right",
              cursor: "pointer",
              width: "16px",
              height: "16px",
            }}
            onClick={() => setContactDetail({})}
          />
        </div>
        <div>
          <div style={{ display: "block", textAlign: "left", width: "300px" }}>
            <div
              style={{
                color: "#2c7be5",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "2px 10px",
              }}
            >
              {name}
              {renderContactIcon(contactType)}
            </div>
            <div
              style={{
                padding: "2px 10px",
              }}
            >
              {designation}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "2px 10px",
              }}
            >
              <CiLocationOn
                style={{
                  minWidth: "16px",
                }}
              />
              <span
                style={{
                  marginLeft: "5px",
                  color: "#808080",
                  padding: "2px 10px",
                }}
              >
                {address}
              </span>
            </div>
          </div>
          <div
            style={{ display: "block", textAlign: "left", padding: "2px 10px" }}
          >
            <div
              style={{
                display: "flex",
                gap: "10px",
                color: openMail ? "blue" : "#7a7a7a",
                marginBottom: "10px",
              }}
            >
              <span
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <MdOutlineMailOutline />
                {email}
              </span>

              <span
                style={{
                  borderRadius: "20px",
                  backgroundColor: "#28a745",
                  color: "rgb(255, 255, 255)",
                  padding: "0px 5px",
                  height: "25px",
                  lineHeight: "25px",
                }}
              >
                {percentage}
              </span>
            </div>
            <div
              style={{
                color: "#7a7a7a",
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <GrPhone /> {phone}
              <span
                style={{
                  backgroundColor: "#f2f2f2",
                  color: "#303030",
                  borderRadius: "4px",
                  padding: "0px 5px",
                  lineHeight: "20px",
                  fontSize: "12px",
                }}
              >
                Mobile
              </span>
            </div>
          </div>
        </div>
        <input
          value={searchName}
          placeholder="Enter Search Contact Name"
          onChange={(e) => {
            setSearchName(e.target.value);
          }}
          style={{
            border: "1px solid #2c7be5",
            width: "-webkit-fill-available",
            outline: "none",
            height: "20px",
            borderRadius: "6px",
            padding: "8px",
            marginTop: "15px",
          }}
        />
        <button
          type="button"
          style={{
            width: "150px",
            padding: "10px",
            backgroundColor: searchName === "" ? "rgb(161 161 161)" : "#28a745",
            color: "#ffffff",
            border: "none",
            outline: "none",
            borderRadius: "6px",
            cursor: searchName === "" ? "not-allowed" : "pointer",
            display: "flex",
            marginTop: "15px",
            justifyContent: "center",
          }}
          disabled={searchName === ""}
          onClick={handleSave}
        >
          Save Search
        </button>
      </div>
      <div className="overlay" onClick={() => setContactDetail({})}></div>
    </>
  );
};

export default ViewContacts;
