import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetApiService } from '../services/get-api.service';
import { SunriseSunset, Weather } from '../models/typing';
import { Location } from '@angular/common';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
})
export class WeatherComponent implements OnInit {
  latitude: string = '';
  longitude: string = '';
  sunriseSunset!: SunriseSunset;
  weathers!: Weather[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private getApiService: GetApiService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.latitude = params['lat'];
      this.longitude = params['lon'];
    });
    this.activatedRoute.data.subscribe(({ responseSunriseSunset }) => {
      if (responseSunriseSunset) {
        this.sunriseSunset = responseSunriseSunset;
      }
    });
    this.activatedRoute.data.subscribe(({ responseWeather }) => {
      if (responseWeather) {
        this.weathers = responseWeather;
      }
    });
  }
}
