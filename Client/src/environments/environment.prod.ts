export const environment = {
  production: true,
  apiBaseUrl: 'http://localhost:5000/api/',
  get dishesUrl() { return this.apiBaseUrl + 'dishes/'; },
  get ingredientsUrl() { return this.apiBaseUrl + 'ingredients/'; }
};
