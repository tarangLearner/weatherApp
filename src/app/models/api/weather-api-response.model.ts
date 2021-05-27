import { WeatherResponseModel } from '../weather-response.model';

export interface WeatherApiResponseModel {
  cod: string;
  count: number;
  list: WeatherResponseModel[];
  message: string;
}
