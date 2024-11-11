import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSnackbar } from '../../components/snackbar';
import { deleteJournal, getByBrowseStatus } from '../../controller/propertiesController';
import { PATH_DASHBOARD } from '../../routes/paths';

const PropertyTableToolbar = (props) => {
  // The toolbar remains unchanged
  // ...
};

PropertyTableToolbar.propTypes = {
  // propTypes remain unchanged
};

const PropertyTable = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openPopover, setOpenPopover] = useState(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [openPopover2, setOpenPopover2] = useState(null);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [types, setTypes] = useState([]);
  const [featuredStatus, setFeaturedStatus] = useState();
  const [categories, setCategories] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch only indexed properties
        const propertiesData = await getByBrowseStatus('indexed');
        setProperties(propertiesData);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (propertyId) => {
    // Handle checkbox change logic
  };

  const isSelected = (propertyId) => selectedProperties.indexOf(propertyId) !== -1;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenConfirm = () => setOpenConfirm(true);

  const handleCloseConfirm = () => setOpenConfirm(false);

  const handleOpenPopover = (event, propertyId) => {
    setSelectedPropertyId(propertyId);
    setOpenPopover(event.currentTarget);
  };

  const handleOpenPopover2 = (event, propertyId) => {
    setSelectedPropertyId(propertyId);
    setOpenPopover2(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
    setOpenPopover2(null);
  };

  const handleDeleteProperties = async () => {
    if (selectedPropertyId) {
      try {
        await deleteJournal(selectedPropertyId);
        console.log("Property deleted successfully");
        enqueueSnackbar('Property deleted successfully', { variant: 'success' });

        // Handle additional logic after successful deletion
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

  const handleViewRow = (id) => navigate(`/dashboard/journal/${id}`);

  const handleEditRow = (id) => navigate(PATH_DASHBOARD.eCommerce.edit(id));

  const handleFilterFromDate = (date) => {
    setFromDate(date);
    setIsFiltered(true);
  };

  const handleFilterToDate = (date) => {
    setToDate(date);
    setIsFiltered(true);
  };

  const handleFilterCategory = (event) => {
    setCategory(event.target.value);
    setIsFiltered(true);
  };

  const handleFilterTypes = (event) => {
    setType(event.target.value);
    setIsFiltered(true);
  };

  const handleResetFilter = () => {
    setFromDate(null);
    setToDate(null);
    setCategory('');
    setType('');
    setIsFiltered(false);
  };

  const filteredProperties = properties.filter((property) => {
    let isValid = true;
    let propertyDate = property.createdAt;

    if (propertyDate instanceof Date) {
      // Do nothing, already a Date object
    } else if (propertyDate && typeof propertyDate.toDate === 'function') {
      propertyDate = propertyDate.toDate();
    } else {
      propertyDate = new Date(propertyDate);
    }

    if (fromDate) isValid = isValid && propertyDate >= new Date(fromDate);
    if (toDate) isValid = isValid && propertyDate <= new Date(toDate);
    if (category) isValid = isValid && property.category === category;
    if (type) isValid = isValid && property.propertyType === type;

    return isValid;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approve':
        return 'rgb(59, 130, 246)';
      case 'Reject':
        return 'rgb(202, 138, 4)';
      case 'Disabled':
        return 'red';
      default:
        return 'black';
    }
  };

  return (
    <Grid container spacing={3} style={{ padding: '2%', marginLeft: '10%', width: '85%' }}>
      {filteredProperties.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((property) => (
        <Grid item xs={12} sm={6} md={4} key={property.id}>
          <Card sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', height: 'auto' }}>
            <CardMedia
              component="img"
              image={property.coverImage}
              alt={property.title}
              sx={{ width: 160, height: 'auto', objectFit: 'cover' }}
            />
            <CardContent sx={{ flex: 1, padding: 2 }}>
              <Typography variant="h6" component="div" onClick={() => handleViewRow(property.id)}>
                {property.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Publisher: {property.publisher}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Year: {property.yearOfStarting}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PropertyTable;
