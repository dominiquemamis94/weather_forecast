# Weather Forecast
A simple web app that requires github login to access weather forecast by city input.
The backend is written in Express and the frontend is written in React. 
This app is integrated with Github and Auth0 for the authentication and OpenWeatherMap.org for the weather forecast data.

Setup
1. Get a copy of the project.
2. Install the packages required for the server by running this command in the root directory of the project :`npm i`
3. Install the packages required for the webapp by running this command in the weather_forecast directory of the project :`npm i`

Running the server:
1. From the root directory, run `npm start`
Note: For purposes of this demo, please make sure that it is running on port 4000. Otherwise, kindly update the package.json file.

Running the webapp:
1. From the weather_forecast directory, run `npm run dev`
Note: For purposes of this demo, please make sure that it is running on port 5173. Otherwise, kindly update the package.json file.

Using the App:
1. Log in using your Github account.
2. Search for the city of choice.
3. Enjoy!
