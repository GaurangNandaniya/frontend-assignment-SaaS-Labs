/**External */
import React, { useState } from "react";
import PropTypes from "prop-types";
/**Relative */
import { COLUMNS } from "../../constants";
/**Styles */
import classes from "./ConfigDialogue.module.css";

const ConfigDialogue = (props) => {
  const { closeDialogue, updateDisplayColumns } = props;
  const [selectedColumns, setSelectedColumns] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("selectedColumns")) || [
        "s.no",
        "title",
        "percentage.funded",
      ]
    );
  });

  const handleCheckboxChange = (key) => {
    if (selectedColumns.includes(key)) {
      setSelectedColumns(selectedColumns.filter((item) => item != key));
    } else {
      setSelectedColumns([...selectedColumns, key]);
    }
  };

  const handleSave = () => {
    localStorage.setItem("selectedColumns", JSON.stringify(selectedColumns));
    updateDisplayColumns(selectedColumns);
    closeDialogue();
  };
  return (
    <>
      <header className={classes.dialogueHeader}>
        <h3>Available Columns</h3>
        <p>Select the columns you want to display in table</p>
      </header>
      <main className={classes.columnContainer}>
        <ul>
          {COLUMNS.map((column) => (
            <li key={column.key}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedColumns.includes(column.key)}
                  onChange={() => handleCheckboxChange(column.key)}
                />
                {column.header}
              </label>
            </li>
          ))}
        </ul>
      </main>
      <footer className={classes.buttonContainer}>
        <button className={classes.closeButton} onClick={closeDialogue}>
          Close
        </button>
        <button className={classes.saveButton} onClick={handleSave}>
          Save
        </button>
      </footer>
    </>
  );
};

ConfigDialogue.propTypes = {
  closeDialogue: PropTypes.func.isRequired,
  updateDisplayColumns: PropTypes.func.isRequired,
};

export default ConfigDialogue;
