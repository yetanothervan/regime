import { Injectable } from '@angular/core';
import { SharedModule } from '../shared.module';
import { Ingredient } from 'src/app/dtos/ingredient';
import * as _ from '../../../../node_modules/lodash';
import { Dish } from 'src/app/dtos/dish';
import { v4 as uuid } from 'uuid';

@Injectable({
    providedIn: SharedModule
})
export class FakebackService {
    private _ingredients: Ingredient[];
    private _dishes: Dish[];

    constructor() {
        this._ingredients = this.seedIngredients();
        this._dishes = this.seedDishes();
    }

    getDishes(): Dish[] {
        return _.cloneDeep(this._dishes);
    }

    getIngredients(): Ingredient[] {
        return _.cloneDeep(this._ingredients);
    }

    updateIngredient(ingredient: Ingredient): Ingredient {
      if (!ingredient.id) {
        ingredient.id = uuid();
        this._ingredients = [...this._ingredients, ingredient];
        return ingredient;
      }
      this._ingredients = this._ingredients.map(i => i.id === ingredient.id ? ingredient : i);
      return ingredient;
    }

    deleteIngredient(id: string): string {
      const dish = this._dishes.find(d => d.items.find(i => i.ingredientId === id));
      if (dish) {
        return `Cannot delete. Dish ${dish.caption} contains this ingredient`;
      }
      this._ingredients = this._ingredients.filter(i => i.id !== id);
      return id;
    }

    deleteDish(id: string): string {
      this._dishes = this._dishes.filter(i => i.id !== id);
      return id;
    }

    updateDish(dish: Dish): Dish {
      if (!dish.id) {
        dish.id = uuid();
        this._dishes = [...this._dishes, dish];
        return dish;
      }
      this._dishes = this._dishes.map(i => i.id === dish.id ? dish : i);
      return dish;
    }

