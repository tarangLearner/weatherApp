import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { WeatherApiResponseModel } from '../models/api/weather-api-response.model';

import { baseUrl, WeatherServiceService } from './weather-service.service';

describe('WeatherServiceService', () => {
  let service: WeatherServiceService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
    service = TestBed.inject(WeatherServiceService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getDefaultCountries', () => {
    let httpMock: HttpTestingController;

    beforeEach(() => {
      httpMock = TestBed.inject(HttpTestingController);
    });

    it('should make http get request to defaultCountries', async(() => {
      service.getDefaultCountries().subscribe(() => {
        expect().nothing();
      });

      const expectedReturn: WeatherApiResponseModel = {
        cod: '200',
        count: 2,
        message: 'accurate',
        list: [{
          clouds: { all: 99 },
          coord: { lat: 54.1438, lon: 15.2914 },
          dt: 1622124438,
          id: 3091331,
          main: {
            temp: 285.93,
            feels_like: 285.56,
            temp_min: 285.93,
            temp_max: 285.93,
            humidity: 88,
            pressure: 1012
          },
          name: 'test',
          rain: null,
          snow: null,
          sys: {
            country: 'PLTest',
            sunrise: 23334,
            sunset: 25467
          },
          weather: [{
            description: 'test_clouds',
            icon: '04d',
            id: 804,
            main: 'test_cloud'
          }],
          wind: {
            deg: 233,
            speed: 1.95
          }
        }, {
          clouds: { all: 99 },
          coord: { lat: 54.1438, lon: 15.2914 },
          dt: 1622124438,
          id: 3091331,
          main: {
            temp: 285.93,
            feels_like: 285.56,
            temp_min: 285.93,
            temp_max: 285.93,
            humidity: 88,
            pressure: 1012
          },
          name: 'test1',
          rain: null,
          snow: null,
          sys: {
            country: 'PLTest1',
            sunrise: 23334,
            sunset: 25467
          },
          weather: [{
            description: 'test1_clouds',
            icon: '04d',
            id: 804,
            main: 'test1_cloud'
          }],
          wind: {
            deg: 233,
            speed: 1.95
          }
        }]
      };

      const mockRequest = httpMock.expectOne({
        method: 'GET',
        url: `${baseUrl}/find?lat=54.526&lon=15.2551&cnt=5&appid=3d8b309701a13f65b660fa2c64cdc517`
      });

      mockRequest.flush(expectedReturn);
      httpMock.verify();
    }));
  });

  describe('get5DaysWeatherByCityName', () => {
    let httpMock: HttpTestingController;

    beforeEach(() => {
      httpMock = TestBed.inject(HttpTestingController);
    });

    it('should make http get request to get5DaysWeatherByCityName', async(() => {
      service.get5DaysWeatherByCityName('Test').subscribe(() => {
        expect().nothing();
      });

      const expectedReturn: WeatherApiResponseModel = {
        cod: '200',
        count: 2,
        message: 'accurate',
        list: [{
          clouds: { all: 99 },
          coord: { lat: 54.1438, lon: 15.2914 },
          dt: 1622124438,
          id: 3091331,
          main: {
            temp: 285.93,
            feels_like: 285.56,
            temp_min: 285.93,
            temp_max: 285.93,
            humidity: 88,
            pressure: 1012
          },
          name: 'test',
          rain: null,
          snow: null,
          sys: {
            country: 'PLTest',
            sunrise: 23334,
            sunset: 25467
          },
          weather: [{
            description: 'test_clouds',
            icon: '04d',
            id: 804,
            main: 'test_cloud'
          }],
          wind: {
            deg: 233,
            speed: 1.95
          }
        }, {
          clouds: { all: 99 },
          coord: { lat: 54.1438, lon: 15.2914 },
          dt: 1622124438,
          id: 3091331,
          main: {
            temp: 285.93,
            feels_like: 285.56,
            temp_min: 285.93,
            temp_max: 285.93,
            humidity: 88,
            pressure: 1012
          },
          name: 'test1',
          rain: null,
          snow: null,
          sys: {
            country: 'PLTest1',
            sunrise: 23334,
            sunset: 25467
          },
          weather: [{
            description: 'test1_clouds',
            icon: '04d',
            id: 804,
            main: 'test1_cloud'
          }],
          wind: {
            deg: 233,
            speed: 1.95
          }
        }]
      };

      const mockRequest = httpMock.expectOne({
        method: 'GET',
        url: `https://api.openweathermap.org/data/2.5//forecast?q=Test&appid=3d8b309701a13f65b660fa2c64cdc517`
      });

      mockRequest.flush(expectedReturn);
      httpMock.verify();
    }));

    it('should not make http get request to get5DaysWeatherByCityName when cityName is null', async(() => {
      service.get5DaysWeatherByCityName(null).subscribe(() => {
        expect().nothing();
      });

      const mockRequest = httpMock.expectNone({
        method: 'GET',
        url: `https://api.openweathermap.org/data/2.5//forecast?q=Test&appid=3d8b309701a13f65b660fa2c64cdc517`
      });

      httpMock.verify();
    }));

    it('should return null when cityName is null', async(() => {
      service.get5DaysWeatherByCityName(null).subscribe((res) => {
        expect(res).toEqual(null);
      });

      const mockRequest = httpMock.expectNone({
        method: 'GET',
        url: `https://api.openweathermap.org/data/2.5//forecast?q=Test&appid=3d8b309701a13f65b660fa2c64cdc517`
      });

      httpMock.verify();
    }));
  });
});
