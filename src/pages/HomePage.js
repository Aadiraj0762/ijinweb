import { m, useScroll, useSpring } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
// @mui
import { Box, Breadcrumbs, Divider, Link, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// sections
import { HomeMinimal } from '../sections/home';
import ContactPage from './ContactPage';
// ----------------------------------------------------------------------

export default function HomePage() {
  const theme = useTheme();

  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const progress = (
    <m.div
      style={{
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 1999,
        position: 'fixed',
        transformOrigin: '0%',
        backgroundColor: theme.palette.primary.main,
        scaleX,
      }}
    />
  );

  // Breadcrumb navigation links
  const breadcrumbs = (
    <Breadcrumbs aria-label="breadcrumb" sx={{ color: 'white', zIndex: 1 }}>
      <Link underline="hover" color="inherit" href="/">
        Home
      </Link>
      <Typography color="white">Current Page</Typography>
    </Breadcrumbs>
  );

  return (
    <>
      <Helmet>
        <title> Home || INTERNATIONAL JOURNAL INDEXING(www.ijindexing.com)</title>
      </Helmet>

      {progress}

      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
        <br />
        {/* Breadcrumb with background image */}
        <Box
          sx={{
            position: 'relative',
            backgroundImage: 'url("/path-to-your-image.jpg")', // Add your image path
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: { xs: '150px', md: '250px' }, // Responsive height
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            marginTop: "70px"
          }}
        >
          <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }} />
          {/* Breadcrumb content */}
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Divider />
            <Typography variant="h1" color="#0e238b" mb={1}>
              INTERNATIONAL JOURNAL INDEXING
            </Typography>
            <Divider />

            {/* {breadcrumbs} */}
          </Box>
        </Box>

        <HomeMinimal />

        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          {/* Contact Page with overlapping effect */}
          <Box
            sx={{
              position: 'relative',
              // top: '-50px',
              zIndex: 1,
              backgroundColor: '#F5F5F5',

            }}
          >
            <ContactPage />

          </Box>
        </Box>
      </Box>
    </>
  );
}
