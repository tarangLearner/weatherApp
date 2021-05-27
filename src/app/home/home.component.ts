import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { WeatherResponseModel } from '../models/weather-response.model';
import { convertKelvinToCelsius } from '../services/utility';
import { WeatherServiceService } from '../services/weather-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public weatherResponse: WeatherResponseModel[] = [];
  public convertKelvinToCelsius = convertKelvinToCelsius;

  constructor(private readonly weatherService: WeatherServiceService) { }

  ngOnInit(): void {
    this.weatherService.getDefaultCountries().subscribe((weatherResponse) => {
      this.weatherResponse = weatherResponse;
    },
      (error) => this.handleError(error));
  }

  private handleError(err: HttpErrorResponse) {
    alert('Something went wrong');
  }

}
