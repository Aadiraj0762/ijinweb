// routes
import { PATH_PAGE } from '../../routes/paths';
// config
// components

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: 'Home',
    // icon: <Iconify icon="ic:round-grain" />,
    path: '/',
  },
  {
    title: 'About us',
    // icon: <Iconify icon="ic:round-grain" />,
    path: PATH_PAGE.about,
  },
  {
    title: 'Browse',
    // icon: <Iconify icon="eva:file-fill" />,
    children: [
      {
        // subheader: 'Other',
        items: [
          { title: 'Indexed Journals', path: '/journal/list' },
          { title: 'Journal Master List', path: 'master/list' },
          { title: 'Under Evaluation ', path: '/evaluation/list' },
          { title: 'Conference / Symposium', path: '/conference/' },

          { title: 'IJIN Value', path: '/ijin/list' },

        ],
      },
    ],
  },

  {
    title: 'Selection Process',
    // icon: <Iconify icon="eva:book-open-fill" />,
    path: '/selection',
  },
  {
    title: 'Submission',
    // icon: <Iconify icon="eva:book-open-fill" />,
    path: '',

    children: [
      {
        // subheader: 'Other',
        items: [
          { title: 'Journals', path: '/journal/new' },
          { title: 'Conference / Symposium', path: '/conference/new' },
          { title: 'IJIN Value', path: '/ijin/new' },

        ],
      },
    ],
  },
  {
    title: 'Abstract / Articles',
    // icon: <Iconify icon="eva:book-open-fill" />,
    path: '',

    children: [
      {
        // subheader: 'Other',path: '/abstractjournal/new',
        items: [
          { title: 'Journals', path: '/abstractjournal/' },
          { title: 'Conference / Symposium', path: '/Abstractconference/' },
          { title: 'Journals Submission', path: '/abstractjournal/new' },
          { title: 'Conference / Symposium Submission', path: '/Abstractconference/new' },

        ],
      },
    ],
  },
  {
    title: 'Featured Journals',
    // icon: <Iconify icon="ic:round-grain" />,
    path: '/featuredjournal',
  },
  {
    title: 'Thesis',
    // icon: <Iconify icon="eva:book-open-fill" />,
    path: '',

    children: [
      {
        subheader: 'Other',
        items: [
          { title: 'Thesis Archieve', path: '/thesis-archieve/' },
          { title: 'Thesis submission', path: 'thesis/new' },

        ],
      },
    ],
  },
];


export default navConfig;
