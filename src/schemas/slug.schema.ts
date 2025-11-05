import * as yup from 'yup';

/**
 * Schema for validating slug format
 * Slug format: lowercase letters, numbers, and hyphens only
 * Must start with a letter, no consecutive hyphens
 */
export const slugSchema = yup.string()
  .required('Slug is required')
  .matches(
    /^[a-z][a-z0-9-]*$/,
    'Slug must start with a lowercase letter and contain only lowercase letters, numbers, and hyphens'
  )
  .test('no-consecutive-hyphens', 'Slug cannot contain consecutive hyphens', (value) => {
    if (!value) return false;
    return !value.includes('--');
  })
  .test('no-trailing-hyphen', 'Slug cannot end with a hyphen', (value) => {
    if (!value) return false;
    return !value.endsWith('-');
  });
