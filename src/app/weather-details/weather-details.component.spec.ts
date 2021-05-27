import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject } from 'rxjs';
import { ForecastDetailsModel } from '../models/forecast-details.model';
import { WeatherServiceService } from '../services/weather-service.service';

import { WeatherDetailsComponent } from './weather-details.component';

describe('WeatherDetailsComponent', () => {
  let component: WeatherDetailsComponent;
  let fixture: ComponentFixture<WeatherDetailsComponent>;
  let weatherServiceServiceSpy: jasmine.SpyObj<WeatherServiceService>;
  let expectedResponse: ForecastDetailsModel;
  let activatedRoute: ActivatedRoute;
  let route: Router;
  const routerEvent$ = new Subject<RouterEvent>();

  expectedResponse = {
    cod: '200',
    message: 0,
    cnt: 40,
    list: [{
      dt: 1622138400,
      main: {
        temp: 286.46,
        feels_like: 285.91,
        temp_min: 284.69,
        temp_max: 286.46,
        pressure: 1012,
        sea_level: 1012,
        grnd_level: 1012,
        humidity: 79,
        temp_kf: 1.77
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10d'
        }
      ],
      clouds: {
        all: 88
      },
      wind: {
        speed: 0.79,
        deg: 254,
        gust: 1.38
      },
      visibility: 10000,
      pop: 0.53,
      rain: {
        '3h': 0.43
      },
      sys: {
        pod: 'd'
      },
      dt_txt: '2021-05-27 18:00:00'
    }, {
      dt: 1622138400,
      main: {
        temp: 286.46,
        feels_like: 285.91,
        temp_min: 284.69,
        temp_max: 286.46,
        pressure: 1012,
        sea_level: 1012,
        grnd_level: 1012,
        humidity: 79,
        temp_kf: 1.77
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10d'
        }
      ],
      clouds: {
        all: 88
      },
      wind: {
        speed: 0.79,
        deg: 254,
        gust: 1.38
      },
      visibility: 10000,
      pop: 0.53,
      rain: {
        '3h': 0.43
      },
      sys: {
        pod: 'd'
      },
      dt_txt: '2021-05-27 18:00:00'
    }],
    city: {
      id: 3091331,
      name: 'Test',
      coord: {
        lat: 54.1438,
        lon: 15.2914
      },
      country: 'PL_test',
      population: 1671,
      timezone: 7200,
      sunrise: 1622083085,
      sunset: 1622142855
    }
  };

  weatherServiceServiceSpy = jasmine.createSpyObj<WeatherServiceService>('WeatherServiceService', [
    'get5DaysWeatherByCityName'
  ]);

  weatherServiceServiceSpy.get5DaysWeatherByCityName.and.returnValue(of(expectedResponse));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        RouterTestingModule],
      declarations: [WeatherDetailsComponent],
      providers: [{
        provide: WeatherServiceService,
        useValue: weatherServiceServiceSpy
      }]
    })
      .compileComponents();

    route = TestBed.inject(Router);
    (route as any).events = routerEvent$.asObservable();
    activatedRoute = TestBed.inject(ActivatedRoute);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call getsWeatherByCity on component load', () => {
      const getsWeatherByCitySpy = spyOn<any>(component, 'getsWeatherByCity');
      component.ngOnInit();
      expect(getsWeatherByCitySpy).toHaveBeenCalled();
    });

    describe('getsWeatherByCity', () => {
      it('should call get5DaysWeatherByCityName service method', () => {
        component.ngOnInit();
        expect(weatherServiceServiceSpy.get5DaysWeatherByCityName).toHaveBeenCalled();
      });
    });
  });
});
