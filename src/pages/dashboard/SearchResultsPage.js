// import { Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
// import { useLocation, useNavigate } from 'react-router-dom';
// // import { HomeMinimal } from '../../sections/home';

// const SearchResultsPage = () => {
//   const location = useLocation();
//   const { results, searchType } = location.state || { results: [], searchType: '' };
//   const navigate = useNavigate();

//   const handleViewRow = (id) => {
//     if (!id) {
//       console.error('No ID found for the selected item');
//       return;
//     }

//     console.log('Navigating to:', searchType === 'journals' ? `/dashboard/journal/${id}` : `/dashboard/conference/${id}`);

//     // Conditional navigation based on searchType (journal or conference)
//     if (searchType === 'abstracts') {
//       navigate(`/dashboard/journal/${id}`);
//     } else if (searchType === 'conference') {
//       navigate(`/dashboard/conference/Pw7qPUBNCP5fbYZj3nTt`);
//     }
//   };

//   return (
//     <>
//     {/* <HomeMinimal/> */}
//       <Container>
//         <Typography variant="h4" gutterBottom>
//           {searchType === 'abstracts' ? 'Journal' : 'Conference'} Search Results
//         </Typography>

//         <Grid container spacing={3} style={{ padding: '2%', marginLeft: '10%', width: '85%' }}>
//           {results.map((journal, index) => (
//             <Grid item xs={12} sm={6} md={3} key={journal.id || index}>
//               <Card sx={{ height: 600, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
//                 {/* CardMedia for displaying the image */}
//                 <CardMedia
//                   component="img"
//                   image={journal.coverImage || 'https://via.placeholder.com/150'} // Fallback image if none provided
//                   alt={journal.title || 'No Title'}
//                   sx={{ objectFit: 'cover' }}
//                 />

//                 <CardContent sx={{ padding: 2 }}>
//                   {/* Title */}
//                   <Typography variant="h6" component="div" onClick={() => handleViewRow(journal.id)}>
//                     {journal.title || 'No Title'}
//                   </Typography>

//                   {/* Grid for displaying Publisher and Year of Starting */}
//                   <Grid container spacing={2} alignItems="justify">
//                     <Grid item xs={6}>
//                       Publisher: {journal.publisher || 'N/A'}
//                     </Grid>

//                     <Grid item xs={6}>
//                       Year: {journal.yearOfStarting || 'N/A'}
//                     </Grid>
//                   </Grid>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </>
//   );
// };

// export default SearchResultsPage;
import { Box, Card, CardContent, Container, Grid, Typography, Breadcrumbs, Link, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchTypeBar from '../components/SearchTypeBar';

const SearchResultsPage = () => {
  const location = useLocation();
  const { results, searchType } = location.state || { results: [], searchType: '' };
  const navigate = useNavigate();

  // State for loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay (e.g., fetching data from an API)
    const timer = setTimeout(() => setLoading(false), 1500);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  const handleViewRow = (id) => {
    if (!id) {
      console.error('No ID found for the selected item');
      return;
    }
    // Conditional navigation based on searchType (journal or conference)
    if (searchType === 'abstracts') {
      navigate(`/dashboard/journal/${id}`);
    } else if (searchType === 'conference') {
      navigate(`/dashboard/conference/${id}`);
    }
  };

  return (
    <>
      {/* Full Image Breadcrumb Section */}
      <Box
        sx={{
          width: '100%',
          height: '250px',
          backgroundImage: 'url("https://source.unsplash.com/random/1600x400?research")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h3"
          align="center"
          sx={{ color: 'white', textShadow: '2px 2px 5px rgba(0,0,0,0.7)' }}
        >
          {searchType === 'abstracts' ? 'Journal Search' : 'Conference Search'} Results
        </Typography>
      </Box>

      <SearchTypeBar />

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {/* Loader */}
        {loading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 4 }}>
            {[1, 2, 3].map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width="100%"
                height={120}
                animation="wave"
              />
            ))}
          </Box>
        ) : (
          <>
            {/* Check if results are empty */}
            {results.length === 0 ? (
              <Typography
                variant="h6"
                align="center"
                sx={{ mt: 5, fontWeight: 'bold', color: 'red' }}
              >
                No results found for your search.
              </Typography>
            ) : (
              <Grid container spacing={4}>
                {results.map((journal, index) => (
                  <Grid item xs={12} sm={12} md={6} key={journal.id || index}>
                    <Card
                      sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: 'flex-start',
                        borderRadius: 2,
                        boxShadow: 3,
                        overflow: 'hidden',
                        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                        '&:hover': { transform: 'scale(1.02)', boxShadow: 6 },
                      }}
                    >
                      {/* Content Section */}
                      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ p: 3 }}>
                          {/* Title */}
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{
                              cursor: 'pointer',
                              color: 'primary.main',
                              '&:hover': { textDecoration: 'underline' },
                              mb: 2,
                            }}
                            onClick={() => handleViewRow(journal.id)}
                          >
                            {journal.title || 'No Title'}
                          </Typography>

                          {/* Publisher */}
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            <strong>Publisher:</strong> {journal.publisher || 'N/A'}
                          </Typography>

                          {/* Year */}
                          <Typography variant="body2" color="text.secondary">
                            <strong>Year:</strong> {journal.yearOfStarting || 'N/A'}
                          </Typography>
                        </CardContent>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default SearchResultsPage;
