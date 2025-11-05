import * as yup from 'yup';

/**
 * Schema for validating file paths with .sui.ts extension
 */
export const filePathSchema = yup.string()
  .required('File path is required')
  .test('is-sui-ts', 'File must have .sui.ts extension', (value) => {
    if (!value) return false;
    return value.endsWith('.sui.ts');
  });
