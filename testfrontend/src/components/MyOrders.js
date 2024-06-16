import React, { useState } from 'react';
import { Container, Typography, Button, Snackbar, Alert } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate, Link } from 'react-router-dom';

const MyOrders = () => {
    const navigate = useNavigate();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [orders, setOrders] = useState([
        { id: 1, orderNumber: '12345', date: '2023-06-01', products: 2, finalPrice: 40, status: 'Pending' },
        { id: 2, orderNumber: '12346', date: '2023-06-02', products: 3, finalPrice: 60, status: 'Completed' },
        { id: 3, orderNumber: '12347', date: '2023-06-03', products: 1, finalPrice: 20, status: 'Pending' },
    ]);

    const handleDeleteOrder = (id) => {
        // Simulate deletion
        const updatedOrders = orders.filter(order => order.id !== id);
        setOrders(updatedOrders);
        setSnackbarMessage('Order deleted successfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
    };

    const handleEditOrder = (id) => {
        navigate(`/edit-order/${id}`);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'orderNumber', headerName: 'Order #', width: 130 },
        { field: 'date', headerName: 'Date', width: 130 },
        { field: 'products', headerName: '# Products', width: 130 },
        { field: 'finalPrice', headerName: 'Final Price', width: 130 },
        { field: 'status', headerName: 'Status', width: 130 },
        {
            field: 'options',
            headerName: 'Options',
            width: 200,
            renderCell: (params) => (
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEditOrder(params.row.id)}
                        disabled={params.row.status === 'Completed'}
                        style={{ marginRight: '10px' }}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteOrder(params.row.id)}
                        disabled={params.row.status === 'Completed'}
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <Container>
            <Typography variant="h2" gutterBottom>My Orders</Typography>
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/add-order/:id"
                style={{ marginBottom: '20px' }}
            >
                Add New Order
            </Button>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={orders}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10]}
                    disableSelectionOnClick
                />
            </div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default MyOrders;
