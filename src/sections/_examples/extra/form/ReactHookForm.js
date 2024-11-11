import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import {
  Backdrop,
  CircularProgress,
  Grid,
  Stack,
  Typography
} from '@mui/material';
// components
import FormProvider, {
  RHFCheckbox,
  RHFEditor,
  RHFSwitch,
  RHFTextField,
  RHFUpload
} from '../../../../components/hook-form';
//
import { FormSchema } from './schema';
import ValuesPreview from './ValuesPreview';

// ----------------------------------------------------------------------

export const defaultValues = {
  journalTitle: '',
  abbreviation: '',
  journalURL: '',
  issnPrint: '',
  issnOnline: '',
  publisher: '',
  discipline: '',
  chiefEditor: '',
  emailId: '',
  country: '',
  language: '',
  frequency: '',
  yearOfStarting: '',
  articleFormat: '',
  licenseType: '',
  coverImage: null,
  description: '',
  normalProcessing: false,
  fastTrackProcessing: false,
};

ReactHookForm.propTypes = {
  debug: PropTypes.bool,
};

export default function ReactHookForm({ debug }) {
  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });

  const {
    watch,
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log('DATA', data);
    reset();
  };

  const handleDropSingleFile = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (newFile) {
        setValue('coverImage', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <>
      {isSubmitting && (
        <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
          <CircularProgress color="primary" />
        </Backdrop>
      )}

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Block>
                <RHFTextField name="journalTitle" label="Journal Title*" />
              </Block>

              <Block>
                <RHFTextField name="abbreviation" label="Abbreviation" />
              </Block>

              <Block>
                <RHFTextField name="journalURL" label="Journal URL" />
              </Block>

              <Block>
                <RHFTextField name="issnPrint" label="ISSN (Print Version)" />
              </Block>

              <Block>
                <RHFTextField name="issnOnline" label="ISSN (Online Version)" />
              </Block>

              <Block>
                <RHFTextField name="publisher" label="Publisher / Co-Publisher" />
              </Block>

              <Block>
                <RHFTextField name="discipline" label="Discipline" />
              </Block>

              <Block>
                <RHFTextField name="chiefEditor" label="Chief Editor" />
              </Block>

              <Block>
                <RHFTextField name="emailId" label="Email Id" />
              </Block>

              <Block>
                <RHFTextField name="country" label="Country" />
              </Block>

              <Block>
                <RHFTextField name="language" label="Language" />
              </Block>

              <Block>
                <RHFTextField name="frequency" label="Frequency" />
              </Block>

              <Block>
                <RHFTextField name="yearOfStarting" label="Year of Starting" />
              </Block>

              <Block>
                <RHFTextField name="articleFormat" label="Article Format" />
              </Block>

              <Block>
                <RHFTextField name="licenseType" label="License Type" />
              </Block>

              <Block label="Cover Image">
                <RHFUpload
                  name="coverImage"
                  maxSize={3145728}
                  onDrop={handleDropSingleFile}
                  onDelete={() => setValue('coverImage', null, { shouldValidate: true })}
                />
              </Block>

              <Block>
                <RHFEditor
                  name="description"
                  label="Description (Not exceeding 200 words)"
                  maxLength={200}
                  sx={{ height: 200 }}
                />
              </Block>

              <Block>
                <RHFCheckbox name="normalProcessing" label="Normal Processing" />
              </Block>

              <Block>
                <RHFSwitch name="fastTrackProcessing" label="Fast-track / Priority Processing" />
              </Block>

              <LoadingButton
                fullWidth
                color="info"
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Submit
              </LoadingButton>
            </Stack>
          </Grid>

          {/* You can add more fields or sections in the second Grid item if necessary */}
          <Grid item xs={12} md={6}>
            {/* Placeholder for additional content if needed */}
          </Grid>
        </Grid>

        {debug && <ValuesPreview />}
      </FormProvider>
    </>
  );
}

// ----------------------------------------------------------------------

Block.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
  sx: PropTypes.object,
};

function Block({ label = 'Field', sx, children }) {
  return (
    <Stack spacing={1} sx={{ width: 1, ...sx }}>
      <Typography
        variant="caption"
        sx={{
          textAlign: 'right',
          fontStyle: 'italic',
          color: 'text.disabled',
        }}
      >
        {label}
      </Typography>
      {children}
    </Stack>
  );
}
