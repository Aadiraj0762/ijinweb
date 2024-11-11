// routes
import { PATH_PAGE } from '../../../routes/paths';
// config
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const navConfig = [
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
    // icon: <Iconify icon="eva:book-open-fill" />,
    path: '/selection',
  },
  {
    title: 'Featured Journals',
    // icon: <Iconify icon="ic:round-grain" />,
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
          // { title: 'IJIN Value', path: '/ijin/new' },
        ],
      },
      {
        subheader: 'Abstract / Articles',
        items: [
          { title: 'Journals', path: '/abstractjournal/' },
          { title: 'Conference / Symposium', path: '/Abstractconference/' },
          // { title: 'Journals Submission', path: '/abstractjournal/new' },
          // { title: 'Conference / Symposium Submission', path: '/Abstractconference/new' },

        ],
      },

      {
        subheader: 'Thesis',
        items: [{ title: 'Thesis Archieve', path: '/thesis-archieve/' },
        { title: 'Thesis submission', path: 'thesis/new' },],
      },
      
    ],
  },
  
];

export default navConfig;
