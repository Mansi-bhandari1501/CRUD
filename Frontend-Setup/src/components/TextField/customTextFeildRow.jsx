import React from 'react';
import { Stack } from '@mui/material';
import CustomTextField from '../TextField/customTextFeild';

function CustomTextFieldRow({ control, name, label, required, inputProps, inputType, multiline, customStyles, disabled }) {
    return (
        <Stack sx={customStyles} width={"100%"}>
            <CustomTextField
                disabled={disabled}
                name={name}
                control={control}
                label={label}
                required={required}
                inputProps={inputProps}
                inputType={inputType}
                multiline={multiline}
            />
        </Stack>
    );
}

export default CustomTextFieldRow;
