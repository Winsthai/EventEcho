<Box className="homeUpcomingEventBox"> 
    <Box className="homeUpcomingEventPhoto">temp</Box>
    <Stack className="homeUpcomingEventDetails">
        <Box className="homeEventDate" color="text.secondary"> Thursday, November 14 </Box>
        <Box className="homeEventName"> Football Game </Box>
        <Stack direction="row" alignItems="center" className="homeEventTime" color="text.secondary"> <AccessTimeIcon className="homeEventIconsMobile" sx={{fontSize:"1rem"}}/> 8:00 AM </Stack>
        <Stack direction="row" alignItems="center" className="homeEventLocation" color="text.secondary"> <LocationOnIcon className="homeEventIconsMobile" sx={{fontSize:"1rem"}}/>123 Stadium Rd, City </Stack>
    </Stack>
</Box>

<Box className="homeUpcomingEventBoxDesktop"> 
    <Box className="homeUpcomingEventPhoto">temp</Box>
    <Stack className="homeUpcomingEventDetailsDesktop" direction="row">
        <Box className="homeEventNameDesktop"> Football Game </Box>
        <Box className="homeEventDateDesktop" color="text.secondary"> <CalendarMonthIcon className="homeEventIconsDesktop" sx={{fontSize:"1em"}}/> Thursday, November 14 </Box>
        <Box className="homeEventTimeDesktop" color="text.secondary"> <AccessTimeIcon className="homeEventIconsDesktop" sx={{fontSize:"1em"}}/> 8:00 AM </Box>
        <Box className="homeEventLocationDesktop" color="text.secondary">  <LocationOnIcon className="homeEventIconsDesktop" sx={{fontSize:"1em"}}/> 123 Stadium Rd, City </Box>
        <Box>
        <Button 
            variant="contained" 
            sx={{borderRadius:"20px", height:"80%", backgroundColor:"#ff7474"}} 
        >
            Register 
        </Button>
        </Box>
    </Stack>
</Box>