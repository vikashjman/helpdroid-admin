import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DataEntryModal from "../../components/dataentrymodal";
const initialRows = [
  {
    id: 1,
    name: "John Doe",
    address: "hey",
    city: "1990-01-01",
    state: "Bihar",
    country: "India",
    startTime: null,
    endTime: null,
  },
  // Add more initial data as needed
];

export default function Address() {
  const [rows, setRows] = React.useState(initialRows);
  const [openModal, setOpenModal] = React.useState(false);
  const [currentRow, setCurrentRow] = React.useState(null);

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
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
    if (currentRow) {
      setRows(rows.map((row) => (row.id === data.id ? data : row)));
    } else {
      setRows([...rows, { ...data, id: rows.length + 1 }]);
    }
    handleCloseModal();
  };

  const columns = [
    { field: "name", headerName: "Name", width: 130 },
    { field: "address", headerName: "Address", width: 130 },
    { field: "city", headerName: "City", width: 130 },
    { field: "state", headerName: "State", width: 130 },
    { field: "country", headerName: "Country", width: 110 },
    { field: "starttime", headerName: "Start Time", width: 200 },
    { field: "endtime", headerName: "End Time", width: 200 },
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
          rolle="address"
        />
      )}
    </div>
  );
}
