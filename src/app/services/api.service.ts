import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  sunriseSunsetURL = 'https://api.sunrisesunset.io/json?lat=';
  sunriseSunsetFinalURL = '&lng=';

  searchSunriseSunset(lat: string, lon: string) {
    return this.http.get(this.sunriseSunsetURL + lat + this.sunriseSunsetFinalURL + lon);
  }
}
