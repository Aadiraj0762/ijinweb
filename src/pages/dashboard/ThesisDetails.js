import {
    Box,
    Card, CardContent,
    CardMedia,
    Grid,
    IconButton,
    Typography
} from '@mui/material';
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Iconify from '../../components/iconify';
import { useSnackbar } from '../../components/snackbar';
import { getThesesByVolume } from '../../controller/thesisController';
import { ThesisHero } from '../../sections/about';

const PropertyTable = () => {
    const [properties, setProperties] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const volume = 1; // Replace with the actual volume you want to fetch
                const propertiesData = await getThesesByVolume(volume);
                setProperties(propertiesData.theses); // Make sure to use `theses` field from the returned data
            } catch (error) {
                console.error('Error fetching properties:', error);
                enqueueSnackbar('Error fetching properties', { variant: 'error' });
            }
        };

        fetchData();
    }, [enqueueSnackbar]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleViewRow = (id) => {
        navigate(`/dashboard/conference/${id}`);
    };

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
    
    const getPdfDownloadUrl = async (pdfPath) => {
        const storage = getStorage();
        const pdfRef = ref(storage, pdfPath);
        try {
            const url = await getDownloadURL(pdfRef);
            return url;
        } catch (error) {
            console.error('Error fetching PDF URL:', error);
            enqueueSnackbar('Error fetching PDF URL', { variant: 'error' });
            return null;
        }
    };

    return (
        <>
            <ThesisHero />

            <Grid container spacing={3} style={{ padding: '2%', marginLeft: '10%', width: '80%' }}>
                {properties.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((property) => (
                    <Grid item xs={12}md={6} key={property.id}>
                        <Card sx={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
                            {property.photoId && (
                                <CardMedia
                                    component="img"
                                    height="180" // Adjust the height as needed
                                    image={property.photoId}
                                    alt="Thesis"
                                    sx={{
                                        width: '40%', // Image takes up 40% of the card's width
                                        objectFit: 'cover',
                                    }}
                                />
                            )}

                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" component="div">
                                    Thesis ID: {property.thesisId}
                                </Typography>
                                <Typography variant="body1" component="div">
                                    Title: {property.title}
                                </Typography>

                                <Grid container spacing={2} style={{ marginTop: '10px' }}>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="body2" color="text.secondary">
                                            College/University: {property.collegeUniversity}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="body2" color="text.secondary">
                                            Author: {property.author}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Box sx={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                                    <IconButton
                                        component="a"
                                        href={property.fullPdf}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Iconify icon="eva:eye-outline" />
                                    </IconButton>
                                    <IconButton
                                        component="a"
                                        href={property.fullPdf}  // Direct link to the stored PDF file
                                        download={`${property.title}.pdf`}  // Filename when downloading
                                    >
                                        <Iconify icon="eva:download-fill" />
                                    </IconButton>

                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default PropertyTable;
