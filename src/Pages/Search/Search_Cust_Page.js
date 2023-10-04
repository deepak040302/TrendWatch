import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import { createTheme, ThemeProvider } from "@material-ui/core";

const darkTheme = createTheme({
  palette: {
    type: "dark",
  },
});

export default function CustomPagination({
  setPage,
  numOfPages = 50,
  st,
  setst,
}) {
  // Scroll to top when page changes
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  function fun_do() {
    handlePageChange(1);
    setst(0);
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
      }}
    >
      {
      // eslint-disable-next-line
      st === 0 ? (
        <ThemeProvider theme={darkTheme}>
          <Pagination
            onChange={(e) => handlePageChange(e.target.textContent)}
            count={numOfPages}
            color="secondary"
            hideNextButton
            hidePrevButton
          />
        </ThemeProvider>
      ) : (
        fun_do()
      )}
    </div>
  );
}
