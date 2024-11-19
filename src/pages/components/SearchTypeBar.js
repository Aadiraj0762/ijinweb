// import { Button, Card, FormControlLabel, Grid, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
// import { styled, useTheme } from '@mui/material/styles';
// import { collection, getDocs, query, where } from 'firebase/firestore';
// import { useCallback, useEffect, useState } from 'react';
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

// export default function SearchTypeBar() {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const [searchType, setSearchType] = useState('abstracts');
//   const [field, setField] = useState('in-all-fields');
//   const [searchText, setSearchText] = useState('');

//   // State for counts
//   const [totalJournals, setTotalJournals] = useState(0);
//   const [totalConferences, setTotalConferences] = useState(0);
//   const [totalAbstracts, setTotalAbstracts] = useState(0);
//   const [totalCountries, setTotalCountries] = useState(0);
//   const [totalAbstractsConference, setTotalAbstractsConference] = useState(0);
//   const handleSearchTypeChange = (event) => {
//     setSearchType(event.target.value);
//     setField('in-all-fields');
//   };

//   // Mapping of field options to Firestore fields for journals and conferences
//   const FIELD_MAPPINGS = {
//     abstracts: {
//       'in-all-fields': null,
//       'title': 'title',
//       'issn': 'issnOnline',
//       'subject': 'discipline',
//       'author': 'authorName',
//       'publisher': 'publisher',
//       'country-of-publisher': 'country',
//       'keywords': 'keywords'
//     },
//     conferences: {
//       'in-all-fields': null,
//       'title': 'title',
//       'authors': 'authors'
//     }
//   };


//   // Function to fetch counts based on the selected search type
//   const fetchCounts = useCallback(async () => {
//     try {
//       if (searchType === 'abstracts') {
//         // Fetch total journals
//         const journalsSnapshot = await getDocs(collection(firestore, 'journals'));
//         setTotalJournals(journalsSnapshot.size);

//         // Fetch total abstracts
//         const abstractsSnapshot = await getDocs(collection(firestore, 'abstracts'));
//         setTotalAbstracts(abstractsSnapshot.size);

//         // Fetch total countries represented
//         const journalsRef = collection(firestore, 'abstracts');
//         const journalsSnapshotForCountries = await getDocs(journalsRef);
//         const uniqueCountries = new Set();
//         journalsSnapshotForCountries.forEach((doc) => {
//           const data = doc.data();
//           if (data.country) {
//             uniqueCountries.add(data.country);
//           }
//         });
//         setTotalCountries(uniqueCountries.size);

//       } else if (searchType === 'conferences') {
//         // Fetch total conferences
//         const conferencesSnapshot = await getDocs(collection(firestore, 'abstractsConference'));
//         setTotalConferences(conferencesSnapshot.size);

//         // Fetch total abstracts
//         const abstractsSnapshot = await getDocs(collection(firestore, 'abstracts'));
//         setTotalAbstracts(abstractsSnapshot.size);

//         // Fetch total abstracts for conferences
//         const abstractsConferenceSnapshot = await getDocs(collection(firestore, 'abstractsConference'));
//         setTotalAbstractsConference(abstractsConferenceSnapshot.size);

//         // Fetch total countries represented
//         const conferencesRef = collection(firestore, 'abstractsConference');
//         const conferencesSnapshotForCountries = await getDocs(conferencesRef);
//         const uniqueCountriesConference = new Set();
//         conferencesSnapshotForCountries.forEach((doc) => {
//           const data = doc.data();
//           if (data.country) {
//             uniqueCountriesConference.add(data.country);
//           }
//         });
//         setTotalCountries(uniqueCountriesConference.size);
//       }
//     } catch (error) {
//       console.error('Error fetching counts:', error);
//     }
//   }, [searchType]); // Add `searchType` as a dependency for `useCallback`

//   // Fetch counts when the component mounts and when searchType changes
//   useEffect(() => {
//     fetchCounts();
//   }, [fetchCounts]);

//   const handleSearch = async () => {
//     try {
//       const collectionRef = collection(firestore, searchType);
//       const fieldName = FIELD_MAPPINGS[searchType][field];

//       let results = [];

//       if (fieldName && searchText.trim()) {
//         // Specific field search
//         const q = query(collectionRef, where(fieldName, '==', searchText.trim()));
//         const querySnapshot = await getDocs(q);
//         results = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//       } else if (!fieldName && searchText.trim()) {
//         // "All in one" search across multiple fields
//         const searchFields = Object.values(FIELD_MAPPINGS[searchType]).filter((f) => f);

