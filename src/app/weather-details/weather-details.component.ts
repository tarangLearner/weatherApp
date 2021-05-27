import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ForecastDetailsModel } from '../models/forecast-details.model';
import { WeatherServiceService } from '../services/weather-service.service';
import { convertKelvinToCelsius } from '../services/utility';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})
export class WeatherDetailsComponent implements OnInit {
  public forecastDetails: ForecastDetailsModel = null;
  public next5DaysData: {
    temp: number,
    sea_level: number,
    date: string,
    time: string
  }[] = [];
  public convertKelvinToCelsius = convertKelvinToCelsius;

  constructor(private readonly route: ActivatedRoute,
    private readonly weatherService: WeatherServiceService,
    private readonly location: Location) { }

  ngOnInit(): void {
    this.getsWeatherByCity();
  }

  public goBack(): void {
    this.location.back();
  }

  private getsWeatherByCity(): void {
    const cityName = String(this.route.snapshot.paramMap.get('cityName'));
    this.weatherService.get5DaysWeatherByCityName(cityName).subscribe((res) => {
      this.forecastDetails = res;
      this.getNext5DaysData();
    });
  }

  private getNext5DaysData(): void {
    let count = 0;
    const todayDate = new Date();
    const todaySystemDate = `${todayDate.getFullYear()}-${todayDate.getMonth() + 1}-${todayDate.getDate()}`;
    this.forecastDetails.list.forEach((list) => {
      const dtTxtSplit = list.dt_txt.split(' ');
      if (dtTxtSplit[0] !== todaySystemDate && count !== 5 && dtTxtSplit[1] === '09:00:00') {
        count += 1;
        this.next5DaysData.push({
          date: dtTxtSplit[0],
          time: dtTxtSplit[1],
          temp: list.main.temp,
          sea_level: list.main.sea_level
        });
      }
    });
  }

}
