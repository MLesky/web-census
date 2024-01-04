import { Close } from "@mui/icons-material";
import { Typography, Button, Modal, Paper, Stack, IconButton } from "@mui/material";
import { useTheme } from "@mui/system";
import { useState } from "react";
import { DateOfBirth, NumberOfChildren, PersonalInfo } from "../pages";

const RegisterUserForm = ({open, handleClose}) => {
  const [user, setUser] = useState({
    dateOfBirth: "",
    firstName: "",
    secondName: "",
    surname: "",
    gender: "",
    placeOfBirth: "",
    subDivision: "",
    town: "",
    malesAbove21: 0,
    femalesAbove21: 0,
    malesBelow21: 0,
    femalesBelow21: 0,
  });

  const [errors, setErrors] = useState({
    dateOfBirth: "",
    firstName: "",
    secondName: "",
    surname: "",
    gender: "",
    placeOfBirth: "",
    subDivision: "",
    town: "",
  });

  const theme = useTheme()

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
        xs: '100%',
        sm: 400,
        md: 800,
    },
    backgroundColor: theme.palette.background.default,
    boxShadow: 24,
    p: 4,
    maxHeight: '90vh',
    overflow: 'auto',
  };

  // console.log('close', handleClose, typeof(handleClose))

  return (
    <Modal
      open={open}
    //   onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
        <Paper elevation={20}  sx={style}>
          <Stack direction='column' spacing={2}>
          <Stack direction='row' justifyContent='space-between'>
          <Typography color={theme.palette.mode === 'dark' ? 'primary' : 'secondary'} my={1} variant='h5'>Register New Person</Typography>
          <IconButton onClick={handleClose}><Close sx={{color: 'white'}} /></IconButton>
          </Stack>
          <Stack direction={{ xs: 'column', md: 'row' }} gap={2}>
            <Stack direction="column" gap={2}>
              <DateOfBirth
                user={user}
                errors={errors}
                setUser={setUser}
                showText={false}
              />
              <NumberOfChildren
                user={user}
                setUser={setUser}
                showText={false}
              />
            </Stack>
            <PersonalInfo
              user={user}
              errors={errors}
              setUser={setUser}
              showText={false}
            />
          </Stack>
          <Button variant='contained' sx={{color: 'white'}}>Register</Button>
          </Stack>
        </Paper>
    </Modal>
  );
};

export default RegisterUserForm;
