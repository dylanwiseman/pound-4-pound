# Pound4Pound

Pound4Pound is a web app you can use to track your progress toward your fitness goals and calculate your pound-for-pound strength.

## Sign Up

Get started by completing the sign-up form. All fields are required, so if you don't know your personal records for bench, squat, or deadlift, you can guess for now, you'll be able to update them later.

## Home / Personal

Once you sign up, you'll be redirected to the your personal home page. On the left is a Strength Stats card, on the right is a Body Weight card that, for now, only contains intro text.

### Strength Stats

Near the top of the Strength Stats card, you can see your current weight, and a simple form to update your weight each day.

Below that form, you can see your personal records for bench press, squat, and deadlift, three common exercises. The "Goal" displayed next to your current PR is calculated according to your current weight and current PRs.

To update a personal record, click the "New PR" button and enter your new record. Your goals will update accordingly.

The "LVL" stat on the top right of the card is a measure of your pound-for-pound strength. Losing weight or beating your PRs will increase this strength level.

### Body Weight

The Body Weight card will graph your body weight over time. To begin tracking your weight, add a date and weight in the form in the Strength Stats card. Your current weight will be updated to match the weight recorded on the last date you enter in the form. Actual weight is graphed in red, your goal weight is graphed in blue.

## Leaderboard

Click "Leaderboard" in the nav bar to see all of Pound4Pound's users ranked by pound-for-pound strength level. Click "Personal" to return to the homepage.

## Technologies Used:

- React
- Redux
- MongoDB
- Express
- NodeJS
- bcrypt
- Victory (for graphing)
- Heroku
- CSS
- Git/Github

## Future Features:

- "loading..." animation
- Users can join "Squads" and the leaderboard will reflect all users in your squad, instead off every user on the app.
- New pre-defined exercises
- Custom exercise form (to track user-defined exercises)
- Update goal weight
