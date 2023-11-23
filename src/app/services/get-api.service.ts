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
          let milliseconds = new Date().getTime();
          milliseconds =
            milliseconds + (element.timepoint + 1) * 60 * 60 * 1000; // aggiungo 1 per avere l'ora italiana
          const date = new Date(milliseconds);
          element.day = date.toUTCString().slice(0, -7);

          if (element.prec_type === 'snow') {
            element.icon =
              'https://w-static.meteosuper.it/public/icons/ic_snow_mid_100px_08_31.svg';
          } else if (element.prec_type === 'rain') {
            if (element.lifted_index <= -5) {
              if (date.getUTCHours() > 5 && date.getUTCHours() < 17) {
                element.icon =
                  'https://w-static.meteosuper.it/public/icons/ic_storm_day_100px_25.svg';
              } else {
                element.icon =
                  'https://w-static.meteosuper.it/public/icons/ic_storm_night_100px_24.svg';
              }
            } else {
              element.icon =
                'https://w-static.meteosuper.it/public/icons/ic_rain_high_100px_20_35.svg';
            }
          } else {
            if (element.cloudcover === 1 || element.cloudcover === 2) {
              if (date.getUTCHours() > 5 && date.getUTCHours() < 17) {
                element.icon =
                  'https://w-static.meteosuper.it/public/icons/ic_sun_lev1_100px_05.svg';
              } else {
                element.icon =
                  'https://w-static.meteosuper.it/public/icons/ic_sereno_notte_100px_02.svg';
              }
            } else if (element.cloudcover >= 3 && element.cloudcover <= 7) {
              if (date.getUTCHours() > 5 && date.getUTCHours() < 17) {
                element.icon =
                  'https://w-static.meteosuper.it/public/icons/ic_cloudy_day_100px_10_26.svg';
              } else {
                element.icon =
                  'https://w-static.meteosuper.it/public/icons/ic_cloudy_night_100px_11_27.svg';
              }
            } else if (element.cloudcover === 8 || element.cloudcover === 9) {
              element.icon =
                'https://w-static.meteosuper.it/public/icons/ic_coperto_100px_01_28.svg';
            } else {
              element.icon = '';
            }
          }
        });
        return response.dataseries as Weather;
      })
    );
  }
}