//         // Renaming inner variable to avoid shadowing
//         const searchPromises = searchFields.map((searchField) =>
//           getDocs(query(collectionRef, where(searchField, '==', searchText.trim())))
//         );

//         const querySnapshots = await Promise.all(searchPromises);

//         // Combine results from all queries, ensuring no duplicates
//         const combinedResults = [];
//         const seenIds = new Set();

//         querySnapshots.forEach((snapshot) => {
//           snapshot.forEach((doc) => {
//             if (!seenIds.has(doc.id)) {
//               seenIds.add(doc.id);
//               combinedResults.push({ id: doc.id, ...doc.data() });
//             }
//           });
//         });

//         results = combinedResults;
//       } else {
//         // Default case, should not fetch all documents in "all fields"
//         results = [];
//       }

//       // Navigate to the search results page with the filtered results
//       navigate('/search-results', { state: { results, searchType } });
//     } catch (error) {
//       console.error('Error fetching search results:', error);
//     }
//   };

//   const fieldOptions = searchType === 'abstracts'
//     ? ['In all fields', 'Title', 'ISSN', 'Author', 'Subject', 'Publisher', 'Country of publisher', 'Keywords']
//     : ['In all fields', 'Title', 'Authors'];

//   return (
//     <>
//     <StyledRoot >
//       <StyledCard>
//         <Grid container spacing={2} justifyContent="center" alignItems="center">
//           <Grid item>
//             <RadioGroup row value={searchType} onChange={handleSearchTypeChange}>
//               <FormControlLabel value="abstracts" control={<Radio />} label="abstractsJournals" />
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
//     </>
//   );
// }
import { Box, Button, Card, CircularProgress, Divider, FormControlLabel, Grid, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firestore from '../../config-global';

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

export default function SearchTypeBar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState('abstracts');
  const [field, setField] = useState('in-all-fields');
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const FIELD_MAPPINGS = {
    abstracts: {
      'in-all-fields': null,
      title: 'title',
      issn: 'issnOnline',
      subject: 'discipline',
      author: 'authorName',
      publisher: 'publisher',
      'country-of-publisher': 'country',
      keywords: 'keywords',
    },
    conferences: {
      'in-all-fields': null,
      title: 'title',
      authors: 'authors',
    },
  };

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
    setField('in-all-fields');
  };

  const handleSearch = async () => {
    setLoading(true); // Start loading
    try {
      const collectionRef = collection(firestore, searchType);
      const fieldName = FIELD_MAPPINGS[searchType][field];
      let results = [];

      if (fieldName && searchText.trim()) {
        // Specific field search
        const q = query(collectionRef, where(fieldName, '==', searchText.trim()));
        const querySnapshot = await getDocs(q);
        results = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } else if (!fieldName && searchText.trim()) {
        // "All in one" search across multiple fields
        const searchFields = Object.values(FIELD_MAPPINGS[searchType]).filter((f) => f);
        const searchPromises = searchFields.map((searchField) =>
          getDocs(query(collectionRef, where(searchField, '==', searchText.trim())))
        );

        const querySnapshots = await Promise.all(searchPromises);
        const combinedResults = [];
        const seenIds = new Set();

        querySnapshots.forEach((snapshot) => {
          snapshot.forEach((doc) => {
            if (!seenIds.has(doc.id)) {
              seenIds.add(doc.id);
              combinedResults.push({ id: doc.id, ...doc.data() });
            }
          });
        });

        results = combinedResults;
      }

      // Navigate to the search results page with the filtered results
      navigate('/search-results', { state: { results, searchType } });
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false); // Stop loading after search completes
    }
  };

  const fieldOptions =
    searchType === 'abstracts'
      ? ['In all fields', 'Title', 'ISSN', 'Author', 'Subject', 'Publisher', 'Country of publisher', 'Keywords']
      : ['In all fields', 'Title', 'Authors'];

  return (
    <StyledRoot>
      <StyledCard>
      <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Divider />
            <Typography variant="h1" color="#0e238b" mb={1}>
              INTERNATIONAL JOURNAL INDEXING
            </Typography>
            <Divider />

            {/* {breadcrumbs} */}
          </Box>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item>
            <RadioGroup row value={searchType} onChange={handleSearchTypeChange}>
              <FormControlLabel value="abstracts" control={<Radio />} label="Abstract Journals" />
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
            <Button
              variant="contained"
              sx={{ height: '100%', backgroundColor: theme.palette.primary.main }}
              onClick={handleSearch}
              disabled={loading} // Disable button during loading
            >
              {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'SEARCH'}
            </Button>
          </Grid>
        </Grid>
      </StyledCard>
    </StyledRoot>
  );
}