    private seedDishes(): Dish[] {
        return [
            {
              items: [
                {
                  ingredientId: '41208261-e02f-46d4-abcc-9f25d182859f',
                  weight: 50.0
                },
                {
                  ingredientId: 'ba352489-6d7c-44c7-8cc9-c538ac8fd4a8',
                  weight: 150.0
                },
                {
                  ingredientId: '41208261-e02f-46d4-abcc-9f25d182859f',
                  weight: 45.0
                }
              ],
              caption: 'Омлет с фасолью',
              comment: null,
              category: null,
              id: '86a691d8-428e-4c49-a155-8bcb075395c2'
            },
            {
              items: [
                {
                  ingredientId: '2353fabd-78e3-4578-bebd-0b1c515fb3a7',
                  weight: 1000.0
                },
                {
                  ingredientId: 'a4a6b376-8928-4bb5-91dc-927d277d1cce',
                  weight: 500.0
                }
              ],
              caption: 'Бакл',
              comment: '',
              category: 'aoe',
              id: '1c9e2273-782d-4c1e-9d2f-1957875c1dea'
            },
            {
              items: [
                {
                  ingredientId: 'bbf564c1-7e4e-4536-85ef-b17a8304a50c',
                  weight: 40.0
                },
                {
                  ingredientId: '0668b18f-3fa2-41ed-9d53-3d6d218efd66',
                  weight: 10.0
                },
                {
                  ingredientId: 'e06f7a74-f28d-4bed-b775-7141e9940877',
                  weight: 225.0
                }
              ],
              caption: 'Каша Геркулесовая ',
              comment: null,
              category: null,
              id: 'd49fde96-18e7-4da2-9015-73753db97359'
            },
            {
              items: [
                {
                  ingredientId: 'ba352489-6d7c-44c7-8cc9-c538ac8fd4a8',
                  weight: 62.0
                }
              ],
              caption: 'Яйцо вареное',
              comment: null,
              category: null,
              id: '0ebb86fd-87e9-428b-a898-2975cdd12315'
            },
            {
              items: [
                {
                  ingredientId: 'dd1cc9f0-d4b5-46f0-b820-b816fdab8956',
                  weight: 258.0
                }
              ],
              caption: 'Горбуша печеный кусок',
              comment: null,
              category: null,
              id: '9820c41b-7f14-4d72-96a9-061e0d5172eb'
            },
            {
              items: [
                {
                  ingredientId: '86cfff13-3478-4cce-856d-d82c7fdf7919',
                  weight: 269.0
                }
              ],
              caption: 'Гречка отварная',
              comment: null,
              category: null,
              id: 'c32a9c5d-ee8c-4df1-945b-df47d8616610'
            },
            {
              items: [
                {
                  ingredientId: 'de104684-287a-4d5a-9dcc-9f9a6f3d5617',
                  weight: 83.0
                },
                {
                  ingredientId: '69be4c6a-3db5-448d-8080-248f10893d4a',
                  weight: 5.0
                }
              ],
              caption: 'Сырный хлебец (1/8 сыра)',
              comment: null,
              category: null,
              id: '02902b1f-94db-4445-9a3f-c817a6cc54bc'
            },
            {
              items: [
                {
                  ingredientId: '65d4b638-484a-43f4-8e7f-78047f135f12',
                  weight: 279.0
                },
                {
                  ingredientId: '1b37e8f4-ce01-40fd-992e-ec1cda7632d3',
                  weight: 1.0
                },
                {
                  ingredientId: 'bb17a0cc-65f1-4eb6-afc9-938956b83bd1',
                  weight: 2.0
                },
                {
                  ingredientId: 'b4fb0931-e720-4f05-b947-b4425e23f23e',
                  weight: 4.5
                }
              ],
              caption: 'Бастурма куриная',
              comment: null,
              category: null,
              id: '92fdbd95-9100-48d6-98bb-0f416eeca2d0'
            },
            {
              items: [
                {
                  ingredientId: 'a92c43a7-8563-4a45-b1fe-3066ff6d1d35',
                  weight: 176.0
                },
                {
                  ingredientId: '970cca9a-6c32-4b38-9f8d-75b70a6f65ab',
                  weight: 18.0
                },
                {
                  ingredientId: '562def72-de5b-4f13-8a6f-25419007726d',
                  weight: 3.0
                },
                {
                  ingredientId: '2353fabd-78e3-4578-bebd-0b1c515fb3a7',
                  weight: 50.0
                },
                {
                  ingredientId: 'a4a6b376-8928-4bb5-91dc-927d277d1cce',
                  weight: 3.0
                },
                {
                  ingredientId: 'b4fb0931-e720-4f05-b947-b4425e23f23e',
                  weight: 17.0
                },
                {
                  ingredientId: 'bb17a0cc-65f1-4eb6-afc9-938956b83bd1',
                  weight: 17.0
                }
              ],
              caption: 'Баклажаны по-японски',
              comment: null,
              category: null,
              id: '499dcf55-4e7c-425b-8aad-e1b47f101bdd'
            }
          ];
    }

