# Login → Redirect → Team Page Test Script

## Tester
Ibrahim Allouche

## Test Type
Manual end-to-end test

## Environment
Deployed Vercel application

## Deployed URL
https://team9-garage-boilerplate-frontend.vercel.app/

## Purpose
Verify that the deployed authentication flow correctly protects the team page, redirects authenticated users to the team page, displays the required team content, and allows the user to sign out successfully.

## Preconditions
- The deployed Vercel application is available.
- A valid test account exists.
- The tester starts in an incognito/private browser window.

## Test Steps

### Test 1 — Live URL loads
1. Open the deployed Vercel URL.
2. Confirm the application loads without an error.
3. Confirm the user is redirected to the sign-in page.

Expected result:
- The application loads successfully.
- The browser displays `/auth/signin`.

### Test 2 — Protected team page
1. While logged out, manually open:
   `https://team9-garage-boilerplate-frontend.vercel.app/team`
2. Observe the resulting page.

Expected result:
- The user cannot directly access the team page.
- The user is redirected to the sign-in page.

### Test 3 — Successful login redirect
1. Enter valid login credentials.
2. Click **Sign In**.
3. Observe the resulting URL and page.

Expected result:
- Login succeeds.
- The user is redirected to `/team`.

### Test 4 — Team page content
1. Confirm the team page loads successfully.
2. Confirm all required team member cards are displayed.
3. Confirm member photos, names, roles, and profile information are visible.
4. Confirm the page renders without obvious visual or loading errors.

Expected result:
- The Team 9 page displays correctly.
- All required member information and images are visible.

### Test 5 — Sign out
1. Click the **Sign out** button.
2. Observe the resulting page.

Expected result:
- The user is signed out.
- The browser returns to `/auth/signin`.

## Pass Criteria
The test passes if all five tests produce their expected results without application errors.