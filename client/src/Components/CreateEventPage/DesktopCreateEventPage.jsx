import * as React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlaceIcon from '@mui/icons-material/Place';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CollectionsIcon from '@mui/icons-material/Collections';
import {
  AppBar, Toolbar, IconButton, Typography,
  FormControl, FormGroup, FormControlLabel, InputLabel,
  Select, MenuItem, InputAdornment, Switch,
  Box, TextField, Stack, Button, Stepper, Step, StepLabel
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const steps = ['Event Details', 'Invite Guests', 'Review and Post'];

export default function DesktopCreateEventPage() {
  return (
    <Box sx={{ margin: 10, zIndex: 2 }}>
      <div>hello create event page</div>
    </Box>

  );
};
