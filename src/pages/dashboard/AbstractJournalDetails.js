// import { Box, Card, Container, Divider, Grid, Typography } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
// import DOMPurify from 'dompurify';
// import PropTypes from 'prop-types';
// import { useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { useParams } from 'react-router-dom';

// import CustomBreadcrumbs from '../../components/custom-breadcrumbs/CustomBreadcrumbs';
// import { useSettingsContext } from '../../components/settings';
// import { PATH_DASHBOARD } from '../../routes/paths';

// // Import the new controller function
// import { getAbstractById } from '../../controller/abstractController';

// const sanitizeAndFormatDescription = (description) => {
//   if (!description) return '';
//   const cleanText = DOMPurify.sanitize(description, { ALLOWED_TAGS: [] });
//   return cleanText.replace(/\n/g, '<br />');
// };

// // Update component to display Abstract details
// const AbstractOverviewTab = ({ abstract }) => (
//   <Card>
//     <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: '8px' }}>
//       <Grid container spacing={1}>
//         {/* Abstract Details */}
//         <Grid item xs={12}>
//           <Grid container spacing={1}>
//             {abstract.title && (
//               <Grid item xs={12}>
//                 <Typography variant="h2">{abstract.title}</Typography>
//               </Grid>
//             )}
//             <Grid item xs={12}>
//               <Divider sx={{ my: 2 }} />
//             </Grid>

//             {abstract.journalName && (
//               <Grid item xs={12} md={6}>
//                 <Typography><b>Journal Name:</b> {abstract.journalName}</Typography>
//               </Grid>
//             )}

//             {abstract.issn && (
//               <Grid item xs={12} md={6}>
//                 <Typography><b>ISSN:</b> {abstract.issn}</Typography>
//               </Grid>
//             )}

//             {abstract.publisher && (
//               <Grid item xs={12} md={6}>
//                 <Typography><b>Publisher:</b> {abstract.publisher}</Typography>
//               </Grid>
//             )}

//             {abstract.affiliation && (
//               <Grid item xs={12} md={6}>
//                 <Typography><b>Affiliation:</b> {abstract.affiliation}</Typography>
//               </Grid>
//             )}

//             {abstract.authorName && (
//               <Grid item xs={12} md={6}>
//                 <Typography><b>Author:</b> {abstract.authorName}</Typography>
//               </Grid>
//             )}

//             {abstract.articleType && (
//               <Grid item xs={12} md={6}>
//                 <Typography><b>Article Type:</b> {abstract.articleType}</Typography>
//               </Grid>
//             )}

//             {abstract.linkDOI && (
//               <Grid item xs={12} md={6}>
//                 <Typography><b>DOI Link:</b> <a href={abstract.linkDOI}>{abstract.linkDOI}</a></Typography>
//               </Grid>
//             )}

//             {/* Divider before the abstract description */}
//             <Grid item xs={12}>
//               <Divider sx={{ my: 2 }} />
//             </Grid>

//             {abstract.abstract && (
//               <Grid item xs={12}>
//                 <Typography style={{ textAlign: "justify" }}>
//                   <b>Abstract:</b>
//                   <span dangerouslySetInnerHTML={{ __html: sanitizeAndFormatDescription(abstract.abstract) }} />
//                 </Typography>
//               </Grid>
//             )}
//           </Grid>
//         </Grid>
//       </Grid>
//     </Box>
//   </Card>
// );

// AbstractOverviewTab.propTypes = {
//   abstract: PropTypes.shape({
//     title: PropTypes.string,
//     journalName: PropTypes.string,
//     issn: PropTypes.string,
//     publisher: PropTypes.string,
//     affiliation: PropTypes.string,
//     authorName: PropTypes.string,
//     articleType: PropTypes.string,
//     abstract: PropTypes.string,
//     linkDOI: PropTypes.string,
//   }).isRequired,
// };

// // Main component to fetch and display abstract details
// export default function AbstractDetailsPage() {
//   const { themeStretch } = useSettingsContext();
//   const { id } = useParams();
//   const [abstract, setAbstract] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const theme = useTheme();

//   useEffect(() => {
//     const fetchAbstract = async () => {
//       try {
//         const abstractDetails = await getAbstractById(id);
//         setAbstract(abstractDetails);
//         setIsLoading(false);
//       } catch (error) {
//         console.error(error);
//         setIsLoading(false);
//       }
//     };

//     if (id) {
//       fetchAbstract();
//     }
//   }, [id]);

