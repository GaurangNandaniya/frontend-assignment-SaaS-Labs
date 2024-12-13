import React from "react";
import PropTypes from "prop-types";
import classes from "./Table.module.css";

const ReusableTable = ({ columns, data }) => {
  return (
    <table className={classes.container}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} tabIndex={0}>
            {columns.map((column) => (
              <td key={column.key}>{row[column.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

ReusableTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      header: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ReusableTable;
