// @mui
import { Container, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import { MotionContainer, TextAnimate, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage: 'url("https://firebasestorage.googleapis.com/v0/b/journalindexing-38ac8.appspot.com/o/aboutus_covers%2F1727072578588_ABOUT-US-BANNER.jpg?alt=media&token=9a1f5a43-b0b1-412a-992a-fda06029d003")',
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    height: 160,
    padding: 0,
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    bottom: 80,
    // textAlign: 'left',

    position: 'absolute',
  },
}));

// ----------------------------------------------------------------------

export default function AboutHero() {
  return (
    <StyledRoot>
      <Container component={MotionContainer}>
        <StyledContent>
          <TextAnimate
            text=""
            sx={{
              color: 'primary.main',  textAlign: 'center',

            }}
            variants={varFade().inRight}
            
          />

          <Stack spacing={2} display="inline-flex" direction="row" sx={{ color: 'common.white' }}>
            <TextAnimate text="" />
          </Stack>
          
        </StyledContent>
      </Container>
    </StyledRoot>
  );
}
