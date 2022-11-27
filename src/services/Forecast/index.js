import axios from "axios";
import moment from "moment";

import { BASE_URL, DATE_AND_TIME_FORMAT } from '../../constants';
import { weatherError } from "../../locales/en";

const getForecast = async (city, date) => {
  const isDateInTheFuture = +new Date(date) > +new Date();
  try {
    const params = new URLSearchParams({
      aggregateHours: 24,
      startDateTime: moment(date).format(DATE_AND_TIME_FORMAT),
      endDateTime: moment(date).format(DATE_AND_TIME_FORMAT),
      unitGroup: "uk",
      contentType: "json",
      location: city,
      key: process.env.REACT_APP_VISUAL_CROSSING_APIKEY,
    });

    const res = await axios.get(
      `${BASE_URL}/VisualCrossingWebServices/rest/services/weatherdata/${
        isDateInTheFuture ? "forecast" : "history"
      }?${params.toString()}`
    );

    if (!Object.keys(res.data.locations).length > 0) return;

    const dateForecast = res.data.locations[
      Object.keys(res.data.locations)[0]
    ].values.find((forecast) => {
      return (
        moment(new Date(forecast.datetimeStr)).format(
          DATE_AND_TIME_FORMAT
        ) === moment(date).format(DATE_AND_TIME_FORMAT)
      );
    });

    if (!dateForecast) return;

    return dateForecast.conditions;
  } catch (error) {
    throw new Error(weatherError);
  }
};

export default getForecast;