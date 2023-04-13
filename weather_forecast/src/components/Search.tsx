import { useState } from "react";
import { format } from "date-fns";
import { SearchIcon } from "@primer/octicons-react";
import { BrowserView, MobileView } from "react-device-detect";

function Search() {
  const [city, setCity] = useState("");
  const [forecastData, setforecastData] = useState({});

  const updateCity = (event) => {
    setCity(event.target.value);
  };

  async function getForecast() {
    await fetch("http://localhost:4000/getforecast?city=" + city, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setforecastData(data);
      });
  }

  function backToSearch() {
    setforecastData({});
  }

  return (
    <>
      <BrowserView>
        <div>
          {Object.keys(forecastData).length === 0 ? (
            <>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    <SearchIcon size={24} />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="City"
                  id="city"
                  value={city}
                  onChange={updateCity}
                  aria-label="City"
                  aria-describedby="basic-addon1"
                />
              </div>

              <div className="row">
                <button className="btn btn-dark" onClick={getForecast}>
                  Display Weather
                </button>
              </div>
            </>
          ) : (
            <>
              <table className="table table-justified table-striped table-responsive table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <td>Date</td>
                    <td>Temp (F)</td>
                    <td>Description</td>
                    <td>Main</td>
                    <td>Pressure</td>
                    <td>Humidity</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{format(new Date(), "MM/dd/yyyy")}</td>
                    <td>{forecastData.main.temp}</td>
                    <td>{forecastData.weather[0].description}</td>
                    <td>{forecastData.weather[0].main}</td>
                    <td>{forecastData.main.pressure}</td>
                    <td>{forecastData.main.humidity}</td>
                  </tr>
                </tbody>
              </table>
              <div className="row">
                <button className="btn btn-dark" onClick={backToSearch}>
                  Back
                </button>
              </div>
            </>
          )}
        </div>
      </BrowserView>
      <MobileView>
        <div>
          {Object.keys(forecastData).length === 0 ? (
            <>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    <SearchIcon size={24} />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="City"
                  id="city"
                  value={city}
                  onChange={updateCity}
                  aria-label="City"
                  aria-describedby="basic-addon1"
                />
              </div>

              <div className="row">
                <button className="btn btn-dark" onClick={getForecast}>
                  Display Weather
                </button>
              </div>
            </>
          ) : (
            <>
              <table className="table table-justified table-striped table-responsive table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <td>Date</td>
                    <td>Temp (F)</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{format(new Date(), "MM/dd/yyyy")}</td>
                    <td>{forecastData.main.temp}</td>
                  </tr>
                </tbody>
              </table>
              <div className="row">
                <button className="btn btn-dark" onClick={backToSearch}>
                  Back
                </button>
              </div>
            </>
          )}
        </div>
      </MobileView>
    </>
  );
}

export default Search;