//   return (
//     <>
//       <Helmet>
//         <title>{`Abstract: ${abstract?.title || 'Loading...'} | INTERNATIONAL JOURNAL INDEXING`}</title>
//       </Helmet>

//       <Container maxWidth={themeStretch ? false : 'lg'} style={{ backgroundImage: 'url("https://w0.peakpx.com/wallpaper/855/63/HD-wallpaper-light-purple-plain-background-purple.jpg")', height: 'auto', paddingBottom: '50px' }}>
//         <CustomBreadcrumbs
//           heading="Abstract Details"
//           className="breadcrumb breadcrumb-link"
//           style={{ color: 'white' }}
//           links={[
//             { name: 'Dashboard', href: PATH_DASHBOARD.root, style: { color: 'white' } },
//             { name: 'Abstracts', href: PATH_DASHBOARD.eCommerce.root, style: { color: 'white' } },
//             { name: 'Details', href: PATH_DASHBOARD.eCommerce.shop, style: { color: 'white' } },
//             { name: abstract?.title || 'Loading...', style: { color: '#451245' } },
//           ]}
//         />

//         {!isLoading && abstract ? (
//           <AbstractOverviewTab abstract={abstract} />
//         ) : (
//           <Typography variant="h6" align="center" color="textSecondary">
//             Loading abstract details...
//           </Typography>
//         )}
//       </Container>
//       <br/>
//     </>
//   );
// }
// import { Box, Card, Container, Divider, Grid, Typography } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
// import DOMPurify from 'dompurify';
// import PropTypes from 'prop-types';
// import { useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { useParams } from 'react-router-dom';
// import CustomBreadcrumbs from '../../components/custom-breadcrumbs/CustomBreadcrumbs';
// import { useSettingsContext } from '../../components/settings';
// import { PATH_DASHBOARD } from '../../routes/paths';

// // Import the new controller function
// import { getAbstractById } from '../../controller/abstractController';

// const sanitizeAndFormatDescription = (description) => {
//   if (!description) return '';
//   const cleanText = DOMPurify.sanitize(description, { ALLOWED_TAGS: [] });
//   return cleanText.replace(/\n/g, '<br />');
// };

// // Update component to display Abstract details
// const AbstractOverviewTab = ({ abstract }) => (
//   <Card>
//     <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: '8px' }}>
//       <Grid container spacing={1}>
//         {/* Abstract Details */}
//         <Grid item xs={12}>
//           <Grid container spacing={1}>
//             {abstract.title && (
//               <Grid item xs={12}>
//                 <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{abstract.title}</Typography>
//               </Grid>
//             )}
//             <Grid item xs={12}>
//               <Divider sx={{ my: 2 }} />
//             </Grid>

//             {abstract.journalName && (
//               <Grid item xs={12} md={6}>
//                 <Typography sx={{ fontSize: '0.9rem' }}>
//                   <b>Journal Name:</b> {abstract.journalName}
//                 </Typography>
//               </Grid>
//             )}

//             {abstract.issn && (
//               <Grid item xs={12} md={6}>
//                 <Typography sx={{ fontSize: '0.9rem' }}>
//                   <b>ISSN:</b> {abstract.issn}
//                 </Typography>
//               </Grid>
//             )}

//             {abstract.publisher && (
//               <Grid item xs={12} md={6}>
//                 <Typography sx={{ fontSize: '0.9rem' }}>
//                   <b>Publisher:</b> {abstract.publisher}
//                 </Typography>
//               </Grid>
//             )}

//             {abstract.affiliation && (
//               <Grid item xs={12} md={6}>
//                 <Typography sx={{ fontSize: '0.9rem' }}>
//                   <b>Affiliation:</b> {abstract.affiliation}
//                 </Typography>
//               </Grid>
//             )}

//             {abstract.authorName && (
//               <Grid item xs={12} md={6}>
//                 <Typography sx={{ fontSize: '0.9rem' }}>
//                   <b>Author:</b> {abstract.authorName}
//                 </Typography>
//               </Grid>
//             )}

//             {abstract.articleType && (
//               <Grid item xs={12} md={6}>
//                 <Typography sx={{ fontSize: '0.9rem' }}>
//                   <b>Article Type:</b> {abstract.articleType}
//                 </Typography>
//               </Grid>
//             )}

