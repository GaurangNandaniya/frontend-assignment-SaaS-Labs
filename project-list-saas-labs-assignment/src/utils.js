export const getData = async (successCB, errorCB) => {
  let response = null;
  try {
    response = await fetch(
      "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
    );
    const responseJson = await response.json();
    if (successCB) successCB(responseJson);
  } catch (error) {
    console.log(error);
    if (errorCB) errorCB();
  }
  return response;
};
