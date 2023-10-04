import {
  Button,
  createTheme,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import DisplayContent from "../../Components/DisplayContent/DisplayContent";
import CustomPagination from "../../Components/CustomPagination/CustomPagination";
import "./Search.css";

// import CustomPagination from "./Search_Cust_Page"; //test

const Search = () => {
  const API_KEY = "8d53350309a57f11e0785de7397ebe7a";

  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [type, setType] = useState(0);

  // const [st,setst] = useState(0); //To delete  //test

  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${
          type ? "tv" : "movie"
        }?api_key=${API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );

      setContent(data.results);
      setNumOfPages(data.total_pages);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // setst(1); //test
    // setPage(1);  //test

    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type,page]);

  return (
    <div>
      {/* <span className="pageTitle">Search</span> */}

      {/* search feild and search button */}
      <ThemeProvider theme={darkTheme}>
        <div className="search" style={{ display: "flex", margin: "15px 0" }}>
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            onClick={fetchSearch}
            variant="contained"
            style={{ marginLeft: 10 }}
          >
            <SearchIcon fontSize="large" />
          </Button>
        </div>

        {/* movie and series search tab */}
        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: 5}}
          // aria-label="disabled tabs example"
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search Series" />
        </Tabs>

      </ThemeProvider>

      <div className="search_contents">
        {content &&
          content.map((c) => (
            <DisplayContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            ></DisplayContent>
          ))}

        {content.length === 0 &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>

      {/* pagination */}

      {numOfPages > 1 && (
        // <CustomPagination setPage={setPage} numOfPages={numOfPages} st={st} setst={setst}/>  //test
        <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
      )}
    </div>
  );
};

export default Search;
