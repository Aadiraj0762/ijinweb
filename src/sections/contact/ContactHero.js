import { m } from 'framer-motion';
// @mui
import { Container, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
//
import { MotionContainer, TextAnimate, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const CONTACTS = [
  {
    country: 'Journals',
    address: 'Periodicals that publish peer-reviewed research articles to share scientific findings',
    phoneNumber: 'Submit your research today.',
  },
  {
    country: 'Conference',
    address: 'vents where researchers present and discuss their latest work, network, and learn about advancements in their field.',
    phoneNumber: 'Expand your research network.',
  },
  {
    country: 'Abstracts',
    address: 'Brief summaries of research papers that provide an overview of the study’s purpose, methods, and findings.',
    phoneNumber: 'Access the latest research findings.',
  },
  {
    country: 'IJIN Value',
    address: 'A measure of the visibility and impact of research through indexing services, enhancing the credibility of published work.',
    phoneNumber: 'Promoting scholarly visibility.',
  },
  {
    country: 'Thesis',
    address: 'An extensive research project completed for a degree, showcasing original work and contributing to academic knowledge.',
    phoneNumber: 'Share your academic achievements.',
  },
];

const StyledRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage: 'url(/assets/background/overlay_1.svg), url(/assets/images/contact/hero.jpg)',
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    height: 560,
    padding: 0,
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    bottom: 80,
    textAlign: 'left',
    position: 'absolute',
  },
}));

// ----------------------------------------------------------------------

export default function ContactHero() {
  return (
    <StyledRoot>
      <Container component={MotionContainer}>
        <StyledContent>
          <TextAnimate text="What" sx={{ color: 'primary.main' }} variants={varFade().inRight} />
          <br />

          <Stack spacing={2} display="inline-flex" direction="row" sx={{ color: 'common.white' }}>
            <TextAnimate text="International" />
            <TextAnimate text="Journal" />
            <TextAnimate text="Indexing?" />
          </Stack>

          <Grid container spacing={5} sx={{ mt: 5, color: 'common.white' }}>
            {CONTACTS.map((contact) => (
              <Grid
                key={contact.country}
                item
                xs={12}
                sm={6}
                md={3}
                lg={2}
                sx={{
                  pr: {
                    md: 5,
                  },
                }}
              >
                <m.div variants={varFade().in}>
                  <Typography variant="h6" paragraph > 
                    {contact.country}
                  </Typography>
                </m.div>

                <m.div variants={varFade().inRight}>
                  <Typography variant="body2">
                    {contact.address}
                    {/* <br /> {contact.phoneNumber} */}
                  </Typography>
                </m.div>
              </Grid>
            ))}
          </Grid>
        </StyledContent>
      </Container>
    </StyledRoot>
  );
}