//             {abstract.linkDOI && (
//               <Grid item xs={12} md={6}>
//                 <Typography sx={{ fontSize: '0.9rem' }}>
//                   <b>DOI Link:</b> <a href={abstract.linkDOI}>{abstract.linkDOI}</a>
//                 </Typography>
//               </Grid>
//             )}

//             {/* Divider before the abstract description */}
//             <Grid item xs={12}>
//               <Divider sx={{ my: 2 }} />
//             </Grid>

//             {abstract.abstract && (
//               <Grid item xs={12}>
//                 <Typography sx={{ fontSize: '0.9rem', textAlign: 'justify' }}>
//                   <b>Abstract:</b>
//                   <span dangerouslySetInnerHTML={{ __html: sanitizeAndFormatDescription(abstract.abstract) }} />
//                 </Typography>
//               </Grid>
//             )}
//           </Grid>
//         </Grid>
//       </Grid>
//     </Box>
//   </Card>
// );

// AbstractOverviewTab.propTypes = {
//   abstract: PropTypes.shape({
//     title: PropTypes.string,
//     journalName: PropTypes.string,
//     issn: PropTypes.string,
//     publisher: PropTypes.string,
//     affiliation: PropTypes.string,
//     authorName: PropTypes.string,
//     articleType: PropTypes.string,
//     abstract: PropTypes.string,
//     linkDOI: PropTypes.string,
//   }).isRequired,
// };

// // Main component to fetch and display abstract details
// export default function AbstractDetailsPage() {
//   const { themeStretch } = useSettingsContext();
//   const { id } = useParams();
//   const [abstract, setAbstract] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const theme = useTheme();

//   useEffect(() => {
//     const fetchAbstract = async () => {
//       try {
//         const abstractDetails = await getAbstractById(id);
//         setAbstract(abstractDetails);
//         setIsLoading(false);
//       } catch (error) {
//         console.error(error);
//         setIsLoading(false);
//       }
//     };

//     if (id) {
//       fetchAbstract();
//     }
//   }, [id]);

//   return (
//     <>
//       <Helmet>
//         <title>{`Abstract: ${abstract?.title || 'Loading...'} | INTERNATIONAL JOURNAL INDEXING`}</title>
//       </Helmet>

//       <Container
//         maxWidth={themeStretch ? false : 'lg'}
//         style={{
//           backgroundImage:
//             'url("https://w0.peakpx.com/wallpaper/855/63/HD-wallpaper-light-purple-plain-background-purple.jpg")',
//           height: 'auto',
//           paddingBottom: '50px',
//         }}
//       >
//         <CustomBreadcrumbs
//           heading="Abstract Details"
//           className="breadcrumb breadcrumb-link"
//           style={{ color: 'white' }}
//           links={[
//             { name: 'Dashboard', href: PATH_DASHBOARD.root, style: { color: 'white' } },
//             { name: 'Abstracts', href: PATH_DASHBOARD.eCommerce.root, style: { color: 'white' } },
//             { name: 'Details', href: PATH_DASHBOARD.eCommerce.shop, style: { color: 'white' } },
//             { name: abstract?.title || 'Loading...', style: { color: '#451245' } },
//           ]}
//         />

//         {!isLoading && abstract ? (
//           <AbstractOverviewTab abstract={abstract} />
//         ) : (
//           <Typography variant="body1" align="center" color="textSecondary">
//             Loading abstract details...
//           </Typography>
//         )}
//       </Container>
//       <br />
//     </>
//   );
// }



