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
const genders = ["Female", "Male", "Other"];
function DataEntryModal({ open, onClose, onSubmit, initialData }) {
  const [dob, setDob] = useState(null);
  const [formData, setFormData] = React.useState({
    name: "",
    gender: "",
    category: "",
    mobile: "",
    dob: null,
    email: "",
    password: "",
    address: "",
    country: "",
    city: "",
  });

  React.useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setDob(dayjs(initialData?.dob));
    }
  }, [initialData]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleDateChange = (newValue) => {
    setFormData({ ...formData, dob: newValue ? newValue.toISOString() : "" });
  };

  const handleFormSubmit = () => {
    console.log(formData);
    onSubmit({ ...formData, dob: dayjs(dob) });
  };

  const inputStyle = {
    input: {
      color: "white",
    },
  };

  const dropdownField = (key, options) => (
    <FormControl fullWidth>
      <InputLabel>{key.charAt(0).toUpperCase() + key.slice(1)}</InputLabel>
      <Select
        label={key.charAt(0).toUpperCase() + key.slice(1)}
        name={key}
        value={formData[key]}
        onChange={handleChange}
        sx={inputStyle}
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
              {key === "category" ||
              key === "country" ||
              key === "city" ||
              key === "gender" ? (
                dropdownField(
                  key,
                  key === "category"
                    ? categories
                    : key === "country"
                    ? countries
                    : key === "gender"
                    ? genders
                    : cities
                )
              ) : key === "dob" ? (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Date of  Birth"
                      value={dob}
                      onChange={(newValue) => {
                        setDob(newValue);
                        handleDateChange(newValue);
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              ) : (
                <TextField
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
