// @mui
import { AppBar, Container, Stack, Toolbar, Typography } from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// config
import { HEADER } from '../../../config-global';
// components
import Iconify from '../../../components/iconify';
import {
  NavSectionHorizontal
} from '../../../components/nav-section';

// ----------------------------------------------------------------------

export default function DemoNavigationBarPage() {
  return (
    <>



      <Container sx={{ my: 10 }}>
        <Stack spacing={2} sx={{ mb: 10 }}>
          <Typography variant="h6"> Nav Horizontal </Typography>
          <AppBar
            position="static"
            component="nav"
            color="default"
            sx={{
              boxShadow: 0,
              top: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
            }}
          >
            <Toolbar>
              <NavSectionHorizontal data={NAV_ITEMS} />
            </Toolbar>
          </AppBar>
        </Stack>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------


const NAV_ITEMS = [
  {
    title: 'Home',
    icon: <Iconify icon="eva:home-fill" />,
    path: '/',
  },
  {
    title: 'About us',
    icon: <Iconify icon="ic:round-grain" />,
    path: PATH_PAGE.about,
  },
  {
    title: 'Selection Process',
    path: '/selection',
  },
  {
    title: 'Featured Journals',
    path: '/featuredjournal',
  },
  {
    title: 'Menu',
    path: '/pages',
    icon: <Iconify icon="eva:file-fill" />,
    children: [
      {
        subheader: 'Browse',
        items: [
          { title: 'Indexed Journals', path: '/journal/list' },
          { title: 'Journal Master List', path: 'master/list' },
          { title: 'Under Evaluation ', path: '/evaluation/list' },
          { title: 'Conference / Symposium', path: '/conference/' },
          { title: 'IJIN Value', path: '/ijin/list' },
        ],
      },
      {
        subheader: 'Submission',
        items: [
          { title: 'Journals', path: '/journal/new' },
          { title: 'Conference / Symposium', path: '/conference/new' },
          { title: 'IJIN Value', path: '/ijin/new' },
        ],
      },
      {
        subheader: 'Abstract / Articles',
        items: [
          { title: 'Journals', path: '/abstractjournal/' },
          { title: 'Conference / Symposium', path: '/Abstractconference/' },
          { title: 'Journals Submission', path: '/abstractjournal/new' },
          { title: 'Conference / Symposium Submission', path: '/Abstractconference/new' },
        ],
      },
      {
        subheader: 'Thesis',
        items: [
          { title: 'Thesis Archieve', path: '/thesis-archieve/' },
          { title: 'Thesis submission', path: 'thesis/new' },
        ],
      },
      {
        subheader: 'Dashboard',
        items: [
          { title: 'Thesis Archieve', path: '/thesis-archieve/' },
          { title: 'Thesis submission', path: 'thesis/new' },
        ],
      },
    ],
  },
];




