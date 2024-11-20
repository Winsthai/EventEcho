import * as React from 'react';
import { Box } from '@mui/material';

export default function DesktopReviewEventPage() {
  const onEditPage = location.pathname.includes("edit");
  console.log(onEditPage);

  return (
    <Box sx={{ margin: 10, zIndex: 2 }}>
      {/* add code here */}


      {/* can ignore this below for now I think */}
      {onEditPage ? <div>hello review event page (edit)</div> : <div>hello review event page (create)</div>}
    </Box>

  );
};
