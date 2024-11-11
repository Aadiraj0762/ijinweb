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
  backgroundImage: 'url(), url("https://t3.ftcdn.net/jpg/05/15/16/12/360_F_515161254_2cp9OEcNqERA2KHp2jqaFfvF7Ze5oO4I.jpg")',
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

export default function SelectionHero() {
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
