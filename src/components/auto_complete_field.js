import React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete, Box, TextField } from '@mui/material';


const AutoCompleteInput = ({
  label,
  options,
  value,
  onChange,
  error,
  helperText,
  placeholder,
  variant,
  type,
  canInsert,
}) => {
  const handleInputChange = (newValue) => {
    onChange(newValue);
  };

  return (
    <Box>
      <Autocomplete
        freeSolo={canInsert}
        options={options}
        value={value}
        onChange={onChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            error={error}
            helperText={helperText}
            placeholder={placeholder}
            variant={variant}
            type={type}
            fullWidth
          />
        )}
      />
    </Box>
  );
};

AutoCompleteInput.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  placeholder: PropTypes.string,
  canInsert: PropTypes.bool,
};

export default AutoCompleteInput;