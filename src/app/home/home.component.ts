import { Component, OnInit } from '@angular/core';
import { Favourite } from '../models/typing';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  latitude: string = '';
  longitude: string = '';
  name: string = '';
  error = false;
  suggesteds: Favourite[] = [
    {
      latitude: '40.779897',
      longitude: '-73.968565',
      name: 'New York',
    },
    {
      latitude: '45.4654219',
      longitude: '9.1859243',
      name: 'Milan',
    },
    {
      latitude: '45.070312',
      longitude: '7.6868565',
      name: 'Turin',
    },
    {
      latitude: '35.685013',
      longitude: '139.752445',
      name: 'Tokyo',
    },
    {
      latitude: '51.507351',
      longitude: '-0.127758',
      name: 'London',
    },
    {
      latitude: '48.856614',
      longitude: '2.352222',
      name: 'Paris',
    }
  ];
  favourites: Favourite[] = [];

  constructor() {}

  ngOnInit(): void {
    this.updateFavourites();
  }

  reset() {
    this.latitude = '';
    this.longitude = '';
    this.name = '';
    this.error = false;
  }
  updateFavourites() {
    let favouriteJSON = sessionStorage.getItem('favouritesArray');
    if (favouriteJSON) {
      this.favourites = JSON.parse(favouriteJSON);
    }
  }

  addFavourites() {
    if (
      this.longitude != '' &&
      this.longitude != null &&
      this.latitude != '' &&
      this.latitude != null &&
      this.name.trim().length > 0
    ) {
      let present = false;
      for (let i = 0; i < this.favourites.length && present != true; i++) {
        if (
          (this.favourites[i].latitude === this.latitude &&
            this.favourites[i].longitude === this.longitude) ||
          this.favourites[i].name === this.name
        )
          present = true;
      }

      if (!present) {
        let favouriteJSON = sessionStorage.getItem('favouritesArray');

        if (favouriteJSON) {
          this.error = false;
          this.favourites = JSON.parse(favouriteJSON);
          this.favourites.push({
            latitude: this.latitude,
            longitude: this.longitude,
            name: this.name,
          });
          sessionStorage.setItem(
            'favouritesArray',
            JSON.stringify(this.favourites)
          );
        } else {
          this.favourites.push({
            latitude: this.latitude,
            longitude: this.longitude,
            name: this.name,
          });
          sessionStorage.setItem(
            'favouritesArray',
            JSON.stringify(this.favourites)
          );
        }
      } else {
        this.error = true;
      }
    } else {
      this.error = true;
    }
  }

  deleteFavourite(name: string) {
    for (let i = 0; i < this.favourites.length; i++) {
      if (this.favourites[i].name === name) {
        this.favourites.splice(i, 1);
        break;
      }
    }
    sessionStorage.setItem('favouritesArray', JSON.stringify(this.favourites));
  }
}
