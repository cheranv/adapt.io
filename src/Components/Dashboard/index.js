import React, { useEffect, useState } from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import "./styles.css";
const Dashboard = () => {
  const [savedContacts, setSavedContacts] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("savedContacts")) {
      setSavedContacts(JSON.parse(localStorage.getItem("savedContacts")));
    }
  }, []);
  return (
    <>
      <div className="workspace" style={{ justifyContent: "center" }}>
        <div style={{ display: "block" }}>
          <h1 style={{ margin: 0 }}>Search Across 200M+ Contacts</h1>
          <div className="dashboard_card">
            <p
              style={{
                color: "#2c7be5",
                margin: "0 0 15px 0",
                fontSize: "20px",
              }}
            >
              Saved searches
            </p>
            <div className="list_block">
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
                      <span className="ellipsis search_name">
                        {contact.searchName}
                      </span>
                      <MdOutlineArrowOutward
                        style={{ color: "#2c7be5", cursor: "pointer" }}
                      />
                    </div>
                  );
                })
              ) : (
                <p>No saved contacts</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
