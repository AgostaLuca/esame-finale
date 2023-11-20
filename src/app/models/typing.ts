export type SunriseSunset = {
  sunrise: string;
  sunset: string;
  first_light: string;
  last_light: string;
  dawn: string;
  dusk: string;
  solar_noon: string;
  golden_hour: string;
  day_length: string;
  timezone: string;
  utc_offset: number;
};

export type Weather = {
  timepoint: number;
  cloudcover: number;
  seeing: number;
  transparency: number;
  lifted_index: number;
  rh2m: number;
  wind10m: { direction: string; speed: number };
  temp2m: number;
  prec_type: string;
  icon: string;
};

export type Favourite = {
  latitude: string;
  longitude: string;
  name: string;
};