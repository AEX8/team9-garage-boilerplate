# Edge-Case Test Script

## Feature

Authentication and protected Team Page edge cases

## Application

Team 09 — IBM AI-Powered Consulting Simulation

## Test environment

- Tester: Kashaf Fatima
- Test date: 13 August 2026
- Browser/device: Google Chrome on Windows
- Environment: Deployed Vercel application
- URL: https://team9-garage-boilerplate-frontend.vercel.app
- Tested commits: 7ed98d6490c1c06c9b54d4148829df465985abbf | 6cce7a3cce27cbabcd3217de6bc5ea14c812f342

## Preconditions

1. The latest approved application is deployed.
2. Firebase Authentication is available.
3. A registered and verified test account exists.
4. The tester knows the current test-account password.
5. A fresh Incognito window is available for logged-out testing.
6. No passwords or Firebase credentials are recorded in evidence.

---

## EC-01 — Invalid login credentials

### Purpose

Verify that incorrect credentials do not authenticate the user or provide access to the protected Team Page.

### Steps

1. Open `/auth/signin`.
2. Enter a correctly formatted email address.
3. Enter an incorrect, non-empty password.
4. Select **Sign In**.
5. Observe the displayed error and final URL.

### Expected behaviour

- Authentication fails.
- The existing authentication error is displayed.
- The user remains on `/auth/signin`.
- The user is not redirected to `/team`.
- Protected Team Page content is not displayed.

---

## EC-02 — Existing login validation fails

### Purpose

Verify that the existing login validation remains functional.

### Steps

1. Open `/auth/signin`.
2. Leave Email and Password empty.
3. Select **Sign In**.
4. Record the displayed validation messages.
5. Enter an invalid email format such as `invalid-email`.
6. Leave Password empty.
7. Select **Sign In** again.
8. Observe the validation messages and final URL.

### Expected behaviour

- Required-password validation appears.
- Invalid-email validation appears.
- Authentication does not proceed.
- The user remains on `/auth/signin`.
- Existing validation remains functional.
- The user is not redirected to `/team`.

---

## EC-03 — User accesses the Team Page while logged out

### Purpose

Verify that the Team Page cannot be accessed without an authenticated session.

### Steps

1. Sign out of the application.
2. Open a fresh Incognito window.
3. Enter `/team` directly in the address bar.
4. Allow the request to finish.
5. Observe the final URL and displayed page.

### Expected behaviour

- The user is redirected to `/auth/signin`.
- Protected Team Page information is unavailable.
- Team member content is not displayed.
- The application does not provide unauthenticated access to `/team`.

---

## EC-04 — Sign-up passwords do not match

### Purpose

Verify that an account cannot be created when Password and Confirm password contain different values.

### Steps

1. Open `/auth/signup`.
2. Enter a valid full name.
3. Enter an unused, correctly formatted email address.
4. Enter a valid password in Password.
5. Enter a different value in Confirm password.
6. Select **Create account**.
7. Observe the displayed validation message and final page.

### Expected behaviour

- `Passwords do not match` appears.
- Account creation does not proceed.
- The user remains on the sign-up page.
- No authenticated session is created.
- The user is not redirected to `/team`.

---

## EC-05 — User completes the forgot-password flow

### Purpose

Verify that a registered user can request a password reset and subsequently sign in with the new password.

### Steps

1. Open `/auth/forgot-password`.
2. Enter the email address of a registered account.
3. Select **Send reset link**.
4. Confirm that the inbox-notification page appears.
5. Open the registered account’s email inbox.
6. Open the Firebase password-reset email.
7. Follow the reset link.
8. Enter and confirm a new valid password.
9. Complete the password reset.
10. Return to `/auth/signin`.
11. Enter the registered email and new password.
12. Select **Sign In**.

### Expected behaviour

- The reset request succeeds.
- The confirmation page appears.
- The reset email arrives.
- Firebase accepts the new password.
- The new password works during sign-in.
- Successful authentication redirects the user to `/team`.