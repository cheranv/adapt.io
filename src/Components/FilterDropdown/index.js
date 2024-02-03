import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const FilterDropdown = (props) => {
  const { filterApplied = [], handleFilterApplied = () => {} } = props;
  const [showDropdown, setShowDropdown] = useState(false);
  const [filterSearch, setFilterSearch] = useState("");
  const [filterSelected, setFilterSelected] = useState([]);

  let data = props.records.reduce((a, b) => {
    if (!a.includes(b.level)) {
      a.push(b.level);
    }
    return a;
  }, []);

  const [filters, setFilters] = useState(data ?? []);

  const handleFilter = (value) => {
    let a = data.filter((row) =>
      row.toUpperCase().includes(value.toUpperCase())
    );

    setFilterSearch(value);
    if (value === "") setFilters(data);
    else setFilters(a);
  };

  const handleFilterSelection = (e, value) => {
    e.stopPropagation();
    let a = [...filterSelected];
    if (!a.includes(value)) a.push(value);
    else {
      a = filterSelected.filter((row) => row !== value);
    }
    setFilterSelected(a);
  };

  const ApplyFilter = () => {
    handleFilterApplied(filterSelected);
  };

  useEffect(() => {
    if (filterApplied !== undefined) {
      setFilterSelected(filterApplied ?? []);
    }
  }, [filterApplied]);

  return (
    <>
      <div
        style={{
          borderBottom: "1px solid #f7f7f7",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          padding: "0px 5px",
        }}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <input
          readOnly
          placeholder="Level"
          value={"Level"}
          style={{
            border: "none",
            outline: "none",
            fontSize: "16px",
            height: "32px",
            position: "relative",
            cursor: "pointer",
            color: "#7a7a7a",
          }}
        />
        {filterApplied.length ? (
          <span
            style={{
              color: "#ffffff",
              backgroundColor: "#28a745",
              width: "20px",
              height: "20px",
              lineHeight: "20px",
              borderRadius: "50%",
            }}
          >
            {filterApplied.length}
          </span>
        ) : (
          <IoIosArrowDown
            style={{
              height: "20px",
              width: "20px",
              color: "#7a7a7a",
            }}
          />
        )}
      </div>

      {showDropdown && (
        <div
          style={{
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "5px",
          }}
        >
          <div
            style={{
              display: "block",
              padding: "10px",
              borderBottom: "1px solid #f7f7f7",
            }}
          >
            <input
              value={filterSearch}
              placeholder="Filter Level"
              onChange={(e) => handleFilter(e.target.value)}
              style={{
                border: "1px solid #2c7be5",
                width: "-webkit-fill-available",
                outline: "none",
                height: "20px",
                borderRadius: "6px",
                padding: "8px",
              }}
            />
          </div>
          <div
            style={{
              height: "200px",
              overflowY: "scroll",
              padding: "5px",
              color: "#7a7a7a",
            }}
          >
            {filters.length > 0 &&
              filters.map((filter) => {
                return (
                  <div
                    key={filter}
                    style={{
                      width: "-webkit-fill-available",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex start",
                      gap: "20px",
                      padding: "10px 0px",
                    }}
                    onClick={(e) => handleFilterSelection(e, filter)}
                  >
                    <input
                      type="checkbox"
                      checked={filterSelected.includes(filter)}
                    />
                    <span style={{ margin: "0px", fontSize: "16px" }}>
                      {filter}
                    </span>
                  </div>
                );
              })}
          </div>
          <button
            type="button"
            style={{
              width: "-webkit-fill-available",
              padding: "10px",
              backgroundColor: "#28a745",
              color: "#ffffff",
              border: "none",
              outline: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
            onClick={(e) => ApplyFilter(e)}
          >
            Apply
          </button>
        </div>
      )}
    </>
  );
};

export default FilterDropdown;
