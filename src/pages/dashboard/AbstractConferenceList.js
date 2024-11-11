import {
    Card, CardContent, CardMedia,
    Grid,
    Link,
    Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSnackbar } from '../../components/snackbar';
import { getAllAbstracts } from '../../controller/abstractconferenceController';

const AbstractTable = () => {
    const [abstracts, setAbstracts] = useState([]);
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
        navigate(`/dashboard/abstractconference/${id}`);
    };

    const filteredAbstracts = abstracts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Grid container spacing={3} style={{ padding: '2%', marginLeft: '10%', width: '85%' }}>
            {filteredAbstracts.map((abstract) => (
                <Grid item xs={12}md={6} key={abstract.id}>
                    <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, minHeight: 200 }}>
                        {/* Image Section */}
                        <Grid item xs={12} md={4}>
                            <CardMedia
                                component="img"
                                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                image={abstract.assetFile || "https://api-prod-minimal-v610.pages.dev/assets/images/cover/cover-4.webp"}
                                alt={abstract.title}
                            />
                        </Grid>

                        {/* Content Section */}
                        <Grid item xs={12} md={8}>
                            <CardContent sx={{ flexGrow: 1, padding: '16px' }}>
                                <Typography variant="h6" component="div" onClick={() => handleViewRow(abstract.id)} style={{ cursor: 'pointer' }}>
                                    {abstract.title}
                                </Typography>

                                <Grid container spacing={2} style={{ marginTop: '10px' }}>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="text.secondary">
                                            Author: {abstract.authorName}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="text.secondary">
                                            Conference: {abstract.conferenceName}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body2" color="text.secondary">
                                            Affiliation: {abstract.affiliation}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Typography variant="body2" color="text.secondary" style={{ marginTop: '10px' }}>
                                    Abstract: {abstract.abstract}
                                </Typography>

                                {abstract.linkDOI && (
                                    <Typography variant="body2" color="primary" style={{ marginTop: '10px' }}>
                                        <Link href={abstract.linkDOI} target="_blank" rel="noopener noreferrer">
                                            DOI Link
                                        </Link>
                                    </Typography>
                                )}
                            </CardContent>
                        </Grid>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default AbstractTable;
