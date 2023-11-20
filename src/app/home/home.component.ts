import { Component, OnInit } from '@angular/core';
import { Favourite } from '../models/typing';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  latitude: string = '';
  longitude: string = '';
  
  constructor() {}

  ngOnInit(): void {}
}
