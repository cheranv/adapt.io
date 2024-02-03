import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
// import SavedContacts from "../SavedContacts";
import Records from "../../data.json";
import { CiLocationOn } from "react-icons/ci";
import { AiFillLinkedin } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { GrPhone } from "react-icons/gr";
import ViewContacts from "./ViewContacts";
const ContactList = ({ filterApplied, handleFilterApplied, save }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [contactDetail, setContactDetail] = useState({});
  const [filteredContacts, setFilteredContacts] = useState([]);

  const encryptEmail = (email, openMail) => {
    if (openMail) {
      return email;
    }
    const [username, domain] = email.split("@");
    const encryptedUsername = username.replace(/./g, "*");
    return `${encryptedUsername}@${domain}`;
  };

  const handleFilterRemove = (e, filter) => {
    e.stopPropagation();
    let a = [...selectedFilters];
    a = a.filter((row) => row !== filter);
    handleFilterApplied(a);
  };

  useEffect(() => {
    setSelectedFilters(filterApplied);
    let d1 = [].concat(
      ...filterApplied.map((row) => {
        return Records.reduce((filteredRecords, record) => {
          if (record.level === row) {
            filteredRecords.push(record);
          }
          return filteredRecords;
        }, []);
      })
    );
    setFilteredContacts(d1 ?? []);
    return () => setSelectedFilters([]);
  }, [filterApplied]);

  useEffect(() => {
    if (save) {
      localStorage.setItem("savedContacts", JSON.stringify(filteredContacts));
    }
  }, [save]);

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

  const viewContact = (idx) => {
    setContactDetail(filteredContacts[idx]);
  };
  const contactList = (filteredContacts = []) => {
    return filteredContacts.map((filteredContact, idx) => {
      const {
        id = "",
        name = "",
        designation = "",
        email = "",
        percentage = "",
        openMail = false,
        address = "",
        contactType = "",
      } = filteredContact;
      return (
        <div
          key={id}
          style={{
            padding: "10px 10px 10px 30px",
            borderBottom: "1px solid #f7f7f7",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "20px",
            }}
          >
            <div style={{ display: "block", textAlign: "left", width: "22vw" }}>
              <div
                style={{
                  color: "#2c7be5",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                {name}
                {renderContactIcon(contactType)}
              </div>
              <div>{designation}</div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <CiLocationOn />
                <span
                  style={{
                    marginLeft: "5px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    lineHeight: "20px",
                    color: "#808080",
                  }}
                >
                  {address}
                </span>
              </div>
            </div>
            <div style={{ display: "block", textAlign: "left" }}>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  color: openMail ? "blue" : "#7a7a7a",
                  marginBottom: "15px",
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
                  {encryptEmail(email, openMail)}
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
                <GrPhone />+ ***_***_****
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
          <button
            style={{
              height: "32px",

              color: "#2c7be5",
              // padding: "5px 63px",
              width: "17.5%",
              borderRadius: "4px",
              border: "1px solid #c9d9f7",
              cursor: "pointer",
            }}
            onClick={() => viewContact(idx)}
          >
            View
          </button>
        </div>
      );
    });
  };

  return (
    <div
      style={{
        display: "block",
        margin: "20px",
        width: "-webkit-fill-available",
      }}
    >
      {filteredContacts.length >= 0 && (
        <>
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            {selectedFilters.map((filter) => {
              return (
                <button
                  key={filter}
                  style={{
                    border: "none",
                    padding: "7px 10px",
                    cursor: "pointer",
                    borderRadius: "8px",
                  }}
                  onClick={(e) => handleFilterRemove(e, filter)}
                >
                  {filter} <IoIosClose />
                </button>
              );
            })}
            <button
              style={{
                border: "none",
                padding: "7px 10px",
                cursor: "pointer",
                backgroundColor: "transparent",
                color: "#2c7be5",
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleFilterApplied([]);
              }}
            >
              Clear All
            </button>
          </div>
          <div
            style={{
              textAlign: "left",
              color: "blue",
              fontSize: "24px",
              fontWeight: "bold",
              padding: "10px 0px",
            }}
          >
            {filteredContacts.length} Contact
            {filteredContacts.length > 1 ? "s" : ""} Company
          </div>
        </>
      )}
      <div
        style={{
          display: "block",
          backgroundColor: "#ffffff",
          width: "-webkit-fill-available",
          height: "calc(100vh - 210px)",
          marginTop: "10px",
          borderRadius: "4px",
          overflowY: "scroll",
        }}
      >
        {contactList(filteredContacts)}
      </div>
      {contactDetail?.id && (
        <ViewContacts
          contactDetail={contactDetail}
          setContactDetail={setContactDetail}
        />
      )}
    </div>
  );
};

export default ContactList;
