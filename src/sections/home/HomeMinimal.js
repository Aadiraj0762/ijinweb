// import { Button, Card, Container, FormControlLabel, Grid, MenuItem, Radio, RadioGroup, Select, Stack, TextField } from '@mui/material';
// import { styled, useTheme } from '@mui/material/styles';
// import { useState } from 'react';
// import { MotionViewport } from '../../components/animate';
// import { EcommerceWidgetSummary } from '../@dashboard/general/e-commerce';

// const CARDS = [
//   {
//     icon: ' /assets/icons/home/ic_make_brand.svg',
//     title: 'Branding',
//     description: 'Consistent design makes it easy to brand your own.',
//   },
//   {
//     icon: ' /assets/icons/home/ic_design.svg',
//     title: 'UI & UX Design',
//     description:
//       'The kit is built on the principles of the atomic design system. It helps you to create projects fastest and easily customized packages for your projects.',
//   },
//   {
//     icon: ' /assets/icons/home/ic_development.svg',
//     title: 'Development',
//     description: 'Easy to customize and extend, saving you time and money.',
//   },
// ];

// const StyledRoot = styled('div')(({ theme }) => ({
//   padding: theme.spacing(10, 0),
//   [theme.breakpoints.up('md')]: {
//     padding: theme.spacing(15, 0),
//   },
// }));

// const StyledCard = styled(Card)(({ theme }) => ({
//   backgroundColor: theme.palette.background.default,
//   textAlign: 'center',
//   padding: theme.spacing(10, 5),
//   [theme.breakpoints.up('md')]: {
//     boxShadow: 'none',
//   },
// }));

// export default function HomeMinimal() {
//   const theme = useTheme();
//   const [searchType, setSearchType] = useState('journals');
//   const [field, setField] = useState('in-all-fields');  // Set initial value to 'In all fields'

//   const handleSearchTypeChange = (event) => {
//     setSearchType(event.target.value);
//     setField('in-all-fields'); // Reset the field when the search type changes
//   };

//   const fieldOptions = searchType === 'journals' 
//     ? ['In all fields', 'Title', 'ISSN', 'Subject', 'Publisher', 'Country of publisher','Keywords'] 
//     : ['In all fields', 'Title','Authors',];
//   return (
//     <StyledRoot>

//                 <StyledCard>
//             <Grid container spacing={2} justifyContent="center" alignItems="center">
//               <Grid item>
//                 <RadioGroup row value={searchType} onChange={handleSearchTypeChange}>
//                   <FormControlLabel value="journals" control={<Radio />} label="Journals" />
//                   <FormControlLabel value="conference" control={<Radio />} label="Conference" />
//                 </RadioGroup>
//               </Grid>

//               <Grid item xs={12} md={4}>
//                 <TextField
//                   fullWidth
//                   variant="outlined"
//                   label="Search"
//                 />
//               </Grid>

//               <Grid item>
//                 <Select
//                   value={field}
//                   onChange={(e) => setField(e.target.value)}
//                   displayEmpty
//                   inputProps={{ 'aria-label': 'Without label' }}
//                 >
//                   {fieldOptions.map((option) => (
//                     <MenuItem key={option} value={option.toLowerCase().replace(/\s+/g, '-')}>
//                       {option}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </Grid>

//               <Grid item>
//                 <Button variant="contained" sx={{ height: '100%', backgroundColor: theme.palette.warning.main }}>
//                   SEARCH
//                 </Button>
//               </Grid>
//             </Grid>
//           </StyledCard>
//       <Container component={MotionViewport}>
//         <Stack
//           spacing={1}
//           sx={{
//             textAlign: 'center',
//             mb: { xs: 5, md: 10 },
//           }}
//         >
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={4}>
//               <EcommerceWidgetSummary
//                 title="Total Journal"
//                 percent={5}
//                 total={5}
//                 chart={{
//                   colors: [theme.palette.primary.main],
//                   series: [22, 8, 35, 50, 82, 84, 77, 12, 87, 43],
//                 }}
//               />
//             </Grid>

