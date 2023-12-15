import { Button, Stack, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { AutoCompleteInput } from "../../components";

const PersonalInfo = ({
  index,
  user,
  errors,
  setIndex,
  setUser,
  setErrors,
}) => {

  const places = ["", "Nkwen", "Bafut", "Bali", "Babanki", "Kumbo"]

  return (
    <Stack sx={{ maxWidth: "600px" }} gap={2}>
      <Typography
        sx={{
          width: "100%",
          minWidth: "400px",
          marginTop: "10px",
        }}
      >
        Please fill in the fields.
      </Typography>
      <TextField
        label="First name"
        type="text"
        variant="standard"
        placeholder="Enter first name"
        value={user.firstName}
        helperText={errors.firstName}
        error={errors.firstName !== ""}
        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
      />
      <TextField
        label="Second name (Optional)"
        type="text"
        variant="standard"
        placeholder="Enter second name"
        value={user.secondName}
        // helperText={errors.secondName}
        // error={errors.secondName !== ""}
        onChange={(e) => setUser({ ...user, secondName: e.target.value })}
      />
      <TextField
        label="Surname"
        type="text"
        variant="standard"
        placeholder="Enter surname"
        value={user.surname}
        helperText={errors.surname}
        error={errors.surname !== ""}
        onChange={(e) => setUser({ ...user, surname: e.target.value })}
      />
      <AutoCompleteInput
        label="Gender"
        type="text"
        placeholder="Select Gender"
        options={["Male", "Female", "Other", ""]}
        value={user.gender}
        onChange={(e, value) => setUser({ ...user, gender: value })}
        freeSolo={false}
        variant="standard"
        error={errors.gender !== ""}
        helperText={errors.gender}
      />

      <AutoCompleteInput
        label="Place of birth"
        type="text"
        placeholder="Enter Place of birth"
        options={places}
        value={user.placeOfBirth}
        onChange={(e, value) => setUser({ ...user, placeOfBirth: value })}
        freeSolo={true}
        variant="standard"
        error={errors.placeOfBirth !== ""}
        helperText={errors.placeOfBirth}
      />

      <AutoCompleteInput
        label="Sub division"
        type="text"
        placeholder="Enter Subdivision"
        options={places}
        value={user.subDivision}
        onChange={(e, value) => setUser({ ...user, subDivision: value })}
        freeSolo={true}
        variant="standard"
        error={errors.subDivision !== ""}
        helperText={errors.subDivision}
      />

      <AutoCompleteInput
        label="Town/Village"
        type="text"
        placeholder="Enter town or village"
        options={places}
        value={user.town}
        onChange={(e, value) => setUser({ ...user, town: value })}
        freeSolo={true}
        variant="standard"
        error={errors.town !== ""}
        helperText={errors.town}
      />
    </Stack>
  );
};

export default PersonalInfo;
