import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetApiService } from '../services/get-api.service';
import { SunriseSunset, Weather } from '../models/typing';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
})
export class WeatherComponent implements OnInit {
  latitude: string = '';
  longitude: string = '';
  sunriseSunset!: SunriseSunset;
  weather!: Weather;

  constructor(private activatedRoute: ActivatedRoute, private getApiService: GetApiService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.latitude = params['lat'];
      this.longitude = params['lon'];
    });
    this.activatedRoute.data.subscribe(({responseSunriseSunset}) => {
      if (responseSunriseSunset) {
        this.sunriseSunset = responseSunriseSunset;
        console.log(this.sunriseSunset.sunset);
      }
    });
    this.activatedRoute.data.subscribe(({ responseWeather }) => {
      if (responseWeather) {
        this.weather = responseWeather;
        console.log(this.weather);
      }
    });
  }
}
