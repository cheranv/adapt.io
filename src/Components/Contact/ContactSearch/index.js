import React from "react";
import FilterDropdown from "../../FilterDropdown";
import Records from "../../data.json";

const ContactFilter = (props) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          backgroundColor: "#ffffff",
          width: "100%",
          padding: "10px",
          height: "-webkit-fill-available",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <span
            style={{ textAlign: "left", fontWeight: "bold", fontSize: "22px" }}
          >
            Contacts Search
          </span>
          <button
            style={{
              border: "none",
              background: "none",
              color: "#2c7be5",
            }}
          >
            Save
          </button>
        </div>
        <FilterDropdown
          handleFilterApplied={props.handleFilterApplied}
          filterApplied={props.filterApplied}
          saveSearches={props.saveSearches}
          records={Records}
        />
      </div>
    </div>
  );
};

export default ContactFilter;
