import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { SunriseSunset, Weather } from '../models/typing';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetApiService {
  constructor(private apiService: ApiService) {}

  searchSunriseSunset(lat: string, lon: string) {
    return this.apiService.searchSunriseSunset(lat, lon).pipe(
      map((response: any) => {
        return response.results as SunriseSunset;
      })
    );
  }

  searchWeather(lat: string, lon: string) {
    return this.apiService.searchWeather(lat, lon).pipe(
      map((response: any) => {
        response.dataseries.forEach((element: any) => {
          if (element.cloudcover === 1 || element.cloudcover === 2) {
            element.icon =
              'https://www.7timer.info/img/misc/about_two_clear.png';
          } else if (element.cloudcover >= 3 && element.cloudcover <= 7) {
            element.icon =
              'https://www.7timer.info/img/misc/about_two_pcloudy.png';
          } else if (element.cloudcover === 8 || element.cloudcover === 9) {
            element.icon =
              'https://www.7timer.info/img/misc/about_two_cloudy.png';
          }
          /// FARE LE ALTRE ICONE
        });

        return response as Weather;
      })
    );
  }
}
