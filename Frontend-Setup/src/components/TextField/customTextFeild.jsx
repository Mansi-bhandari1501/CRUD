import React from 'react';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

function CustomTextField({ required, inputType = 'text', control, label, name, placeholder, inputProps, multiline = false, disabled }) {
    const helperTextValue = required ? "" : 'Optional';

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    disabled={disabled}
                    {...field}
                    value={String(field.value)}
                    label={label}
                    placeholder={placeholder}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    size="small"
                    multiline={multiline}
                    rows={multiline ? 5.9 : 1}
                    inputProps={{
                        ...inputProps,
                        type: inputType === 'number' ? 'tel' : inputType,
                    }}
                    sx={{
                        width: "100%",
                        m: 0,
                        "& .MuiInputBase-root": multiline ? {} : { height: "40px !important" },
                        "& .MuiOutlinedInput-root": {
                            "&.Mui-focused": {
                                "& fieldset": { borderColor: "#01579b", borderWidth: "2px" },
                            },
                        },
                        "& .MuiInputLabel-root": {
                            fontSize: "14px",
                            "&.Mui-focused": { color: "#01579b" },
                        },
                        "& .MuiOutlinedInput-notchedOutline legend": { fontSize: "10px" },
                    }}
                    error={!!error}
                    helperText={!!error ? error.message : helperTextValue}
                />
            )}
        />
    );
}

export default CustomTextField;
