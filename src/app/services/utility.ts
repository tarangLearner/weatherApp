
export function convertKelvinToCelsius(tempInKelvin: number): string {
  return String((tempInKelvin - 273.15).toFixed(2));
}

