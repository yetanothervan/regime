export const environment = {
  production: true,
  useFakeback: true,
  apiBaseUrl: 'http://localhost:5000/api/',

  get dishesUrl() { return this.apiBaseUrl + 'dishes/'; },
  updateDish: 'update-dish',
  deleteDish: 'delete-dish',

  get ingredientsUrl() { return this.apiBaseUrl + 'ingredients/'; },
  updateIngredient: 'update-ingredient',
  deleteIngredient: 'delete-ingredient',
};
