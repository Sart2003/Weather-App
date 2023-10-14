import express, { response } from "express";
import bodyParser from "body-parser";
import path from "path";
import axios from "axios";

const app = express();
const PORT = process.env.PORT|| 5000;
const APIKEY = `82e981428a423f11b34c8087d6b5f90c`;
const __dirname = path.resolve();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.render(path.join(__dirname, "/index.ejs"));
});


app.post(`/`, async (req, res) => {
    try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&appid=${APIKEY}&units=metric`;
        const response = await axios.get(url);
        const weatherData= response.data;
        res.render(path.join(__dirname, 'index.ejs'),
        {
           cityName: weatherData.name,
           iconSrc: `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`,
           description: weatherData.weather[0].description,
           actualTemperature: weatherData.main.temp,
           feelsLikeTemperature: weatherData.main.feels_like
        })
    } catch (error) {
        res.render(path.join(__dirname, 'index.ejs'),
        {
           error: error.message
        })
    }
});



// app.post("/", (req, res) => {
//   console.log(req.body);
//   let url = `https://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&appid=${APIKEY}&units=metric`;
//   async function getData() {
//       let response = await axios.get(url)
//       .then(
//         console.log(weatherData))
//         .then(
//         res.render(path.join(__dirname, "/index.ejs"), {
//             city: req.body.city,
//           })
//       ).catch (error) {
//       console.log(error);
//     }
//   }
//   getData();
// });

app.listen(PORT, () => {
  console.log(`Server live at port ${PORT}`);
});
