import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import React, { useState } from "react";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
// Sample data for the dropdown fields
const categories = ["OBC", "SC/ST", "General"];
const countries = ["USA", "Canada", "India"];
const cities = ["New York", "Toronto", "Mumbai"];
const roles = ["Doctor", "Patient", "Admin"];
const specializations = ["Cardiology", "Orthopedics", "Pediatrics"];
const genders = ["male", "female", "other"];
function DataEntryModal({ open, onClose, onSubmit, initialData }) {
  const [dob, setDob] = useState(null);
  const [formData, setFormData] = React.useState({
    name: "",
    gender: "",
    category: "",
    mobile: "",
    dob: "",
    email: "",
    password: "",
    role: "",
    specialization: "",
    experience: "", // Years of experience
    fees: "", // Fees
  });

  React.useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setDob(dayjs(initialData.dob));
    } else {
      setFormData({
        name: "",
        gender: "",
        category: "",
        phone: "",
        dob: null,
        email: "",
        password: "",
        role: "",
        specialization: "",
        experience: "",
        fees: "",
      });
    }
  }, [initialData]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleDateChange = (newValue) => {
    setFormData({ ...formData, dob: newValue ? newValue.toISOString() : "" });
  };

  const handleFormSubmit = () => {
    onSubmit({ ...formData, dob: dayjs(dob) });
  };

  const inputStyle = {
    input: {
      color: "white",
    },
  };

  const dropdownField = (key, options) => (
    <FormControl fullWidth sx={{ marginTop: "20px" }}>
      <InputLabel>{key.charAt(0).toUpperCase() + key.slice(1)}</InputLabel>
      <Select
        label={key.charAt(0).toUpperCase() + key.slice(1)}
        name={key}
        value={formData[key]}
        onChange={handleChange}
        sx={{ ...inputStyle }}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialData ? "Edit Entry" : "Add New Entry"}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {Object.keys(formData).map((key) => (
            <Grid item xs={12} sm={6} key={key}>
              {key === "role" ||
              key === "category" ||
              key === "specialization" ||
              key === "gender" ? (
                dropdownField(
                  key,
                  key === "category"
                    ? categories
                    : key === "specialization"
                    ? specializations
                    : key === "gender"
                    ? genders
                    : roles
                )
              ) : key === "dob" ? (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Date of  Birth"
                      value={dob}
                      onChange={(newValue) => {
                        handleDateChange(newValue);
                        setDob(newValue);
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              ) : (
                <TextField
                  sx={{ marginTop: "20px" }}
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  variant="outlined"
                  fullWidth
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  InputProps={inputStyle}
                />
              )}
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color="primary"
          sx={{ color: "white", backgroundColor: "blue" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleFormSubmit}
          color="primary"
          sx={{ color: "white", backgroundColor: "blue" }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DataEntryModal;
