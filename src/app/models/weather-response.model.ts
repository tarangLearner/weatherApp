export interface WeatherResponseModel {
  clouds: {
    all: number
  };
  coord: {
    lat: number,
    lon: number
  };
  dt: number;
  id: number;
  main: {
    feels_like: number,
    humidity: number,
    pressure: number,
    temp: number,
    temp_max: number,
    temp_min: number
  };
  name: string;
  rain: null;
  snow: null;
  sys: {
    country: string,
    sunrise: number,
    sunset: number
  };
  weather: {
    id: number,
    main: string,
    description: string,
    icon: string
  }[];
  wind: {
    speed: number,
    deg: number
  };
}
