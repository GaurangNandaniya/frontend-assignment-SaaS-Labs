import { useEffect, useState } from "react";
import { getData } from "./utils";
import { Spinner, Table } from "./components";
import classes from "./App.module.css";

const COLUMNS = [
  { key: "s.no", header: "S.No" },
  { key: "percentage.funded", header: "Percentage funded" },
  { key: "amt.pledged", header: "Amount pledged" },
];

const App = () => {
  const [showSpinner, setShowSpinner] = useState(true);
  const [showError, setShowError] = useState(false);
  const [projectsData, setProjectsData] = useState([]);

  useEffect(() => {
    //fetch data and store in state
    getData(
      //success callback
      (data) => {
        setShowSpinner(false);
        setProjectsData(data);
        console.log(data);
      },
      //error callback
      () => {
        setShowError(true);
      }
    );
  }, []);

  return (
    <div className={classes.container}>
      {showSpinner ? (
        <Spinner />
      ) : (
        <Table columns={COLUMNS} data={projectsData} />
      )}
      {showError && <h6>Opps... Something went wrong. Try again</h6>}
    </div>
  );
};

export default App;
