export const environment = {
  production: true,
  useFakeback: false,
  apiBaseUrl: 'http://localhost:5000/api/',

  get dishesUrl() { return this.apiBaseUrl + 'dishes/'; },
  updateDish: 'update-dish',
  deleteDish: 'delete-dish',

  get ingredientsUrl() { return this.apiBaseUrl + 'ingredients/'; },
  updateIngredient: 'update-ingredient',
  deleteIngredient: 'delete-ingredient',

  get mealTypesUrl() { return this.apiBaseUrl + 'mealtypes/'; },
  updateMealType: 'update-mealtype',
  deleteMealType: 'delete-mealtype',

  get daysUrl() { return this.apiBaseUrl + 'rationdays/'; },
  updateRationDay: 'update-day',
  deleteRationDay: 'delete-day',
};
