<div align="center">
    <img src="https://raw.githubusercontent.com/Jobsity/ReactChallenge/main/src/assets/jobsity_logo_small.png"/>
</div>

### Built With

This section should list any major frameworks/libraries used to build this project.

* [React.js](https://reactjs.org/)
* [ContextAPI](https://redux.js.org/)
* [MUI](https://ant.design/)
* [Moment.js](https://momentjs.com/)
* [GoogleAPI](https://www.chartjs.org/)

## Usage

You can enter the calendar, add reminders, edit and delete them.
You can add a reminder by clicking the + icon or double clicking a date.
Adding a reminder you can select a town with autocomplete by Google,
add a description up to 30 characters and then select the day and time. You can access
the page using mobile devices as well because the application is fully responsive.

## About the Development

Since I didn't have a proper pattern to follow regarding commit messages, I'm just counting them for now. I've used an architecture that makes a lot of sense because it separes lots of stuff and they can be found easily. I've written a test for the 30 maximum characters, but since there has always been a testing team to do that for me, it is not my best work. I decided to use ContextAPI instead of Redux because the time was short and you know that Redux takes time to setup, that's also the reason why I didn't use Typescript for this project.

## How to deploy
 - Create a .env file in the root directory of the application.
 - Paste the following keys:
  ```js
    REACT_APP_GOOGLE_APIKEY=AIzaSyD54hA2oKNHB0zTTpItuvX17eZUP5TNkBU
    REACT_APP_VISUAL_CROSSING_APIKEY=H3AZLT48PRBGNKAZ6346FML6L
  ```
 - Run `npm install` | `yarn install` to install all dependencies.
 - Run `npm start`   | `yarn run` to run the app locally.
 - You can find the project running on `localhost:3000`.
