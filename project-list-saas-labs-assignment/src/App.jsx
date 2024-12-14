/**External */
import { useEffect, useMemo, useRef, useState } from "react";
/**relative */
import { getData } from "./utils";
import { ConfigDialogue, Spinner, Table } from "./components";
import { COLUMNS, PAGE_SIZE } from "./constants";
/**Styles */
import classes from "./App.module.css";

const App = () => {
  //Hooks
  const [showSpinner, setShowSpinner] = useState(true);
  const [showError, setShowError] = useState(false);
  const [projectsData, setProjectsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayColumns, setDisplayColumns] = useState(() => {
    return (
      //getting previously configure column from local storage
      JSON.parse(localStorage.getItem("selectedColumns")) || [
        //if not found from local storage then show below column by default
        "s.no",
        "title",
        "percentage.funded",
      ]
    );
  });

  const dialogueRef = useRef(null);

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

  //functions
  const openDialogue = () => {
    dialogueRef.current?.showModal();
  };

  const closeDialogue = () => {
    dialogueRef.current?.close();
  };

  const updateDisplayColumns = (columns) => {
    setDisplayColumns(columns);
  };

  const getColumnToDisplay = () => {
    return COLUMNS.filter((item) => displayColumns.includes(item.key));
  };

  //vars
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

  //components
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
          <div className={classes.tableHeaderContainer}>
            <h1>Highly-rated Kickstarter Projects </h1>{" "}
            <button className={classes.gearIcon} onClick={openDialogue}>
              ⚙
            </button>
          </div>
          <section className={classes.tableContainer}>
            <Table columns={getColumnToDisplay()} data={currentPageData} />
          </section>
          {<PageNumberComp />}
        </>
      )}
      {showError && (
        <h3 className={classes.errorText}>
          Opps... Something went wrong. Try again
        </h3>
      )}
      <dialog ref={dialogueRef} className={classes.dialogueContainer}>
        <ConfigDialogue
          closeDialogue={closeDialogue}
          updateDisplayColumns={updateDisplayColumns}
        />
      </dialog>
    </div>
  );
};

export default App;
