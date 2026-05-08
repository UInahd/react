# Registration Validation Update

## Overview

This document describes the validation updates implemented in `src/pages/RegisterPage.tsx` for the admin registration flow.

The goal of this update is to improve form input quality and user experience by enforcing strict validation rules and providing immediate visual feedback while users type.

## Files Updated

- `src/pages/RegisterPage.tsx`

## Validation Rules Implemented

### Name Fields

- `firstName` and `lastName` are required.
- `middleName` is optional.
- Each name field accepts only alphabetic characters.
- Inputs are sanitized on change to remove numeric and special characters.
- Each name field requires a minimum of 2 letters.
- The UI displays a live acceptance icon (`✅`) or warning icon (`⚠️`) as the user types.

### Password Field

- Password now requires all of the following:
  - at least 8 characters
  - at least one uppercase letter
  - at least one numeric digit
  - at least one symbol
- Live feedback icons are shown while typing.
- A validation message appears when the password does not meet the rule.
- The password field includes an eye icon toggle to show or hide the entered password.
- The confirm password field also includes a show/hide toggle.

### Birthdate / Age

- The previous age numeric input was replaced with a `birthdate` input using `type="date"`.
- The form calculates the user's age from the selected birthdate.
- The birthdate must be valid and cannot be empty.
- If the birthdate produces an invalid or non-positive age, the form displays an error message.

### Gender

- Gender selection now only allows two options:
  - `Male`
  - `Female`

### Email and Mobile

- Email is required and captured using a standard email field.
- Mobile is required and sanitized to accept only digits.
- Non-numeric characters are stripped from the mobile input as the user types.

## User Experience Improvements

- Live validation feedback reduces guesswork and helps users fix invalid fields immediately.
- Validation messages are displayed inline under the relevant fields.
- The password visibility toggle improves usability on password entry.

## Implementation Details

### Name Validation

- Sanitization is handled by `sanitizeName()` to remove non-letter characters.
- Validation is handled by `isNameValid(value)` using the regex `^[A-Za-z]{2,}$`.
- Feedback text is generated using `getNameValidationText(value, label)`.

### Password Validation

- Validation is handled by `isPasswordValid(value)` using the regex:
  - `/^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/`
- The feedback text is provided by `getPasswordValidationText()`.
- Visibility toggles use `showPassword` and `showConfirmPassword` state values.

### Birthdate / Age Calculation

- The `calculateAge(dateString)` helper computes age from the selected date.
- It checks that the birthdate is valid and accounts for month/day differences.

## Validation Flow on Submit

The registration form includes both live field validation and final onsubmit validation.

On submit, the form performs the full validation sequence before allowing registration to continue. This ensures that even if a user bypasses the live UI checks, the required rules are still enforced.

The submit handler validates in this order:

1. Password and confirm password match.
2. Password meets complexity rules.
3. `firstName` and `lastName` are both valid.
4. Optional `middleName`, if provided, is valid.
5. Birthdate is provided and age is valid.
6. Gender is selected.
7. Email and mobile are provided.

If any validation fails during submit, the form stops submission and displays a top-level error message.

### Onsubmit Validation Details

- The `handleSubmit` function is responsible for final validation.
- It validates password strength and confirm password matching.
- It validates name field length and alphabetic-only content.
- It validates the birthdate and computed age.
- It validates gender selection, email presence, and mobile presence.
- If any condition fails, the form sets a single error string and prevents navigation.

## Notes

- This update focuses on client-side validation and user feedback.
- Server-side validation should still be added for security and data integrity if registration data is persisted beyond the front-end.
- Adding explicit error state for each field could be a next enhancement to make the experience even more robust.
