import Grid2 from '@mui/material/Grid2';
import Box from '@mui/material/Box';

import './LoginPageStyles.css';

const LoginPage = () => {
  return (
    <Box sx={{ flexGrow: 1}}>
      <Grid2 container spacing ={2} column={8}>
        <Grid2 size={6}>
          <h1>EventEcho</h1>
        </Grid2>
      </Grid2>
    </Box>
    
    
    // <Box sx={{ flexGrow: 1 }}>
    //   <Grid container spacing={2}>
    //     <Grid size={8}>
    //       <Item>size=8</Item>
    //     </Grid>
    //     <Grid size={4}>
    //       <Item>size=4</Item>
    //     </Grid>
    //     <Grid size={4}>
    //       <Item>size=4</Item>
    //     </Grid>
    //     <Grid size={8}>
    //       <Item>size=8</Item>
    //     </Grid>
    //   </Grid>
    // </Box>
  );
};

export default LoginPage;
