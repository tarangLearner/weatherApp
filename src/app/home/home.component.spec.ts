import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HomeComponent } from './home.component';
import { WeatherServiceService } from '../services/weather-service.service';
import { defer, of } from 'rxjs';
import { WeatherResponseModel } from '../models/weather-response.model';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let weatherServiceServiceSpy: jasmine.SpyObj<WeatherServiceService>;
  let expectedDefaultCountries: WeatherResponseModel[];
  expectedDefaultCountries = [{
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
  }];

  weatherServiceServiceSpy = jasmine.createSpyObj<WeatherServiceService>('WeatherServiceService', [
    'getDefaultCountries'
  ]);
  weatherServiceServiceSpy.getDefaultCountries.and.returnValue(of(expectedDefaultCountries));
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HomeComponent],
      providers: [{
        provide: WeatherServiceService,
        useValue: weatherServiceServiceSpy
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should update #weatherResponse with service response', fakeAsync(() => {
      component.ngOnInit();
      tick();
      fixture.detectChanges();
      expect(component.weatherResponse).toEqual(expectedDefaultCountries);
    }));

    it('should call weatherService with DefaultCountries method', () => {
      component.ngOnInit();
      expect(weatherServiceServiceSpy.getDefaultCountries).toHaveBeenCalled();
    });

    it('should call handleError method when service get failed', fakeAsync(() => {
      const handleErrorSpy = spyOn<any>(component, 'handleError');
      weatherServiceServiceSpy.getDefaultCountries.and.returnValue(defer(() => Promise.reject(new Error('Test Error'))));
      component.ngOnInit();
      tick();
      expect(handleErrorSpy).toHaveBeenCalled();
    }));
  });
});
