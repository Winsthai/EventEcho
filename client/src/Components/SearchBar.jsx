import {TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
    return (
        <TextField
            variant="outlined"
            placeholder="Search for events..."
            size="small"
            sx={{
            flexGrow: 1, // Ensures the search bar takes available space
            marginLeft: "16px",
            marginRight: "16px",
            minWidth: "150px",
            maxWidth: "600px",
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