import { Box, Card, Container, Divider, Grid, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs/CustomBreadcrumbs';
import { useSettingsContext } from '../../components/settings';
import { PATH_DASHBOARD } from '../../routes/paths';
import { getAbstractById } from '../../controller/abstractController';

const sanitizeAndFormatDescription = (description) => {
  if (!description) return '';
  const cleanText = DOMPurify.sanitize(description, { ALLOWED_TAGS: [] });
  return cleanText.replace(/\n/g, '<br />');
};

const AbstractOverviewTab = ({ abstract, onShare }) => (
  <Card>
    <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: '8px', position: 'relative' }}>
      {/* Share Button */}
      <Button
        variant="outlined"
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          fontSize: '0.9rem',
          padding: '6px 12px',
        }}
        onClick={onShare}
      >
        Share
      </Button>

      <Grid container spacing={1}>
        {/* Abstract Details */}
        <Grid item xs={12}>
          <Grid container spacing={1}>
            {abstract.title && (
              <Grid item xs={12}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{abstract.title}</Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>

            {abstract.journalName && (
              <Grid item xs={12} md={6}>
                <Typography sx={{ fontSize: '0.9rem' }}>
                  <b>Journal Name:</b> {abstract.journalName}
                </Typography>
              </Grid>
            )}

            {abstract.issn && (
              <Grid item xs={12} md={6}>
                <Typography sx={{ fontSize: '0.9rem' }}>
                  <b>ISSN:</b> {abstract.issn}
                </Typography>
              </Grid>
            )}

            {abstract.publisher && (
              <Grid item xs={12} md={6}>
                <Typography sx={{ fontSize: '0.9rem' }}>
                  <b>Publisher:</b> {abstract.publisher}
                </Typography>
              </Grid>
            )}

            {abstract.affiliation && (
              <Grid item xs={12} md={6}>
                <Typography sx={{ fontSize: '0.9rem' }}>
                  <b>Affiliation:</b> {abstract.affiliation}
                </Typography>
              </Grid>
            )}

            {abstract.authorName && (
              <Grid item xs={12} md={6}>
                <Typography sx={{ fontSize: '0.9rem' }}>
                  <b>Author:</b> {abstract.authorName}
                </Typography>
              </Grid>
            )}

            {abstract.articleType && (
              <Grid item xs={12} md={6}>
                <Typography sx={{ fontSize: '0.9rem' }}>
                  <b>Article Type:</b> {abstract.articleType}
                </Typography>
              </Grid>
            )}

            {abstract.linkDOI && (
              <Grid item xs={12} md={6}>
                <Typography sx={{ fontSize: '0.9rem' }}>
                  <b>DOI Link:</b> <a href={abstract.linkDOI}>{abstract.linkDOI}</a>
                </Typography>
              </Grid>
            )}

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>

            {abstract.abstract && (
              <Grid item xs={12}>
                <Typography sx={{ fontSize: '0.9rem', textAlign: 'justify' }}>
                  <b>Abstract:</b>
                  <span dangerouslySetInnerHTML={{ __html: sanitizeAndFormatDescription(abstract.abstract) }} />
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  </Card>
);

AbstractOverviewTab.propTypes = {
  abstract: PropTypes.shape({
    title: PropTypes.string,
    journalName: PropTypes.string,
    issn: PropTypes.string,
    publisher: PropTypes.string,
    affiliation: PropTypes.string,
    authorName: PropTypes.string,
    articleType: PropTypes.string,
    abstract: PropTypes.string,
    linkDOI: PropTypes.string,
  }).isRequired,
  onShare: PropTypes.func.isRequired,
};

// Main component to fetch and display abstract details
export default function AbstractDetailsPage() {
  const { themeStretch } = useSettingsContext();
  const { id } = useParams();
  const [abstract, setAbstract] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchAbstract = async () => {
      try {
        const abstractDetails = await getAbstractById(id);
        setAbstract(abstractDetails);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    if (id) {
      fetchAbstract();
    }
  }, [id]);

  const handleShare = () => {
    if (abstract) {
      const subject = `Abstract: ${abstract.title}`;
      const body = `Check out this abstract from the journal ${abstract.journalName}:\n\n${abstract.abstract}\n\nMore details: ${window.location.href}`;
      window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  };

  return (
    <>
      <Helmet>
        <title>{`Abstract: ${abstract?.title || 'Loading...'} | INTERNATIONAL JOURNAL INDEXING`}</title>
      </Helmet>

      <Container
        maxWidth={themeStretch ? false : 'lg'}
        style={{
          backgroundImage:
            'url("https://w0.peakpx.com/wallpaper/855/63/HD-wallpaper-light-purple-plain-background-purple.jpg")',
          height: 'auto',
          paddingBottom: '50px',
        }}
      >
        <CustomBreadcrumbs
          heading="Abstract Details"
          className="breadcrumb breadcrumb-link"
          style={{ color: 'white' }}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root, style: { color: 'white' } },
            { name: 'Abstracts', href: PATH_DASHBOARD.eCommerce.root, style: { color: 'white' } },
            { name: 'Details', href: PATH_DASHBOARD.eCommerce.shop, style: { color: 'white' } },
            { name: abstract?.title || 'Loading...', style: { color: '#451245' } },
          ]}
        />

        {!isLoading && abstract ? (
          <AbstractOverviewTab abstract={abstract} onShare={handleShare} />
        ) : (
          <Typography variant="body1" align="center" color="textSecondary">
            Loading abstract details...
          </Typography>
        )}
      </Container>
      <br />
    </>
  );
}
