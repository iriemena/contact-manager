import { TextField, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

function Search({ search, getSearch }) {
  const changeItem = (e) => {
    getSearch(e.target.value);
    console.log(e.target.value);
  };
  return (
    <TextField
      variant="outlined"
      value={search}
      size="small"
      onChange={changeItem}
      style={{ width: "35%" }}
      type="text"
      placeholder="Search..."
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default Search;
