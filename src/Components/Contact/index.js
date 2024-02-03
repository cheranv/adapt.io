import React, { useState } from "react";
import ContactFilter from "./ContactSearch";
import ContactList from "./ContactList";
import SavedContacts from "./SavedContacts";

const Contact = () => {
  const [filterApplied, setFilterApplied] = useState([]);
  const [save, setSave] = useState(false);
  const handleFilterApplied = (value) => {
    setFilterApplied(value);
  };
  const saveSearches = () => {
    setSave(true);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
        backgroundColor: "#f7f7f7",
        height: "calc(100vh - 64px)",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "30vw",
          height: "-webkit-fill-available",
          backgroundColor: "#ffffff",
        }}
      >
        <ContactFilter
          handleFilterApplied={handleFilterApplied}
          filterApplied={filterApplied}
          saveSearches={saveSearches}
        />
      </div>

      {filterApplied.length ? (
        <ContactList
          filterApplied={filterApplied}
          handleFilterApplied={handleFilterApplied}
          save={save}
        />
      ) : (
        <SavedContacts />
      )}
    </div>
  );
};

export default Contact;
