import React from "react";
import { FormControl, InputLabel, Input } from "@mui/material";

interface FormFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    type: string;
}

const FormField: React.FC<FormFieldProps> = ({
    label,
    value,
    onChange,
    type,
}) => {
    return (
        <FormControl fullWidth margin="normal" variant="outlined" required>
            <InputLabel htmlFor={label}>{label}</InputLabel>
            <Input
                id={label}
                type={type}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                required
            />
        </FormControl>
    );
};

export default FormField;
