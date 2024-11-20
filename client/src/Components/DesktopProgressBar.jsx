import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

const steps = ['Create a New Event', 'Invite Guests', 'Review and Post'];

// const DesktopProgressBar = () => {
export default function DesktopProgressBar() {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep = isLastStep() && !allStepsCompleted() ?
      steps.findIndex((step, i) => !(i in completed)) : activeStep + 1;
    setActiveStep(newActiveStep);
    navigateToStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
    navigateToStep(step);
  };

  const handleComplete = () => {
    setCompleted({
      ...completed,
      [activeStep]: true,
    });
    handleNext();
  };

  const navigateToStep = (step) => {
    if (location.pathname.includes("create")) {
      switch (step) {
        case 0:
          navigate("/createEvent");
          break;
        case 1:
          navigate("/createEvent/addGuests");
          break;
        default:
          navigate("/createEvent/reviewEvent");
      }
    }
    else {
      switch (step) {
        case 0:
          navigate("/editEvent/:id");
          break;
        case 1:
          navigate("/editEvent/:id/changeGuests");
          break;
        default:
          navigate("/editEvent/:id/reviewEvent");
      }
    }
  }

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        mt: 4,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Box sx={{ width: '80%' }}>
        <Stepper nonLinear activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>


        {/* Some logic */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {allStepsCompleted() ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                Should add info to the db and redirect back to user page
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  pb: 2,
                  position: 'fixed',
                  bottom: 0
                }}
              >
                <Button variant="contained" onClick={handleComplete}>
                  {completed[activeStep] ? 'Next' : (completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step')}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </Box>
    </Box>
  );
}