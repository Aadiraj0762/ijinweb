import { Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchResultsPage = () => {
  const location = useLocation();
  const { results, searchType } = location.state || { results: [], searchType: '' };
  const navigate = useNavigate();

  const handleViewRow = (id) => {
    if (!id) {
      console.error('No ID found for the selected item');
      return;
    }

    console.log('Navigating to:', searchType === 'journals' ? `/dashboard/journal/${id}` : `/dashboard/conference/${id}`);

    // Conditional navigation based on searchType (journal or conference)
    if (searchType === 'journals') {
      navigate(`/dashboard/journal/${id}`);
    } else if (searchType === 'conference') {
      navigate(`/dashboard/conference/Pw7qPUBNCP5fbYZj3nTt`);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {searchType === 'journals' ? 'Journal' : 'Conference'} Search Results
      </Typography>

      <Grid container spacing={3} style={{ padding: '2%', marginLeft: '10%', width: '85%' }}>
        {results.map((journal, index) => (
          <Grid item xs={12} sm={6} md={3} key={journal.id || index}>
            <Card sx={{ height: 600, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              {/* CardMedia for displaying the image */}
              <CardMedia
                component="img"
                image={journal.coverImage || 'https://via.placeholder.com/150'} // Fallback image if none provided
                alt={journal.title || 'No Title'}
                sx={{ objectFit: 'cover' }}
              />

              <CardContent sx={{ padding: 2 }}>
                {/* Title */}
                <Typography variant="h6" component="div" onClick={() => handleViewRow(journal.id)}>
                  {journal.title || 'No Title'}
                </Typography>

                {/* Grid for displaying Publisher and Year of Starting */}
                <Grid container spacing={2} alignItems="justify">
                  <Grid item xs={6}>
                    Publisher: {journal.publisher || 'N/A'}
                  </Grid>

                  <Grid item xs={6}>
                    Year: {journal.yearOfStarting || 'N/A'}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SearchResultsPage;
