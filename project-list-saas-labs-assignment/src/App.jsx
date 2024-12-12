import { useEffect, useState } from "react";
import { getData } from "./utils";
import { Spinner } from "./components";

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
    <div>
      {showSpinner && <Spinner />}
      {showError && <h6>Opps... Something went wrong. Try again</h6>}
    </div>
  );
};

export default App;
