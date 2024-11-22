import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ noMargin = false, variant="", onSearchChange }) {
  return (
    <TextField
      variant="outlined"
      placeholder="Search for events..."
      size="small"
      onChange={(event) => onSearchChange(event.target.value)}
      sx={{
        flexGrow: 1, // Ensures the search bar takes available space
        marginLeft: noMargin ? 0 : "16px",
        marginRight: noMargin ? 0 : "16px",
        minWidth: "150px",
        backgroundColor: "white",
        borderRadius: "24px",
        "& .MuiOutlinedInput-root": {
          borderRadius: "24px",
          "&:hover": {
            borderColor: "black",
          },
          "&.Mui-focused fieldset": {
            borderColor: "black",
          },
        },
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
