import {
    Box,
    Card, CardContent, CardMedia,
    Grid,
    Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSnackbar } from '../../components/snackbar';
import { getAllAbstracts } from '../../controller/abstractController';

const AbstractTable = () => {
    const [abstracts, setAbstracts] = useState([]);
    const [selectedAbstracts, setSelectedAbstracts] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const abstractsData = await getAllAbstracts();
                setAbstracts(abstractsData);
            } catch (error) {
                console.error('Error fetching abstracts:', error);
            }
        };

        fetchData();
    }, []);

    const handleViewRow = (id) => {
        navigate(`/dashboard/abstract/${id}`);
    };

    const filteredAbstracts = abstracts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Box sx={{ padding: '2%', marginLeft: '10%', width: '85%' }}>
            <Grid container spacing={3}>
                {filteredAbstracts.map((abstract) => (
                    <Grid item xs={12} sm={6} md={6} key={abstract.id}>
                        <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, minHeight: 250 }}>
                            {/* Image on the left (or top for small screens) */}
                            <CardMedia
                                component="img"
                                sx={{ width: { xs: '100%', md: 160 }, height: 250, objectFit: 'cover' }}
                                image="https://api-prod-minimal-v610.pages.dev/assets/images/cover/cover-4.webp" // Replace with actual image source
                                alt={abstract.title}
                            />
                            
                            {/* Content on the right */}
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" component="div" onClick={() => handleViewRow(abstract.id)}>
                                    {abstract.title}
                                </Typography>

                                <Grid container spacing={1} sx={{ marginTop: 1 }}>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="text.secondary">
                                            Journal: {abstract.journalName}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="text.secondary">
                                            Author: {abstract.authorName}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                                    Publisher: {abstract.publisher}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default AbstractTable;
