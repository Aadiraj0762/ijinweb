import {
    Card, CardContent, CardMedia,
    Grid,
    Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSnackbar } from '../../components/snackbar';
import { deleteConference, getAllConferences } from '../../controller/articlesController';

const PropertyTable = () => {
    const [properties, setProperties] = useState([]);
    const [selectedProperties, setSelectedProperties] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [isFiltered, setIsFiltered] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [selectedPropertyId, setSelectedPropertyId] = useState(null);
    const [users, setUsers] = useState([]);
    const [openPopover, setOpenPopover] = useState(null);
    const [openPopover2, setOpenPopover2] = useState(null); const [selectedUserId, setSelectedUserId] = useState(null);

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const propertiesData = await getAllConferences();
                setProperties(propertiesData);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchData();
    }, []);

    const handleCheckboxChange = (propertyId) => {
        if (propertyId === 'all') {
            if (selectedProperties.length === properties.length) {
                setSelectedProperties([]);
            } else {
                setSelectedProperties(properties.map((property) => property.id));
            }
            return;
        }

        const selectedIndex = selectedProperties.indexOf(propertyId);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedProperties, propertyId);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selectedProperties.slice(1));
        } else if (selectedIndex === selectedProperties.length - 1) {
            newSelected = newSelected.concat(selectedProperties.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selectedProperties.slice(0, selectedIndex),
                selectedProperties.slice(selectedIndex + 1)
            );
        }

        setSelectedProperties(newSelected);
    };

    const isSelected = (propertyId) => selectedProperties.indexOf(propertyId) !== -1;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenConfirm = () => {
        setOpenConfirm(true);
    };

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };



    const handleOpenPopover = (event, userId) => {
        setSelectedUserId(userId);
        setOpenPopover(event.currentTarget);
    };
    const handleOpenPopover2 = (event, userId) => {
        setSelectedUserId(userId);
        setOpenPopover2(event.currentTarget);
    };
    const handleClosePopover = () => {
        setOpenPopover(null);
        setOpenPopover2(null);

    };
    const handleDeleteproperties = async () => {
        if (selectedPropertyId) {
            try {
                await deleteConference(selectedPropertyId);
                console.log("Property deleted successfully");
                enqueueSnackbar('Property deleted successfully', { variant: 'success' });

                setProperties(properties.filter(property => property.id !== selectedPropertyId));
                handleCloseConfirm();
            } catch (error) {
                console.error("Error deleting property:", error);
                enqueueSnackbar('Error deleting property', { variant: 'error' });
            }
        } else {
            console.error("No property ID selected for deletion");
            enqueueSnackbar('No property ID selected for deletion', { variant: 'warning' });
        }
    };

    const handleViewRow = (id) => {
        // navigate(PATH_DASHBOARD.conference.view(id));
        navigate(`/dashboard/conference/${id}`);

    };


    const filteredProperties = properties.filter((property) => {
        let isValid = true;
        let propertyDate = property.date; // Assuming property.date is a Firestore timestamp object

        if (propertyDate instanceof Date) {
            // Already a Date object
        } else if (propertyDate && typeof propertyDate.toDate === 'function') {
            // Convert Firestore Timestamp to Date
            propertyDate = propertyDate.toDate();
        } else {
            propertyDate = new Date(propertyDate);
        }

        if (fromDate) {
            isValid = isValid && propertyDate >= new Date(fromDate);
        }

        if (toDate) {
            isValid = isValid && propertyDate <= new Date(toDate);
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
        <>
<Grid container spacing={3} style={{ padding: '2%', marginLeft: '10%', width: '85%' }}>
    {filteredProperties.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((journal, index) => (
        <Grid item xs={12} sm={6} md={6} key={journal.id}>
            <Card sx={{  minHeight: 200, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between' }}>
                <Grid container>
                    {/* Image on the left for medium and larger screens */}
                    <Grid item xs={12} md={5}>
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://api-prod-minimal-v610.pages.dev/assets/images/cover/cover-4.webp" // Replace with actual image source
                            alt={journal.title}
                            sx={{ objectFit: 'cover', height: { xs: 'auto', md: '100%' }, width: '100%' }}
                        />
                    </Grid>

                    {/* Content on the right for larger screens, below image for smaller screens */}
                    <Grid item xs={12} md={7}>
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" component="div" onClick={() => handleViewRow(journal.id)}>
                                {journal.title}
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="body2" color="text.secondary">
                                        Organizer: {journal.organizer}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2" color="text.secondary">
                                        Venue: {journal.venue}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Typography variant="body2" color="text.secondary" style={{ marginTop: '10px' }}>
                                Date: {formatDate(journal.date)}
                            </Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    ))}
</Grid>


        </>
    );
};


export default PropertyTable;
