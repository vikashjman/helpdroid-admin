import * as React from "react";
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

import {
  TimePicker,
  DatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// Sample data for dropdown fields
const states = ["Bihar", "Delhi", "Karnataka"];
const countries = ["USA", "Canada", "India"];
const cities = ["New York", "Toronto", "Mumbai"];

function DataEntryModal({ open, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = React.useState({
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    starttime: null,
    endtime: null,
  });

  React.useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: "",
        address: "",
        city: "",
        state: "",
        country: "",
        starttime: null,
        endtime: null,
      });
    }
  }, [initialData]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleTimeChange = (newValue, key) => {
    setFormData({ ...formData, [key]: newValue });
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid container spacing={2}>
            {Object.keys(formData).map((key) => (
              <Grid item xs={12} sm={6} key={key}>
                {key === "state" || key === "city" || key === "country" ? (
                  dropdownField(
                    key,
                    key === "state"
                      ? states
                      : key === "city"
                      ? cities
                      : countries
                  )
                ) : key === "starttime" || key === "endtime" ? (
                  <Grid item xs={12} sm={6} key={key}>
                    <TimePicker
                      label={key.charAt(0).toUpperCase() + key.slice(1)}
                      value={formData[key]}
                      onChange={(newValue) => handleTimeChange(newValue, key)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          sx={{ marginTop: "20px" }}
                        />
                      )}
                    />
                  </Grid>
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
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onSubmit}
          color="primary"
          sx={{ color: "white", backgroundColor: "blue" }}
        >
          Submit
        </Button>
        <Button
          onClick={onClose}
          color="primary"
          sx={{ color: "white", backgroundColor: "blue" }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default DataEntryModal;
