import React from "react";
import { TextField } from "@material-ui/core";

const TextInput = ({ label, onChange, value, name, ...rest }) => (
  <TextField
    label={label}
    onChange={onChange}
    value={value}
    name={name}
    {...rest}
  />
);

export default TextInput;
