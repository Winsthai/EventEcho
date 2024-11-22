import * as React from 'react';
import { Box } from '@mui/material';

export default function DesktopAddGuestsPage() {
  const onEditPage = location.pathname.includes("edit");
  console.log(onEditPage);

  return (
    <Box sx={{ margin: 10, zIndex: 2 }}>
      {/* add code here */}


      {/* can ignore this below for now I think */}
      {onEditPage ? <div>hello edit guest list page (edit)</div> : <div>hello add guest list page (create)</div>}
    </Box>

  );
};
