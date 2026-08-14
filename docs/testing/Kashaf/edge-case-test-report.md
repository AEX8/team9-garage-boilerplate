# Edge-Case Test Report

## Test details

- Tester: Kashaf Fatima
- Test date: 13 August 2026
- Application: Team 09 — IBM AI-Powered Consulting Simulation
- Environment: Deployed Vercel application
- URL: https://team9-garage-boilerplate-frontend.vercel.app
- Browser/device: Google Chrome on Windows
- Tested commits:
  - `7ed98d6490c1c06c9b54d4148829df465985abbf`
  - `6cce7a3cce27cbabcd3217de6bc5ea14c812f342`

## Test results

| Test ID | Edge case | Actual result | Status | Evidence |
|---|---|---|---|---|
| EC-01 | Invalid login credentials | Invalid credentials were rejected. The existing authentication error appeared, the user remained on the sign-in page, and protected Team Page content was not displayed. | PASS | ./Kashaf/invalid-login-test.png |
| EC-02 | Existing login validation fails | Required-password and invalid-email validation messages appeared. Authentication did not proceed, and the user remained on the sign-in page. | PASS | ./Kashaf/existing-credential-test.png |
| EC-03 | User accesses the Team Page while logged out | Direct access to `/team` while logged out redirected the user to `/auth/signin`. Protected Team Page information was unavailable. | PASS | Manual observation recorded in this report |
| EC-04 | Sign-up passwords do not match | The `Passwords do not match` message appeared. Account creation did not proceed, no authenticated session was created, and the user remained on sign-up. | PASS | ./Kashaf/password-match.png|
| EC-05 | User completes the forgot-password flow | The reset request succeeded, the confirmation page appeared, the reset email arrived, the password was changed successfully, and the new password worked at sign-in. | PASS | Manual observation recorded in this report |

## Detailed results

### EC-01 — Invalid login credentials

- Status: PASS
- Authentication succeeded: No
- Authentication error displayed: Yes
- User remained on sign-in: Yes
- User redirected to Team Page: No
- Protected content displayed: No

### EC-02 — Existing login validation fails

- Status: PASS
- Required-password message displayed: Yes
- Invalid-email message displayed: Yes
- Authentication proceeded: No
- User remained on sign-in: Yes
- Existing validation remained functional: Yes

### EC-03 — User accesses the Team Page while logged out

- Status: PASS
- Starting route: `/team`
- Final route: `/auth/signin`
- Protected Team Page information displayed: No
- Unauthenticated access granted: No

### EC-04 — Sign-up passwords do not match

- Status: PASS
- Password-mismatch message displayed: Yes
- Account created: No
- Authenticated session created: No
- User redirected to Team Page: No
- Evidence: Manual observation recorded in this repor

### EC-05 — User completes the forgot-password flow

- Status: PASS
- Reset request accepted: Yes
- Confirmation page displayed: Yes
- Reset email received: Yes
- Password changed successfully: Yes
- New password accepted at sign-in: Yes
- Successful sign-in redirected to Team Page: Yes

## Defects found

None.

## Overall result

PASS

## Conclusion

All five documented edge cases passed on the deployed application. Invalid credentials and invalid form submissions did not authenticate the user. The protected Team Page remained inaccessible while logged out. Password mismatch prevented account creation, and the complete forgot-password flow successfully allowed the registered user to reset the password and sign in using the new password.