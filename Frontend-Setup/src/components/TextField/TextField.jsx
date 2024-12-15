import React from 'react';
import { FormGroup, FormLabel, InputBase } from '@mui/material';
import styles from "./TextField.module.css";

const TextField = ({ title, value, handleChange, labelProps, inputProps, placeholder }) => {
    return (
        <FormGroup>
            <FormLabel
                {...labelProps}
                className={styles.formLabel}
            >
                {title}
            </FormLabel>
            <InputBase
                {...inputProps}
                onChange={(e) => {
                    handleChange(e.target.value);
                }}
                value={value} 
                placeholder={placeholder || title}
                className={styles.inputBox}
            />
        </FormGroup>
    );
}

export default TextField;
