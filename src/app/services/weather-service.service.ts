import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { WeatherApiResponseModel } from '../models/api/weather-api-response.model';
import { ForecastDetailsModel } from '../models/forecast-details.model';
import { WeatherResponseModel } from '../models/weather-response.model';

export const baseUrl = 'https://api.openweathermap.org/data/2.5/';
export const appId = '3d8b309701a13f65b660fa2c64cdc517';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {

  constructor(private readonly httpClient: HttpClient) { }

  public getDefaultCountries(): Observable<WeatherResponseModel[]> {
    const latitude = 54.5260;
    const longitude = 15.2551;
    const defaultNoOfCountries = 5;
    const url = `${baseUrl}/find?lat=${latitude}&lon=${longitude}&cnt=${defaultNoOfCountries}&appid=${appId}`;
    return this.httpClient.get<WeatherApiResponseModel>(url).pipe(map((response: WeatherApiResponseModel) => response.list));
  }

  public get5DaysWeatherByCityName(cityName: string): Observable<ForecastDetailsModel> {
    if (cityName) {
      const url = `${baseUrl}/forecast?q=${cityName}&appid=${appId}`;
      return this.httpClient.get<ForecastDetailsModel>(url).pipe(map(response => response));
    } else {
      return of(null);
    }
  }
}
