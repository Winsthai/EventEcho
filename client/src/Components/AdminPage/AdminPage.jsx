import {
    Box,
    Stack,
    Button,
    useMediaQuery,
    Menu,
    MenuItem,
  } from "@mui/material";

const AdminPage = () => {
    const isMobile = useMediaQuery("(max-width:600px)");
    if (isMobile) {
        return (
            <Box>mobile</Box>
        );
        
    } else {
        return (
            <Box>desktop</Box>
        );
        
    }
}

export default AdminPage;