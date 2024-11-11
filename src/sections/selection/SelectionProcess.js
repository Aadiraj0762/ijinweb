import { useEffect, useState } from 'react';
// @mui
import { Box, Container, Divider, Grid, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { doc as firestoreDoc, getDoc } from 'firebase/firestore';

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
        const aboutDocRef = firestoreDoc(firestore, 'selection', '1727077101839');
        const docSnap = await getDoc(aboutDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          extractImagesAndText(data.content);
          setAboutData(data);
        } else {
          console.log('No selection  content found');
        }
      } catch (error) {
        console.error('Error fetching selection content:', error);
      }
    };

    fetchAboutContent();
  }, []);

  const extractImagesAndText = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    const imageElements = doc.querySelectorAll('img');
    const imgSrcs = [];
    imageElements.forEach((img) => {
      imgSrcs.push(img.src);
      img.remove();
    });

    const updatedContent = doc.body.innerHTML;

    setImages(imgSrcs);
    setTextContent(updatedContent);
  };

  if (!aboutData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <StyledRoot sx={{ marginTop: '-100px', textAlign: 'justify' }}>
      <Container component={MotionViewport}>
        <Grid container spacing={3}>

          <Grid item xs={12} md={12} >
            <Typography variant="h3" gutterBottom sx={{textAlign:"center"}}>
              Journal            
              </Typography>
<Divider/>
            <Box
              sx={{
                color: theme.palette.mode === 'light' ? 'text.primary' : 'common.white',
                padding:"20px"
              }}
              dangerouslySetInnerHTML={{ __html: textContent }}
            />
          </Grid>
        </Grid>
      </Container>
    </StyledRoot>
  );
}
