import React, { useEffect, useState } from "react";
import "./styles.css";
const SavedContacts = () => {
  const [savedContacts, setSavedContacts] = useState([]);
  const [allShown, setAllShown] = useState(false);
  const savedsearches = JSON.parse(localStorage.getItem("savedContacts"));
  useEffect(() => {
    if (localStorage.getItem("savedContacts")) {
      setSavedContacts(
        JSON.parse(localStorage.getItem("savedContacts")).slice(0, 3)
      );
    }
  }, []);
  return (
    <div className="width-fill ">
      <div style={{ width: "37vw" }} className="m-auto">
        <p className="grey m-t-b-20">
          Provider your search criteria and find your contacts from over 200M+
          business contacts
        </p>
        <h4>Recently Saved Searches</h4>
        <div className="background-white centered_space p-b-20 h-400 border-radius">
          <div className="flex-box p-tb-10-lr-20 grey   table_header">
            <span>Name</span>
            <span>created date</span>
          </div>
          <div className="list_block h-350">
            {savedContacts.length > 0 ? (
              savedContacts.map((contact) => {
                return (
                  <div
                    key={contact.searchName}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px",
                      borderBottom: "1px solid #f7f7f7",
                    }}
                  >
                    <span
                      className="ellipsis w-250 blue-color"
                      style={{ textAlign: "left" }}
                    >
                      {contact.searchName}
                    </span>
                    <span className="grey">{contact.created_date}</span>
                  </div>
                );
              })
            ) : (
              <p>No saved contacts</p>
            )}
          </div>
          {savedsearches && (
            <button
              className="m-t-b-20 show_button flex-box m-s-auto"
              onClick={() => {
                setSavedContacts(
                  JSON.parse(localStorage.getItem("savedContacts"))
                );
                setAllShown(true);
              }}
              style={{ display: allShown ? "none" : "flex" }}
            >
              show all{" "}
              {JSON.parse(localStorage.getItem("savedContacts")).length} saved
              searches
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedContacts;
