# Happy-Path Test Script

## Feature

Valid Login → Protected Team Page → Sign Out

## Primary tester

Kashaf Fatima — Dev 2

## Purpose

This script verifies the Team Page, redirect, route protection and sign-out functionality implemented by Ibrahim Allouche.

Authentication-page presentation and validation were implemented by Kashaf Fatima and therefore require an independent tester.

## Test environment

- Application: Team 09 — IBM AI-Powered Consulting Simulation
- Environment: Final deployed application
- Deployed URL: (https://team9-garage-boilerplate-frontend.vercel.app/auth/signin)
- Tested commit: 1c89653ae485ca33d485e3e63372e012b7ff0a6b
- Test date: 13 August 2026
- Browser: Google Chrome
- Tester device: Windows computer
- Account: Verified Firebase test account

## Preconditions

1. The latest approved `main` branch is deployed.
2. Firebase Authentication is functioning.
3. The test account exists and its email is verified.
4. The tester begins signed out.
5. A fresh Incognito window or cleared browser session is used.
6. No password or Firebase credential is visible in recorded evidence.
7. All five Team 9 member records are present.

## HP-01 — Logged-out user reaches sign-in

### Steps

1. Open a fresh Incognito window.
2. Enter the deployed `/team` URL directly.
3. Allow the page to finish loading.
4. Observe the final URL and displayed page.

### Expected result

- The user is redirected to `/auth/signin`.
- The Team Page is not accessible.
- Protected team information is not displayed.
- The styled sign-in page loads successfully.

## HP-02 — Valid login redirects to Team Page

### Steps

1. Enter the email address of a verified Firebase test account.
2. Enter the correct password.
3. Select **Sign In**.
4. Wait for authentication and navigation to complete.
5. Observe the final URL.

### Expected result

- Authentication succeeds.
- The user is redirected to `/team`.
- The user is not redirected to the old dashboard.
- No login error appears.
- The protected Team Page loads.

## HP-03 — Required Team Page content

### Steps

1. Inspect the heading and introductory text.
2. Inspect all five top member cards.
3. Scroll through the complete lower biography section.
4. Check every name, role, photo and blurb.

### Expected result

The page displays:

1. Gayath Wethmin Kaluwahewa — Project Manager
2. Fatima Hubail — Business Analyst
3. Amritha Selvaganapathi — UX Designer
4. Kashaf Fatima — Developer
5. Ibrahim Allouche — Developer

For each member:

- The name is spelled correctly.
- The role is correct.
- The photo loads.
- The short blurb is readable.
- The lower biography information is available.
- No broken-image icon appears.
- No text is clipped or overlapping.

## HP-04 — Visual consistency and responsiveness

### Steps

1. View the Team Page at desktop width.
2. Reduce the browser width to approximately 390 pixels.
3. Scroll through the complete page.
4. Return to desktop width.

### Expected result

- The Team Page uses the approved cream, blue and purple visual language.
- Member cards rearrange for smaller screens.
- No horizontal overflow occurs.
- Text remains readable.
- Images retain appropriate proportions.
- Controls remain usable.

## HP-05 — Sign-out

### Steps

1. Select **Sign out**.
2. Observe the resulting page.
3. Enter `/team` directly again.
4. Use the browser Back button and refresh.

### Expected result

- The authenticated session ends.
- The user is returned to sign-in.
- Direct access to `/team` redirects to `/auth/signin`.
- Browser Back does not restore usable protected content after refresh.
- The user remains signed out.

## Independent authentication check

The following must be completed by someone other than Kashaf Fatima:

- Sign-in page matches the approved design.
- Existing login validation remains functional.
- Invalid-login feedback appears correctly.
- Sign-up password confirmation works.
- Forgot-password flow works.

Independent tester: Ibrahim Allouche

