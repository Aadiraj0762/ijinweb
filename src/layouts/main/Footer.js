// import { Link as RouterLink, useLocation } from 'react-router-dom';
// // @mui
// import { Box, Container, Divider, Grid, Link, Stack, Typography } from '@mui/material';
// // components
// import Logo from '../../components/logo';

// // ----------------------------------------------------------------------

// const LINKS = [
//   {
//     headline: 'About',
//     children: [
//       { name: 'About us', href: '/about' },
//     ],
//   },
//   {
//     headline: 'Journals & Articles',
//     children: [
//       { name: 'Journals', href: '/journals' },
//       { name: 'Articles', href: '/articles' },
//       { name: 'Conferences', href: '/conferences' },
//       { name: 'Thesis', href: '/thesis' },
//       { name: 'Abstracts', href: '/abstracts' },
//     ],
//   },
//   {
//     headline: 'More Links',
//     children: [
//       { name: 'Home', href: '/' },
//       { name: 'About', href: '/about' },
//       { name: 'Contact us', href: '/contact' },
//       { name: 'Submissions', href: '/submissions' },
//       { name: 'Featured', href: '/featured' },
//       { name: 'Browse', href: '/browse' },
//     ],
//   },
// ];

// export default function Footer() {
//   const { pathname } = useLocation();

//   const mainFooter = (
//     <Box
//       component="footer"
//       sx={{
//         position: 'relative',
//         bgcolor: 'background.default',
//         marginTop: "50px",
//         // marginBottom:"50px"

//       }}
//     >
//       <Divider />

//       <Container sx={{ pt: 6 }}>
//         <Grid
//           container
//           justifyContent="space-between"
//           sx={{
//             textAlign: {
//               xs: 'center',
//               md: 'left',
//             },
//           }}
//           spacing={2} // Reduced spacing between columns
//         >
//           {/* Column for Logo */}
//           <Grid item xs={12} md={2}> {/* Reduced md size */}
//             <Logo sx={{ mx: { xs: 'auto', md: 'inherit' } }} />
//             <Link
//               href="https://firebasestorage.googleapis.com/v0/b/journalindexing-38ac8.appspot.com/o/logo%2Fiji%20logo.png?alt=media&token=cbf97a45-70d7-48aa-ba08-89dab7545cfb"
//               download
//               underline="none"
//               color="inherit"
//             >
//               <Typography component="span" variant="overline">
//                 Download Seal
//               </Typography>
//             </Link>
//           </Grid>
//           {/* Column for About */}
//           <Grid item xs={12} md={3}> {/* Reduced column width */}
//             <Stack spacing={2} alignItems={{ xs: 'center', md: 'flex-start' }}>
//               <Typography component="div" variant="overline">
//                 About
//               </Typography>
//               <Typography
//                 variant="body2"
//                 component="div"
//                 sx={{ textAlign: "justify", maxWidth: "250px" }} // Keeping the max width for readability
//               >
//                 International Journal Indexing (www.ijindexing.com) provides indexing to all types of E-Journal, P-Journal, and conference presentation articles/abstracts. We offer international visibility to research and provide impact factor (IJIN Impact Factor) to improve journal visibility in the research world.
//               </Typography>
//             </Stack>
//           </Grid>

//           {/* Column for Journals, Articles, Conferences, Thesis, Abstract */}
//           <Grid item xs={12} md={3}> {/* Reduced column width */}
//             <Stack spacing={2} alignItems={{ xs: 'center', md: 'flex-start' }}>
//               <Typography component="div" variant="overline">
//                 Journals & Articles
//               </Typography>
//               {LINKS[1].children.map((link) => (
//                 <Link
//                   key={link.name}
//                   component={RouterLink}
//                   to={link.href}
//                   color="inherit"
//                   variant="body2"
//                 >
//                   {link.name}
//                 </Link>
//               ))}
//             </Stack>
//           </Grid>

//           {/* Column for More Links */}
//           <Grid item xs={12} md={3}> {/* Reduced column width */}
//             <Stack spacing={2} alignItems={{ xs: 'center', md: 'flex-start' }}>
//               <Typography component="div" variant="overline">
//                 More Links
//               </Typography>
//               {LINKS[2].children.map((link) => (
//                 <Link
//                   key={link.name}
//                   component={RouterLink}
//                   to={link.href}
//                   color="inherit"
//                   variant="body2"
//                 >
//                   {link.name}
//                 </Link>
//               ))}
//             </Stack>
//           </Grid>
//         </Grid>
//         <br />
//         <Divider />
//         <Typography
//           variant="caption"
//           component="div"
//           sx={{
//             mt: '20px',
//             pb: 5,
//             textAlign: 'center',
//           }}
//         >
//           © 2024. All rights reserved by &nbsp;
//           <Link href="https://www.ijindexing.com/"> International Journal Indexing </Link>
//           &nbsp;|| Powered by&nbsp;
//           <Link href="https://sensitive.co.in/"> Sensitive Technologies </Link>
//         </Typography>
//       </Container>
//       <br style={{ margingTop: "50px" }} />
//     </Box>
//   );

