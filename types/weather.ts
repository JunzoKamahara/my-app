export interface WeatherData {
  icon: string;
  temperature: number;
}

export interface WeatherState {
  [date: string]: WeatherData;
} 