    private seedIngredients(): Ingredient[] {
        return [
            {
              caption: 'Яйцо',
              kkal100: 157.0,
              protein100: 12.7,
              fat100: 10.9,
              carbon100: 0.7,
              comment: null,
              id: 'ba352489-6d7c-44c7-8cc9-c538ac8fd4a8'
            },
            {
              caption: 'Гречка',
              kkal100: 335.0,
              protein100: 12.0,
              fat100: 3.4,
              carbon100: 64.2,
              comment: null,
              id: '86cfff13-3478-4cce-856d-d82c7fdf7919'
            },
            {
              caption: 'Сыр твороженный ВкусВилл',
              kkal100: 323.0,
              protein100: 6.1,
              fat100: 30.0,
              carbon100: 7.1,
              comment: null,
              id: 'de104684-287a-4d5a-9dcc-9f9a6f3d5617'
            },
            {
              caption: 'Хлебец рис. с кунж',
              kkal100: 340.0,
              protein100: 8.0,
              fat100: 0.8,
              carbon100: 75.2,
              comment: null,
              id: '69be4c6a-3db5-448d-8080-248f10893d4a'
            },
            {
              caption: 'Куриная грудка филе',
              kkal100: 132.0,
              protein100: 15.0,
              fat100: 8.0,
              carbon100: 0.0,
              comment: null,
              id: '65d4b638-484a-43f4-8e7f-78047f135f12'
            },
            {
              caption: 'Приправа для курицы',
              kkal100: 128.0,
              protein100: 7.3,
              fat100: 1.6,
              carbon100: 21.1,
              comment: null,
              id: '1b37e8f4-ce01-40fd-992e-ec1cda7632d3'
            },
            {
              caption: 'Масло кунжутное',
              kkal100: 899.0,
              protein100: 0.0,
              fat100: 99.9,
              carbon100: 0.0,
              comment: null,
              id: 'bb17a0cc-65f1-4eb6-afc9-938956b83bd1'
            },
            {
              caption: 'Нут',
              kkal100: 364.0,
              protein100: 19.0,
              fat100: 6.0,
              carbon100: 61.0,
              comment: null,
              id: '444a22dd-c9ff-4004-837a-aeb7c23c5ff0'
            },
            {
              caption: 'Мука кукурузная',
              kkal100: 330.0,
              protein100: 7.0,
              fat100: 1.5,
              carbon100: 72.0,
              comment: null,
              id: 'a4a6b376-8928-4bb5-91dc-927d277d1cce'
            },
            {
              caption: 'Соевый соус',
              kkal100: 75.0,
              protein100: 5.5,
              fat100: 0.0,
              carbon100: 13.0,
              comment: null,
              id: 'b4fb0931-e720-4f05-b947-b4425e23f23e'
            },
            {
              caption: 'Уксус рисовый',
              kkal100: 54.0,
              protein100: 0.3,
              fat100: 0.0,
              carbon100: 13.0,
              comment: null,
              id: '970cca9a-6c32-4b38-9f8d-75b70a6f65ab'
            },
            {
              caption: 'Кунжут смесь Вкусвилл',
              kkal100: 561.6,
              protein100: 19.2,
              fat100: 49.2,
              carbon100: 10.5,
              comment: null,
              id: '562def72-de5b-4f13-8a6f-25419007726d'
            },
            {
              caption: 'Вода',
              kkal100: 0.0,
              protein100: 0.0,
              fat100: 0.0,
              carbon100: 0.0,
              comment: null,
              id: '2353fabd-78e3-4578-bebd-0b1c515fb3a7'
            },
            {
              caption: 'Фасоль стручковая с/м',
              kkal100: 15.0,
              protein100: 3.0,
              fat100: 0.1,
              carbon100: 4.0,
              comment: null,
              id: '41208261-e02f-46d4-abcc-9f25d182859f'
            },
            {
              caption: 'Рис белый',
              kkal100: 344.0,
              protein100: 6.7,
              fat100: 0.7,
              carbon100: 78.9,
              comment: 'красный покупать не стоит, т.к.' +
              ' окрашивает всё, что с ним варится в розовый цвет, а впоследствии становится неприятного фиолетового цвета',
              id: '36f45de1-88e5-4218-b5d1-08662c5c6501'
            },
            {
              caption: 'Баклажан это',
              kkal100: 24.0,
              protein100: 1.3,
              fat100: 0.1,
              carbon100: 4.5,
              comment: null,
              id: 'a92c43a7-8563-4a45-b1fe-3066ff6d1d35'
            },
            {
              caption: 'Горбуша филе',
              kkal100: 110.0,
              protein100: 20.0,
              fat100: 4.0,
              carbon100: 0.0,
              comment: null,
              id: 'dd1cc9f0-d4b5-46f0-b820-b816fdab8956'
            },
            {
              caption: 'Брокколи с/м',
              kkal100: 30.0,
              protein100: 2.7,
              fat100: 0.3,
              carbon100: 4.9,
              comment: null,
              id: '7107d141-87ba-4f67-bfe3-ab8782275ed7'
            },
            {
              caption: 'Геркулес',
              kkal100: 350.0,
              protein100: 12.0,
              fat100: 6.0,
              carbon100: 62.0,
              comment: null,
              id: 'bbf564c1-7e4e-4536-85ef-b17a8304a50c'
            },
            {
              caption: 'Подсластитель',
              kkal100: 300.0,
              protein100: 1.0,
              fat100: 0.0,
              carbon100: 100.0,
              comment: null,
              id: '0668b18f-3fa2-41ed-9d53-3d6d218efd66'
            },
            {
              caption: 'Молоко 1%',
              kkal100: 40.0,
              protein100: 3.4,
              fat100: 1.0,
              carbon100: 5.0,
              comment: null,
              id: 'e06f7a74-f28d-4bed-b775-7141e9940877'
            }
          ];
    }
}
