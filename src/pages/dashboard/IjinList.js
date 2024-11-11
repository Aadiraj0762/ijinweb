import {
    Card, CardContent, CardMedia,
    Grid,
    Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSnackbar } from '../../components/snackbar';
import { deleteIjin, getAllIjins } from '../../controller/ijinController'; // Updated import

const PropertyTable = () => {
    const [ijins, setIjins] = useState([]);
    const [selectedIjins, setSelectedIjins] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [isFiltered, setIsFiltered] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [selectedIjinId, setSelectedIjinId] = useState(null);

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ijinsData = await getAllIjins(); // Fetching IJINs
                setIjins(ijinsData);
            } catch (error) {
                console.error('Error fetching IJINs:', error);
                enqueueSnackbar('Error fetching IJINs', { variant: 'error' });
            }
        };

        fetchData();
    }, [enqueueSnackbar]);

    const handleCheckboxChange = (ijinId) => {
        if (ijinId === 'all') {
            if (selectedIjins.length === ijins.length) {
                setSelectedIjins([]);
            } else {
                setSelectedIjins(ijins.map((ijin) => ijin.id));
            }
            return;
        }

        const selectedIndex = selectedIjins.indexOf(ijinId);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedIjins, ijinId);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selectedIjins.slice(1));
        } else if (selectedIndex === selectedIjins.length - 1) {
            newSelected = newSelected.concat(selectedIjins.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selectedIjins.slice(0, selectedIndex),
                selectedIjins.slice(selectedIndex + 1)
            );
        }

        setSelectedIjins(newSelected);
    };

    const isSelected = (ijinId) => selectedIjins.indexOf(ijinId) !== -1;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenConfirm = (ijinId) => {
        setSelectedIjinId(ijinId);
        setOpenConfirm(true);
    };

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
        setSelectedIjinId(null);
    };

    const handleDeleteIjins = async () => {
        if (selectedIjinId) {
            try {
                await deleteIjin(selectedIjinId); // Deleting IJIN
                enqueueSnackbar('IJIN deleted successfully', { variant: 'success' });

                setIjins(ijins.filter(ijin => ijin.id !== selectedIjinId));
                handleCloseConfirm();
            } catch (error) {
                console.error('Error deleting IJIN:', error);
                enqueueSnackbar('Error deleting IJIN', { variant: 'error' });
            }
        } else {
            enqueueSnackbar('No IJIN selected for deletion', { variant: 'warning' });
        }
    };

    const handleViewRow = (id) => {
        navigate(`/dashboard/ijins/${id}`); // Navigating to IJIN details
    };

    const filteredIjins = ijins.filter((ijin) => {
        let isValid = true;
        let ijinDate = ijin.date; // Assuming ijin.date is a Firestore timestamp object

        if (ijinDate instanceof Date) {
            // Already a Date object
        } else if (ijinDate && typeof ijinDate.toDate === 'function') {
            // Convert Firestore Timestamp to Date
            ijinDate = ijinDate.toDate();
        } else {
            ijinDate = new Date(ijinDate);
        }

        if (fromDate) {
            isValid = isValid && ijinDate >= new Date(fromDate);
        }

        if (toDate) {
            isValid = isValid && ijinDate <= new Date(toDate);
        }

        return isValid;
    });

    const formatDate = (date) => {
        if (!date) return 'Invalid Date';

        let validDate = date;

        if (date instanceof Date) {
            validDate = date;
        } else if (date && typeof date.toDate === 'function') {
            validDate = date.toDate();  // For Firestore Timestamp to Date conversion
        } else {
            validDate = new Date(date);
        }

        return Number.isNaN(validDate) ? 'Invalid Date' : validDate.toLocaleDateString();
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Approve':
                return 'rgb(59, 130, 246)';
            case 'Reject':
                return 'rgb(202, 138, 4)';
            case 'Disabled':
                return 'red';
            default:
                return 'black'; // Default color if status is not recognized
        }
    };

    return (
        <Grid container spacing={3} style={{ padding: '2%', marginLeft: '10%', width: '85%' }}>
            {filteredIjins.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((ijin) => (
 <Grid item xs={12} sm={6} md={6} key={ijin.id}>
            <Card sx={{ minHeight: 200, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between' }}>
                <Grid container>
                    {/* Image on the left for medium and larger screens */}
                    <Grid item xs={12} md={5}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={ijin.coverImage} // Replace with actual image source from API
                            alt={ijin.title}
                            sx={{ objectFit: 'cover', height: { xs: 'auto', md: '100%' }, width: '100%' }}
                        />
                    </Grid>

                    {/* Content on the right for larger screens, below image for smaller screens */}
                    <Grid item xs={12} md={7}>
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" component="div">
                                {ijin.title} {/* Display the title */}
                            </Typography>

                            <Grid container spacing={2} style={{ marginTop: '10px' }}>
                                <Grid item xs={6}>
                                    <Typography variant="body2" color="text.secondary">
                                        E-ISSN: {ijin.eIssn} {/* Display the E-ISSN */}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2" color="text.secondary">
                                        P-ISSN: {ijin.pIssn} {/* Display the P-ISSN */}
                                    </Typography>
                                </Grid>

                                <Grid item xs={6}>
                                    <Typography variant="body2" color="text.secondary">
                                        Email: {ijin.email} {/* Display the email */}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2" color="text.secondary">
                                        Licence: {ijin.licence} {/* Display the licence */}
                                    </Typography>
                                </Grid>

                                <Grid item xs={6}>
                                    <Typography variant="body2" color="text.secondary">
                                        Since: {ijin.since} {/* Display the since year */}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2" color="text.secondary">
                                        Value: {ijin.value} {/* Display the value */}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
            ))}
        </Grid>
    );
};

export default PropertyTable;
