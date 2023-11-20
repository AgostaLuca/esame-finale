import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WeatherComponent } from './weather/weather.component';
import { GetApiService } from './services/get-api.service';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'weather/:lat/:lon',
    component: WeatherComponent,
    resolve: {
      responseSunriseSunset: (route: ActivatedRouteSnapshot) => {
        return inject(GetApiService).searchSunriseSunset(
          route.params['lat']!,
          route.params['lon']!
        );
      },
      responseWeather: (route: ActivatedRouteSnapshot) => {
        return inject(GetApiService).searchWeather(
          route.params['lat']!,
          route.params['lon']!
        );
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
