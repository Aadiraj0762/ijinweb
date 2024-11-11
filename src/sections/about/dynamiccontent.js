import { useEffect, useState } from 'react';
// @mui
import { Box, Container, Grid, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { doc, getDoc } from 'firebase/firestore';

import useResponsive from '../../hooks/useResponsive';
// Firebase
import firestore from '../../config-global';
// components
import { MotionViewport } from '../../components/animate';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  textAlign: 'center',
  paddingTop: theme.spacing(20),
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
  },
}));

// ----------------------------------------------------------------------

export default function AboutWhat() {
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'md');
  const isLight = theme.palette.mode === 'light';

  const [aboutData, setAboutData] = useState(null);
  const [images, setImages] = useState([]);
  const [textContent, setTextContent] = useState('');

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const docRef = doc(firestore, 'aboutus', '1727072580812'); // Replace with the actual document ID
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          extractImagesAndText(data.content);
          setAboutData(data);
        } else {
          console.log('No About Us content found');
        }
      } catch (error) {
        console.error('Error fetching About Us content:', error);
      }
    };

    fetchAboutContent();
  }, []);

  // Function to extract images and text separately from the content
  const extractImagesAndText = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    // Extract all <img> elements
    const imageElements = doc.querySelectorAll('img');
    const imgSrcs = [];
    imageElements.forEach((img) => {
      imgSrcs.push(img.src);
      img.remove(); // Remove the image from the HTML content
    });
    
    // Get the updated HTML content without images
    const updatedContent = doc.body.innerHTML;
    
    setImages(imgSrcs); // Store the images separately
    setTextContent(updatedContent); // Set the remaining text content
  };

  if (!aboutData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <StyledRoot style={{ marginTop: '-100px', textAlign: 'justify' }}>
      <Container component={MotionViewport}>
        <Grid container spacing={3}>
          {/* Left Side: Images */}
          <Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`About Us Image ${index + 1}`}
                style={{ width: '100%', height: 'auto', marginBottom: '20px' }}
              />
            ))}
          </Grid>

          {/* Right Side: About Us Content */}
          <Grid item xs={12} md={8}>
            <Typography variant="h3" gutterBottom>
              About Us :
            </Typography>

            {/* Render remaining text content */}
            <Box
              sx={{
                color: theme.palette.mode === 'light' ? 'text.primary' : 'common.white',
              }}
              dangerouslySetInnerHTML={{ __html: textContent }}
            />
          </Grid>
        </Grid>
      </Container>
    </StyledRoot>
  );
}