//             <Grid item xs={12} md={4}>
//               <EcommerceWidgetSummary
//                 title="Total Articles"
//                 percent={5}
//                 total={5}
//                 chart={{
//                   colors: [theme.palette.info.main],
//                   series: [56, 47, 40, 62, 73, 30, 23, 54, 67, 68],
//                 }}
//               />
//             </Grid>

//             <Grid item xs={12} md={4}>
//               <EcommerceWidgetSummary
//                 title="Country Represented"
//                 percent={1}
//                 total={1}
//                 chart={{
//                   colors: [theme.palette.warning.main],
//                   series: ['india:',40 , 70, 75, 70, 50, 28, 7, 64, 38, 27],
//                 }}
//               />
//             </Grid>
//           </Grid>
//         </Stack>
//       </Container>
//     </StyledRoot>
//   );
// }



// import { Button, Card, FormControlLabel, Grid, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
// import { styled, useTheme } from '@mui/material/styles';
// import { collection, getDocs, query, where } from 'firebase/firestore';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import firestore from '../../config-global';

// const StyledRoot = styled('div')(({ theme }) => ({
//   padding: theme.spacing(10, 0),
//   [theme.breakpoints.up('md')]: {
//     padding: theme.spacing(15, 0),
//   },
// }));

// const StyledCard = styled(Card)(({ theme }) => ({
//   backgroundColor: theme.palette.background.default,
//   textAlign: 'center',
//   padding: theme.spacing(10, 5),
//   [theme.breakpoints.up('md')]: {
//     boxShadow: 'none',
//   },
// }));

// export default function HomeMinimal() {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const [searchType, setSearchType] = useState('journals');
//   const [field, setField] = useState('in-all-fields');
//   const [searchText, setSearchText] = useState('');

//   const handleSearchTypeChange = (event) => {
//     setSearchType(event.target.value);
//     setField('in-all-fields');
//   };

//   // Mapping of field options to Firestore fields for journals and conferences
//   const FIELD_MAPPINGS = {
//     journals: {
//       'in-all-fields': null,
//       'title': 'title',
//       'issn': 'issnOnline',
//       'subject': 'discipline',
//       'author': 'chiefEditor', // Adjusted to match Firestore field name
//       'publisher': 'publisher',
//       'country-of-publisher': 'country',
//       'keywords': 'keywords'
//     },
//     conferences: { // Note plural form here for collection name
//       'in-all-fields': null,
//       'title': 'title',
//       'authors': 'authors'
//     }
//   };

//   const handleSearch = async () => {
//     try {
//       const collectionRef = collection(firestore, searchType); // Select collection based on search type (journals/conferences)
//       const fieldName = FIELD_MAPPINGS[searchType][field]; // Get the actual Firestore field name

//       let q;
//       if (fieldName && searchText.trim()) {
//         // Strict comparison for selected field and search text
//         q = query(collectionRef, where(fieldName, '==', searchText.trim()));
//       } else if (!fieldName) {
//         // Handle full-text search (or any other approach you want for 'In all fields')
//         q = query(collectionRef); // Basic query without filtering
//       }

//       // const querySnapshot = await getDocs(q);
//       // const results = querySnapshot.docs.map((doc) => doc.data());
//       const querySnapshot = await getDocs(q);
//       const results = querySnapshot.docs.map((doc) => ({
//         id: doc.id, // Add the Firestore document ID here
//         ...doc.data(), 
//         // Spread the document data
//       }));      

//       // Navigate to the search results page with state
//       navigate('/search-results', { state: { results, searchType } });
//     } catch (error) {
//       console.error('Error fetching search results:', error);
//     }
//   };

//   const fieldOptions = searchType === 'journals'
//     ? ['In all fields', 'Title', 'ISSN', 'Author', 'Subject', 'Publisher', 'Country of publisher', 'Keywords']
//     : ['In all fields', 'Title', 'Authors'];

//   return (
//     <StyledRoot>
//       <StyledCard>
//         <Grid container spacing={2} justifyContent="center" alignItems="center">
//           <Grid item>
//             <RadioGroup row value={searchType} onChange={handleSearchTypeChange}>
//               <FormControlLabel value="journals" control={<Radio />} label="Journals" />
//               <FormControlLabel value="conferences" control={<Radio />} label="Conferences" />
//             </RadioGroup>
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <TextField
//               fullWidth
//               variant="outlined"
//               label="Search"
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//             />
//           </Grid>

