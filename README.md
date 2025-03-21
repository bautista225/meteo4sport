# 🌤️ 🏃🏽 meteo4sport
![Next JS](https://img.shields.io/badge/Next-black?style=flat-square&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat-square&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat-square&logo=typescript&logoColor=white)

![Captura de pantalla 2025-03-21 103939](https://github.com/user-attachments/assets/3a676082-1c3d-4fe7-8b8a-8f48ec063105)

## 🔎 Overview
Tired of staring at the weather forecast wondering what to wear for your run? Me too! That’s why I built this fun web app using Next.js and Tailwind. It pulls live weather data from AEMET (the Spanish Meteorological Agency) and taps into Cohere AI to give you spot-on outfit suggestions, all while cracking a joke to brighten your day. No more weather-related outfit dilemmas—just good advice and a smile!

## 🌱 Key features
- Weather forecast for Spanish regions obtained from the AEMET OpenData API.
  - Hourly forecast
    - Visualize charts about temperature, rain, humidity, wind and snow for every hour.
  - Obtain details about using SPF for the maximum UV index in the current day.
  - 7 day forecast
  - Sunrise and sunset time.
- Integration of Cohere AI
  - Summary of the weather.
  - Advice about clothes for doing sport with the current weather.
  - Joke about the weather.
- Dark/light mode.
- Mapping of AEMET provided data into a better structure.
- Device responsive design

## 📖 Usage
Select your location in the main page.

Visualize the different stats and advices in the location page.

## 🖥 Installation in local
### Obtaining an AEMET Open Data API developer ID
1. Acces to the AEMET Open Data panel: [AEMET API ID Request Link](https://opendata.aemet.es/centrodedescargas/altaUsuario?)
2. Request your ID indicating an email
3. Accept the email to obtain it.

### Obtaining a Cohere API client ID
1. Log into the Cohere dashboard
2. Navigate to API Keys section
3. Create a new one, indicating a related name

### Configuration and execution
After clonning the repository, add a `.env.local` file in the root folder with the following content:
```
AEMET_API_KEY=YOUR-AEMET-OPEN-DATA-ID
COHERE_API_KEY=YOUR-COHERE-DEVELOPER-CLIENT-ID
```
In the root directory of the repo, install the NPM packages with:
```
pnpm install
```
Run an instance in localhost:3000 with:
```
pnpm run dev
```

## ✨ Contributions
Contributions are welcome! If you have ideas to enhance this project —whether it’s adding new features, improving the design, or expanding the content— feel free to submit a pull request. You can also share suggestions or feedback to help make this project even better!

## ⭐ Support
If you find this project helpful or you like what we're doing, please consider giving the repository a star! It's a quick way to show your support for this project.
