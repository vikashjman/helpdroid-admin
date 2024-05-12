import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DataEntryModal from "../../components/dialogPatient";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
const initialRows = [
  {
    id: 1,
    name: "John Doe",
    gender: "Male",
    category: "General",
    phone: "1234567890",
    dob: "1990-01-01",
    email: "john@example.com",
  },
  // Add more initial data as needed
];

export default function Patient() {
  const [rows, setRows] = React.useState(initialRows);
  const [openModal, setOpenModal] = React.useState(false);
  const [currentRow, setCurrentRow] = React.useState(null);

  const fetchDoctorsData = async () => {
    try {
      axios
        .post("https://my-flask-app-container-1-0.onrender.com/get-doctors", {
          role: "true",
        })
        .then((response) => {
          if (response.status === 200) {
            console.log(response, "");
            setRows(response?.data?.doctors); // Assuming the JSON response is structured as { doctors: [] }
          } else {
            toast.error("Error in fetching Doctors");
          }
        })
        .catch((err) => {
          console.log(err);
        }); // Replace with your actual API endpoint
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };
  useEffect(() => {
    fetchDoctorsData();
  }, []);
  const handleDelete = (id) => {
    axios
      .post("https://my-flask-app-container-1-0.onrender.com/delete-data", { id })
      .then((res) => {
        if (res.status === 200) {
          setRows(rows.filter((row) => row.id !== id));
          toast.success("Added successfully");
        } else toast.error("Failed to add");
      })
      .catch((err) => {
        toast.error("Failed to add");
      });
  };

  const handleOpenModal = (row) => {
    setCurrentRow(row);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentRow(null);
  };

  const handleSubmit = (data) => {
    data.role == "patient" ? (data.role = true) : (data.role = false);
    console.log(data);
    if (currentRow) {
      const { id, ...payload } = data;
      axios
        .post("https://my-flask-app-container-1-0.onrender.com/update-data", { id, data: payload })
        .then((res) => {
          if (res.status === 200) {
            setRows(rows.map((row) => (row.id === data.id ? data : row)));
            toast.success("Updated successfully");
          } else toast.error("Failed to update");
        })
        .catch((err) => {
          toast.error("Failed to update");
        });
    } else {
      axios
        .post("https://my-flask-app-container-1-0.onrender.com/register", data)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Added successfully");
            setRows([...rows, { ...data, id: rows.length + 1 }]);
          } else toast.error("Failed to add");
        })
        .catch((err) => {
          toast.error("Failed to add");
        });
    }
    handleCloseModal();
  };

  const columns = [
    { field: "name", headerName: "Name", width: 130 },
    { field: "gender", headerName: "Gender", width: 130 },
    { field: "category", headerName: "Category", width: 130 },
    { field: "mobile", headerName: "Phone", width: 130 },
    { field: "dob", headerName: "DOB", width: 110 },
    { field: "email", headerName: "Email", width: 200 },

    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleOpenModal(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        color="primary"
        onClick={() => handleOpenModal(null)}
        style={{ margin: 16 }}
      >
        Add New
      </Button>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
      {openModal && (
        <DataEntryModal
          open={openModal}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          initialData={currentRow}
          rolle="patient"
        />
      )}
    </div>
  );
}