//           <Grid item>
//             <Select
//               value={field}
//               onChange={(e) => setField(e.target.value)}
//               displayEmpty
//               inputProps={{ 'aria-label': 'Without label' }}
//             >
//               {fieldOptions.map((option) => (
//                 <MenuItem key={option} value={option.toLowerCase().replace(/\s+/g, '-')}>
//                   {option}
//                 </MenuItem>
//               ))}
//             </Select>
//           </Grid>

//           <Grid item>
//             <Button variant="contained" sx={{ height: '100%', backgroundColor: theme.palette.primary.main }} onClick={handleSearch}>
//               SEARCH
//             </Button>
//           </Grid>
//         </Grid>
//       </StyledCard>
//     </StyledRoot>
//   );
// }

import { Button, Card, FormControlLabel, Grid, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firestore from '../../config-global';
import { EcommerceWidgetSummary } from '../@dashboard/general/e-commerce'; // Assuming this is the correct path

const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  textAlign: 'center',
  padding: theme.spacing(10, 5),
  [theme.breakpoints.up('md')]: {
    boxShadow: 'none',
  },
}));

export default function HomeMinimal() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState('journals');
  const [field, setField] = useState('in-all-fields');
  const [searchText, setSearchText] = useState('');

  // State for counts
  const [totalJournals, setTotalJournals] = useState(0);
  const [totalConferences, setTotalConferences] = useState(0);
  const [totalAbstracts, setTotalAbstracts] = useState(0);
  const [totalCountries, setTotalCountries] = useState(0);
  const [totalAbstractsConference, setTotalAbstractsConference] = useState(0);
  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
    setField('in-all-fields');
  };

  // Mapping of field options to Firestore fields for journals and conferences
  const FIELD_MAPPINGS = {
    journals: {
      'in-all-fields': null,
      'title': 'title',
      'issn': 'issnOnline',
      'subject': 'discipline',
      'author': 'chiefEditor',
      'publisher': 'publisher',
      'country-of-publisher': 'country',
      'keywords': 'keywords'
    },
    conferences: {
      'in-all-fields': null,
      'title': 'title',
      'authors': 'authors'
    }
  };


  // Function to fetch counts based on the selected search type
  const fetchCounts = useCallback(async () => {
    try {
      if (searchType === 'journals') {
        // Fetch total journals
        const journalsSnapshot = await getDocs(collection(firestore, 'journals'));
        setTotalJournals(journalsSnapshot.size);

        // Fetch total abstracts
        const abstractsSnapshot = await getDocs(collection(firestore, 'abstracts'));
        setTotalAbstracts(abstractsSnapshot.size);

        // Fetch total countries represented
        const journalsRef = collection(firestore, 'journals');
        const journalsSnapshotForCountries = await getDocs(journalsRef);
        const uniqueCountries = new Set();
        journalsSnapshotForCountries.forEach((doc) => {
          const data = doc.data();
          if (data.country) {
            uniqueCountries.add(data.country);
          }
        });
        setTotalCountries(uniqueCountries.size);

      } else if (searchType === 'conferences') {
        // Fetch total conferences
        const conferencesSnapshot = await getDocs(collection(firestore, 'conferences'));
        setTotalConferences(conferencesSnapshot.size);

        // Fetch total abstracts
        const abstractsSnapshot = await getDocs(collection(firestore, 'abstracts'));
        setTotalAbstracts(abstractsSnapshot.size);

        // Fetch total abstracts for conferences
        const abstractsConferenceSnapshot = await getDocs(collection(firestore, 'abstractsConference'));
        setTotalAbstractsConference(abstractsConferenceSnapshot.size);

        // Fetch total countries represented
        const conferencesRef = collection(firestore, 'conferences');
        const conferencesSnapshotForCountries = await getDocs(conferencesRef);
        const uniqueCountriesConference = new Set();
        conferencesSnapshotForCountries.forEach((doc) => {
          const data = doc.data();
          if (data.country) {
            uniqueCountriesConference.add(data.country);
          }
        });
        setTotalCountries(uniqueCountriesConference.size);
      }
    } catch (error) {
      console.error('Error fetching counts:', error);
    }
  }, [searchType]); // Add `searchType` as a dependency for `useCallback`

  // Fetch counts when the component mounts and when searchType changes
  useEffect(() => {
    fetchCounts();
  }, [fetchCounts]);

  const handleSearch = async () => {
    try {
      const collectionRef = collection(firestore, searchType);
      const fieldName = FIELD_MAPPINGS[searchType][field];

      let q;
      if (fieldName && searchText.trim()) {
        q = query(collectionRef, where(fieldName, '==', searchText.trim()));
      } else if (!fieldName) {
        q = query(collectionRef);
      }

      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      navigate('/search-results', { state: { results, searchType } });
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const fieldOptions = searchType === 'journals'
    ? ['In all fields', 'Title', 'ISSN', 'Author', 'Subject', 'Publisher', 'Country of publisher', 'Keywords']
    : ['In all fields', 'Title', 'Authors'];

  return (
    <StyledRoot sx={{ marginTop: "-175px" }}>
      <StyledCard>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item>
            <RadioGroup row value={searchType} onChange={handleSearchTypeChange}>
              <FormControlLabel value="journals" control={<Radio />} label="Journals" />
              <FormControlLabel value="conferences" control={<Radio />} label="Conferences" />
            </RadioGroup>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              variant="outlined"
              label="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Grid>

          <Grid item>
            <Select
              value={field}
              onChange={(e) => setField(e.target.value)}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              {fieldOptions.map((option) => (
                <MenuItem key={option} value={option.toLowerCase().replace(/\s+/g, '-')}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item>
            <Button variant="contained" sx={{ height: '100%', backgroundColor: theme.palette.primary.main }} onClick={handleSearch}>
              SEARCH
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ marginTop: 2 }}>
  {searchType === 'journals' && (
    <>
      <Grid item xs={12} md={3}>
        <EcommerceWidgetSummary
          sx={{
            backgroundColor: "#02277c",
            color: "white",
            padding: 2, // Adjust padding to reduce inner space
            textAlign: 'center',
          }}
          title="Total Journals"
          total={totalJournals}
          chart={{
            colors: [theme.palette.primary.main],
            series: [totalJournals],
          }}
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <EcommerceWidgetSummary
          sx={{
            backgroundColor: "#02277c",
            color: "white",
            padding: 2, // Adjust padding
            textAlign: 'center',
          }}
          title="Total Abstracts"
          total={totalAbstracts}
          chart={{
            colors: [theme.palette.info.main],
            series: [totalAbstracts],
          }}
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <EcommerceWidgetSummary
          sx={{
            backgroundColor: "#02277c",
            color: "white",
            padding: 2, // Adjust padding
            textAlign: 'center',
          }}
          title="Country Represented"
          total={totalCountries}
          chart={{
            colors: [theme.palette.warning.main],
            series: [totalCountries],
          }}
        />
      </Grid>
    </>
  )}

  {searchType === 'conferences' && (
    <>
      <Grid item xs={12} md={3}>
        <EcommerceWidgetSummary
          sx={{
            backgroundColor: "#02277c",
            color: "white",
            padding: 2, // Adjust padding
            textAlign: 'center',
          }}
          title="Total Conferences"
          total={totalConferences}
          chart={{
            colors: [theme.palette.primary.main],
            series: [totalConferences],
          }}
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <EcommerceWidgetSummary
          sx={{
            backgroundColor: "#02277c",
            color: "white",
            padding: 2, // Adjust padding
            textAlign: 'center',
          }}
          title="Total Abstracts"
          total={totalAbstractsConference}
          chart={{
            colors: [theme.palette.info.main],
            series: [totalAbstractsConference],
          }}
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <EcommerceWidgetSummary
          sx={{
            backgroundColor: "#02277c",
            color: "white",
            padding: 2, // Adjust padding
            textAlign: 'center',
          }}
          title="Country Represented"
          total={totalCountries}
          chart={{
            colors: [theme.palette.warning.main],
            series: [totalCountries],
          }}
        />
      </Grid>
    </>
  )}
</Grid>

      </StyledCard>
    </StyledRoot>
  );
}
