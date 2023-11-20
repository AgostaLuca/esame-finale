import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { SunriseSunset } from '../models/typing';
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
}
