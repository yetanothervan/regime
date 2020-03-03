// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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

  get templatePfixUrl() { return this.apiBaseUrl + 'template/'; }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