//   return mainFooter;
// }
import { Link as RouterLink, useLocation } from 'react-router-dom';
// @mui
import { Box, Container, Divider, Grid, Link, Stack, Typography } from '@mui/material';
// components
import Logo from '../../components/logo';

// ----------------------------------------------------------------------

const LINKS = [
  {
    headline: 'About',
    children: [
      { name: 'About us', href: '/about' },
    ],
  },
  {
    headline: 'Journals & Articles',
    children: [
      { name: 'Journals', href: '/master/list' },
      { name: 'Articles', href: '/abstractjournal/' },
      { name: 'Conferences', href: '/conference' },
      { name: 'Thesis', href: '/thesis-archieve/' },
      { name: 'Abstracts', href: '/Abstractconference/' },
    ],
  },
  {
    headline: 'More Links',
    children: [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about-us' },
      { name: 'Contact us', href: '/' },
      { name: 'Selections', href: '/selection' },
      { name: 'Featured', href: 'featuredjournal' },
      { name: 'Browse', href: '/journal/list' },
    ],
  },
];

export default function Footer() {
  const { pathname } = useLocation();

  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        bgcolor: 'background.default',
        marginTop: "50px",
      }}
    >
      {/* Conditionally render the Divider if not on the Home page */}
      {pathname !== '/' && <Divider />}

      <Container sx={{ pt: 6 }}>
        <Grid
          container
          justifyContent="space-between"
          sx={{
            textAlign: {
              xs: 'center',
              md: 'left',
            },
          }}
          spacing={2} // Reduced spacing between columns
        >
          {/* Column for Logo */}
          <Grid item xs={12} md={2}> {/* Reduced md size */}
            <Logo sx={{ mx: { xs: 'auto', md: 'inherit' } }} />
            <Link
              href="https://firebasestorage.googleapis.com/v0/b/journalindexing-38ac8.appspot.com/o/logo%2Fiji%20logo.png?alt=media&token=cbf97a45-70d7-48aa-ba08-89dab7545cfb"
              download
              underline="none"
              color="inherit"
            >
              <Typography component="span" variant="overline">
                Download Seal
              </Typography>
            </Link>
          </Grid>
          {/* Column for About */}
          <Grid item xs={12} md={3}> {/* Reduced column width */}
            <Stack spacing={2} alignItems={{ xs: 'center', md: 'flex-start' }}>
              <Typography component="div" variant="overline">
                About
              </Typography>
              <Typography
                variant="body2"
                component="div"
                sx={{ textAlign: "justify", maxWidth: "250px" }} // Keeping the max width for readability
              >
                International Journal Indexing (www.ijindexing.com) provides indexing to all types of E-Journal, P-Journal, and conference presentation articles/abstracts. We offer international visibility to research and provide IJIN Value to improve journal visibility in the research world.
              </Typography>
            </Stack>
          </Grid>

          {/* Column for Journals, Articles, Conferences, Thesis, Abstract */}
          <Grid item xs={12} md={3}> {/* Reduced column width */}
            <Stack spacing={2} alignItems={{ xs: 'center', md: 'flex-start' }}>
              <Typography component="div" variant="overline">
                Journals & Articles
              </Typography>
              {LINKS[1].children.map((link) => (
                <Link
                  key={link.name}
                  component={RouterLink}
                  to={link.href}
                  color="inherit"
                  variant="body2"
                >
                  {link.name}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Column for More Links */}
          <Grid item xs={12} md={3}> {/* Reduced column width */}
            <Stack spacing={2} alignItems={{ xs: 'center', md: 'flex-start' }}>
              <Typography component="div" variant="overline">
                More Links
              </Typography>
              {LINKS[2].children.map((link) => (
                <Link
                  key={link.name}
                  component={RouterLink}
                  to={link.href}
                  color="inherit"
                  variant="body2"
                >
                  {link.name}
                </Link>
              ))}
            </Stack>
          </Grid>
        </Grid>
        <br />
        
        {/* Conditionally render the second Divider if not on the Home page */}
        {pathname !== '/' && <Divider />}
        
        <Typography
          variant="caption"
          component="div"
          sx={{
            mt: '20px',
            pb: 5,
            textAlign: 'center',
          }}
        >
          © 2024. All rights reserved by &nbsp;
          <Link href="https://www.ijindexing.com/"> International Journal Indexing </Link>
          &nbsp;|| Powered by&nbsp;
          <Link href="https://sensitive.co.in/"> Sensitive Technologies </Link>
        </Typography>
      </Container>
      <br style={{ marginTop: "50px" }} />
    </Box>
  );
}
