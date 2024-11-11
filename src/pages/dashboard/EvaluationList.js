import {
  Button,
  Card, CardContent,
  CardMedia,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; // Updated import for DatePicker
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Iconify from '../../components/iconify';

import { useSnackbar } from '../../components/snackbar';
import { deleteJournal, getByBrowseStatus } from '../../controller/propertiesController';
import { PATH_DASHBOARD } from '../../routes/paths';

const PropertyTableToolbar = ({
  isFiltered,
  fromDate,
  toDate,
  onFilterFromDate,
  onFilterToDate,
  onResetFilter,
  categories,
  category,
  type,
  types,
  handleFilterCategory,
  handleFilterTypes,
}) => (
  <Stack
    spacing={2}
    alignItems="center"
    direction={{
      xs: 'column',
      sm: 'row',
    }}
    sx={{ px: 2.5, py: 3 }}
  >
    <DatePicker
      label="From Date"
      value={fromDate}
      onChange={onFilterFromDate}
      renderInput={(params) => <TextField {...params} fullWidth sx={{ maxWidth: { sm: 240 } }} />}
      maxDate={new Date()} // Disable future dates
    />

    <DatePicker
      label="To Date"
      value={toDate}
      onChange={onFilterToDate}
      renderInput={(params) => <TextField {...params} fullWidth sx={{ maxWidth: { sm: 240 } }} />}
      maxDate={new Date()} // Disable future dates
    />
    <TextField
      select
      label="Category"
      value={category}
      onChange={handleFilterCategory}
      fullWidth
      sx={{ maxWidth: { sm: 240 } }}
      SelectProps={{ displayEmpty: true }}
    >
      <MenuItem value=""><em>None</em></MenuItem>
      {categories && categories.map((cat) => (
        <MenuItem key={cat.id} value={cat.category}>{cat.category}</MenuItem>
      ))}
    </TextField>

    <TextField
      select
      label="Types"
      value={type}
      onChange={handleFilterTypes}
      fullWidth
      sx={{ maxWidth: { sm: 240 } }}
      SelectProps={{ displayEmpty: true }}
    >
      <MenuItem value="" />
      {types && types.map((cat) => (
        <MenuItem key={cat.id} value={cat.propertyType}>{cat.propertyType}</MenuItem>
      ))}
    </TextField>

    {isFiltered && (
      <Button
        color="error"
        sx={{ flexShrink: 0 }}
        onClick={onResetFilter}
        startIcon={<Iconify icon="eva:trash-2-outline" />}
      >
        Clear
      </Button>
    )}
  </Stack>
);

PropertyTableToolbar.propTypes = {
  isFiltered: PropTypes.bool,
  fromDate: PropTypes.instanceOf(Date),
  toDate: PropTypes.instanceOf(Date),
  onFilterFromDate: PropTypes.func,
  onFilterToDate: PropTypes.func,
  onResetFilter: PropTypes.func,
  categories: PropTypes.array,
  types: PropTypes.array,
  category: PropTypes.string,
  type: PropTypes.string,
  handleFilterCategory: PropTypes.func,
  handleFilterTypes: PropTypes.func,
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
  const [categories, setCategories] = useState([
  ]);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
        try {
            // Fetch only indexed conferences
            const propertiesData = await getByBrowseStatus('master');
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

  const handleDeleteproperties = async () => {
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

  const handleViewRow = (id) => {
    console.log('Property Id:', id); // Check if propertiesId is received correctly
    // navigate('/journal/:id');
    navigate(`/dashboard/journal/${id}`);

  };
  const handleEditRow = (id) => {
    // Use the id directly without transforming it with paramCase
    navigate(PATH_DASHBOARD.eCommerce.edit(id));
  };
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

    // Check if propertyDate needs to be converted to a JavaScript Date object
    if (propertyDate instanceof Date) {
      // Do nothing, already a Date object
    } else if (propertyDate && typeof propertyDate.toDate === 'function') {
      // Convert Firestore Timestamp to Date
      propertyDate = propertyDate.toDate();
    } else {
      // Convert other types to Date
      propertyDate = new Date(propertyDate);
    }

    if (fromDate) {
      isValid = isValid && propertyDate >= new Date(fromDate);
    }

    if (toDate) {
      isValid = isValid && propertyDate <= new Date(toDate);
    }

    if (category) {
      isValid = isValid && property.category === category;
    }

    if (type) {
      isValid = isValid && property.propertyType === type;
    }

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
        return 'black'; // Default color if status is not recognized
    }
  };


  return (
    <>

<Grid container spacing={3} style={{ padding: '2%', marginLeft: '10%', width: '85%' }}>
  {filteredProperties.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((journal) => (
    <Grid item xs={12} sm={6} md={6} key={journal.id}>
      <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, height: '100%' }}>
        {/* Image section */}
        <Grid item xs={12} sm={5} md={4}>
          <CardMedia
            component="img"
            sx={{
              width: { xs: '100%', sm: 240 }, // Full width for small screens, fixed width for medium+
              height: 'auto',
              objectFit: 'cover',
            }}
            image={journal.coverImage}
            alt={journal.title}
          />
        </Grid>

        {/* Content section */}
        <Grid item xs={12} sm={7} md={8}>
          <CardContent sx={{ padding: 2 }}>
            <Typography
              variant="h6"
              component="div"
              onClick={() => handleViewRow(journal.id)}
              sx={{ cursor: 'pointer' }}
            >
              {journal.title}
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">
                  Publisher: {journal.publisher}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">
                  Year: {journal.yearOfStarting}
                </Typography>
              </Grid>
            </Grid>

            <Typography
              variant="body2"
              sx={{
                display: '-webkit-box',
                overflow: 'hidden',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 3, // Clamps text to 3 lines
                textOverflow: 'ellipsis',
                mt: 2,
              }}
            >
              {journal.description}
            </Typography>
          </CardContent>
        </Grid>
      </Card>
    </Grid>
  ))}
</Grid>


      

    </>
  );
};
export default PropertyTable;

