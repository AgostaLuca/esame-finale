import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  sunriseSunsetURL = 'https://api.sunrisesunset.io/json?';
  weatherURL = 'https://www.7timer.info/bin/astro.php?';

  searchSunriseSunset(lat: string, lon: string) {
    return this.http.get(this.sunriseSunsetURL + 'lat=' + lat + '&lng=' + lon);
  }

  searchWeather(lat: string, lon: string) {
    return this.http.get(
      this.weatherURL +
        'lon=' +
        lon +
        '&lat=' +
        lat +
        '&ac=0&unit=metric&output=json&tzshift=0'
    );
  }
}
