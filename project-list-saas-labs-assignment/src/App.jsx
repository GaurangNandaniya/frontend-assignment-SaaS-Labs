import { useEffect, useMemo, useState } from "react";
import { getData } from "./utils";
import { Spinner, Table } from "./components";
import classes from "./App.module.css";
import { COLUMNS, PAGE_SIZE } from "./constants";

const App = () => {
  const [showSpinner, setShowSpinner] = useState(true);
  const [showError, setShowError] = useState(false);
  const [projectsData, setProjectsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    //fetch data and store in state
    getData(
      //success callback
      (data) => {
        setShowSpinner(false);
        setProjectsData(data);
      },
      //error callback
      () => {
        setShowError(true);
      }
    );
  }, []);

  const currentPageData = useMemo(() => {
    const pageStartIndex = (currentPage - 1) * PAGE_SIZE;
    const totalProjectData = projectsData?.length;

    const pageData = [];
    for (
      let index = 0;
      index < Math.min(PAGE_SIZE, totalProjectData - pageStartIndex);
      index++
    ) {
      //Pushing page data to array
      pageData.push(projectsData[pageStartIndex + index]);
    }
    return pageData;
  }, [currentPage, projectsData]);

  const totalPage = Math.ceil(projectsData?.length / PAGE_SIZE) || 0;

  const PageNumberComp = () => {
    const pages = [];
    for (let index = 0; index < totalPage; index++) {
      const isActive = index + 1 == currentPage;
      pages.push(
        <button
          key={index}
          className={`${classes.pageItem} ${
            isActive ? classes.pageItemActive : ""
          }`}
          onClick={() => {
            setCurrentPage(index + 1);
          }}
        >
          {index + 1}
        </button>
      );
    }

    return <div className={classes.pageNumberContainer}>{pages} </div>;
  };

  return (
    <div className={classes.container}>
      {showSpinner ? (
        <Spinner />
      ) : (
        <>
          <h1>Highly-rated Kickstarter Projects </h1>
          <section className={classes.tableContainer}>
            <Table columns={COLUMNS} data={currentPageData} />
          </section>
          {<PageNumberComp />}
        </>
      )}
      {showError && (
        <h3 className={classes.errorText}>
          Opps... Something went wrong. Try again
        </h3>
      )}
    </div>
  );
};

export default App;
