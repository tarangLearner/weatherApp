export interface ForecastDetailsModel {
  cnt: number;
  cod: string;
  list: {
    dt: number,
    clouds: {
      all: number
    },
    dt_txt: string,
    main: {
      feels_like: number,
      grnd_level: number,
      humidity: number,
      pressure: number,
      sea_level: number,
      temp: number,
      temp_kf: number,
      temp_max: number,
      temp_min: number,
    },
    pop: number,
    rain: {
      '3h': number
    },
    sys: {
      pod: string
    },
    visibility: number,
    weather: {
      id: number,
      description: string,
      icon: string,
      main: string
    }[],
    wind: {
      speed: number;
      deg: number;
      gust: number;
    }
  }[];
  message: number;
  city: {
    country: string,
    id: number,
    name: string,
    population: number,
    sunrise: number,
    sunset: number,
    timezone: number,
    coord: {
      lat: number,
      lon: number
    }
  };
}
