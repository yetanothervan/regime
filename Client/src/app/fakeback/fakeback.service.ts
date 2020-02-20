import { Injectable } from '@angular/core';
import { Ingredient } from 'src/app/dtos/ingredient';
import * as _ from '../../../node_modules/lodash';
import { Dish } from 'src/app/dtos/dish';
import { v4 as uuid } from 'uuid';
import { SharedFuncService } from './../shared/services/shared-func.service';
import { FakebackServiceModule } from './fakeback.service-module';
import { MealType } from '../dtos/meal-type';
import { RationDay } from '../dtos/ration-day';

@Injectable({
  providedIn: FakebackServiceModule
})
export class FakebackService {
  
  static instance?: FakebackService;
  private _ingredients: Ingredient[];
  private _dishes: Dish[];
  private _mealTypes: MealType[];
  private _days: RationDay[];

  constructor(private shared: SharedFuncService) {
    if (FakebackService.instance !== undefined) {
      throw new Error('Import ModernModule only once.');
    }

    FakebackService.instance = this;

    this._ingredients = this.seedIngredients();
    this._dishes = this.seedDishes();
    this._mealTypes = this.seedMealTypes();
    this._days = this.seedDays();

  }

  getDishes(): Dish[] {
    return _.cloneDeep(this._dishes);
  }

  getIngredients(): Ingredient[] {
    return _.cloneDeep(this._ingredients);
  }

  getDays(): RationDay[] {
    return _.cloneDeep(this._days);
  }

  getMealTypes(): MealType[] {
    return _.cloneDeep(this._mealTypes);
  }

  updateIngredient(ingredient: Ingredient): Ingredient {
    if (!ingredient.id || ingredient.id === this.shared.getGuidEmpty()) {
      ingredient.id = uuid();
      this._ingredients = [...this._ingredients, ingredient];
      return ingredient;
    }
    this._ingredients = this._ingredients.map(i => i.id === ingredient.id ? ingredient : i);
    return ingredient;
  }

  deleteIngredient(id: string): string {
    id = this.trimByChar(id, '"');
    const dish = this._dishes.find(d => d.items.find(i => i.ingredientId === id));
    if (dish) {
      return `Cannot delete. Dish ${dish.caption} contains this ingredient`;
    }
    this._ingredients = this._ingredients.filter(i => i.id !== id);
    return id;
  }

  deleteDish(id: string): string {
    id = this.trimByChar(id, '"');
    this._dishes = this._dishes.filter(i => i.id !== id);
    return id;
  }

  updateDish(dish: Dish): Dish {
    if (!dish.id || dish.id === this.shared.getGuidEmpty()) {
      dish.id = uuid();
      this._dishes = [...this._dishes, dish];
      return dish;
    }
    this._dishes = this._dishes.map(i => i.id === dish.id ? dish : i);
    return dish;
  }

  updateMealType(mealType: MealType): MealType {
    if (!mealType.id || mealType.id === this.shared.getGuidEmpty()) {
      mealType.id = uuid();
      this._mealTypes = [...this._mealTypes, mealType];
      return mealType;
    }
    this._mealTypes = this._mealTypes.map(i => i.id === mealType.id ? mealType : i);
    return mealType;
  }

  deleteMealType(id: string): string {
    id = this.trimByChar(id, '"');
    const day = this._days.find(d => d.meals.find(i => i.mealTypeId === id));
    if (day) {
      return `Cannot delete. Day ${day.caption} contains this meal type`;
    }
    this._mealTypes = this._mealTypes.filter(i => i.id !== id);
    return id;
  }

  updateDay(day: RationDay): RationDay {
    if (!day.id || day.id === this.shared.getGuidEmpty()) {
      day.id = uuid();
      this._days = [...this._days, day];
      return day;
    }
    this._days = this._days.map(i => i.id === day.id ? day : i);
    return day;
  }

  deleteDay(id: string): string {
    id = this.trimByChar(id, '"');
    this._days = this._days.filter(i => i.id !== id);
    return id;
  }

  private trimByChar(string, character) {
    const first = [...string].findIndex(char => char !== character);
    const last = [...string].reverse().findIndex(char => char !== character);
    return string.substring(first, string.length - last);
  }

  private seedMealTypes(): MealType[] {
    return [
      {
        caption: 'Завтрак',
        kkalTotal: 500.0,
        proteinPart: 25.0,
        fatPart: 25.0,
        carbonPart: 50.0,
        id: 'b4a5e44f-6c00-4ace-a871-5e53a5082f62'
      },
      {
        caption: 'Завтрак разгруз',
        kkalTotal: 350.0,
        proteinPart: 25.0,
        fatPart: 25.0,
        carbonPart: 50.0,
        id: '15d825af-de2f-41c8-a5c0-14a832e7a533'
      },
      {
        caption: 'Обед',
        kkalTotal: 600.0,
        proteinPart: 25.0,
        fatPart: 25.0,
        carbonPart: 50.0,
        id: 'd9fe93b7-cc95-4a67-8e9f-fa602eb0c425'
      },
      {
        caption: 'Обед разгруз',
        kkalTotal: 400.0,
        proteinPart: 25.0,
        fatPart: 25.0,
        carbonPart: 50.0,
        id: 'dd695a37-1958-417d-90f6-1c9e57f1f221'
      },
      {
        caption: 'Перекус',
        kkalTotal: 150.0,
        proteinPart: 25.0,
        fatPart: 25.0,
        carbonPart: 50.0,
        id: '7ec0770d-ec0f-4b98-9ca6-4de758bff72b'
      },
      {
        caption: 'Ужин',
        kkalTotal: 300.0,
        proteinPart: 25.0,
        fatPart: 25.0,
        carbonPart: 50.0,
        id: '521f15a7-2ad7-43e3-974c-20ca457644b0'
      },
      {
        caption: 'Ужин разгруз',
        kkalTotal: 250.0,
        proteinPart: 25.0,
        fatPart: 25.0,
        carbonPart: 50.0,
        id: 'cd2a2aad-13fa-4a1d-83f1-5fc6428fbed3'
      },
      {
        caption: 'белок',
        kkalTotal: 100.0,
        proteinPart: 90.0,
        fatPart: 5.0,
        carbonPart: 5.0,
        id: '7cba5cee-74e7-462d-818a-8c752cf7d8d3'
      },
      {
        caption: 'жир',
        kkalTotal: 1000.0,
        proteinPart: 25.0,
        fatPart: 50.0,
        carbonPart: 25.0,
        id: '0027ba13-1326-4b05-ae6f-26723d60d063'
      }
    ]
  }

  private seedDays(): RationDay[] {
    return [
      {
        caption: 'Понедельник',
        totalKkal: 1700.0,
        meals: [
          {
            mealTypeId: 'b4a5e44f-6c00-4ace-a871-5e53a5082f62',
            mealItems: [
              {
                dishId: 'd49fde96-18e7-4da2-9015-73753db97359',
                weight: 1.0,
                id: '23116c1e-28dd-4aed-a8b8-ed4a3dc6b387'
              },
              {
                dishId: '0ebb86fd-87e9-428b-a898-2975cdd12315',
                weight: 2.0,
                id: '4c5d48d8-79d9-4dfb-b4d6-4445454914e4'
              },
              {
                dishId: '64e55816-9469-4cc6-85e8-3ccd47976384',
                weight: 1.0,
                id: '41a8637c-ade9-4ca4-a92e-27efc27cf589'
              }
            ],
            id: 'cd09434f-b232-4546-9d6a-10806fc1c2d1'
          },
          {
            mealTypeId: '7ec0770d-ec0f-4b98-9ca6-4de758bff72b',
            mealItems: [
              {
                dishId: '64e55816-9469-4cc6-85e8-3ccd47976384',
                weight: 1.0,
                id: '612be840-8c6e-4b31-8178-2b84c8d7248b'
              },
              {
                dishId: 'a6ec9638-7c30-4eb6-b7f3-662abea91545',
                weight: 0.25,
                id: 'bebcae8b-7b3d-40c3-a703-e9e0334b280e'
              }
            ],
            id: '5bf89dc2-be73-4f77-982c-3a702a3eddd1'
          },
          {
            mealTypeId: 'd9fe93b7-cc95-4a67-8e9f-fa602eb0c425',
            mealItems: [
              {
                dishId: '8838bc96-6a52-40ff-92b4-6f8e7f0714f0',
                weight: 1.0,
                id: '30f3b62d-9a32-4318-b102-4871bbff770d'
              },
              {
                dishId: 'c32a9c5d-ee8c-4df1-945b-df47d8616610',
                weight: 1.0,
                id: 'e24ce5f4-eed5-4725-96cf-e0535be22206'
              },
              {
                dishId: '0c2161d8-387b-41a8-a402-a21a29f3e09e',
                weight: 1.0,
                id: '7a1158ff-a58a-4536-b7b1-a3eba28f2bbd'
              }
            ],
            id: '6e1c57b5-72c6-42d9-abba-59e7d670f0a7'
          },
          {
            mealTypeId: '7ec0770d-ec0f-4b98-9ca6-4de758bff72b',
            mealItems: [
              {
                dishId: 'a6ec9638-7c30-4eb6-b7f3-662abea91545',
                weight: 0.25,
                id: 'a7fe096b-b77f-4e0c-8e56-3cbb4ea64c57'
              },
              {
                dishId: 'd92fb362-d304-42cc-87e0-6a3fa64af55b',
                weight: 1.0,
                id: 'bbedd12a-46f7-414e-9afa-bc6e34809402'
              }
            ],
            id: '37a6eeed-77e5-4e6d-933e-3c925fadd8f3'
          },
          {
            mealTypeId: '521f15a7-2ad7-43e3-974c-20ca457644b0',
            mealItems: [
              {
                dishId: '8838bc96-6a52-40ff-92b4-6f8e7f0714f0',
                weight: 1.0,
                id: 'e79ee071-185a-4d4e-ba43-0d88e65ea228'
              },
              {
                dishId: 'c32a9c5d-ee8c-4df1-945b-df47d8616610',
                weight: 0.5,
                id: 'e12925db-744e-4fab-b781-ecae715802f0'
              }
            ],
            id: '9ed1eb2d-634f-4b93-ad85-d54599513037'
          }
        ],
        id: '2e26dece-cd65-48c8-bff7-40631136081a'
      },
      {
        caption: 'Вторник',
        totalKkal: 1700.0,
        meals: [],
        id: 'f64ef5ab-cffd-4b92-9c15-9dd64ffe1085'
      }
    ];
  }

  private seedDishes(): Dish[] {
    return [
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
        category: 'Основное/Каши',
        id: 'd49fde96-18e7-4da2-9015-73753db97359'
      },
      {
        items: [
          {
            ingredientId: 'ba352489-6d7c-44c7-8cc9-c538ac8fd4a8',
            weight: 60.0
          }
        ],
        caption: 'Яйцо вареное',
        comment: null,
        category: 'Дополнительное',
        id: '0ebb86fd-87e9-428b-a898-2975cdd12315'
      },
      {
        items: [
          {
            ingredientId: 'dd1cc9f0-d4b5-46f0-b820-b816fdab8956',
            weight: 150.0
          }
        ],
        caption: 'Горбуша печеный кусок',
        comment: null,
        category: 'Основное',
        id: '9820c41b-7f14-4d72-96a9-061e0d5172eb'
      },
      {
        items: [
          {
            ingredientId: '86cfff13-3478-4cce-856d-d82c7fdf7919',
            weight: 80.0
          }
        ],
        caption: 'Гречка отварная',
        comment: null,
        category: 'Гарнир',
        id: 'c32a9c5d-ee8c-4df1-945b-df47d8616610'
      },
      {
        items: [
          {
            ingredientId: '149fd136-49c5-4a30-ab6a-2a82a419cbd1',
            weight: 150.0
          }
        ],
        caption: 'Форель печеный стейк',
        comment: '',
        category: 'Основное',
        id: '8838bc96-6a52-40ff-92b4-6f8e7f0714f0'
      },
      {
        items: [
          {
            ingredientId: 'b385ab9a-97c8-47bb-a2ac-beea71d6bcc8',
            weight: 25.0
          }
        ],
        caption: 'Миндаль жареный',
        comment: '',
        category: 'Дополнительное',
        id: '0c2161d8-387b-41a8-a402-a21a29f3e09e'
      },
      {
        items: [
          {
            ingredientId: 'ffcb2b10-ed01-4630-96b0-69417fc2c76e',
            weight: 150.0
          }
        ],
        caption: 'Яблоко',
        comment: '',
        category: 'Дополнительное',
        id: '64e55816-9469-4cc6-85e8-3ccd47976384'
      },
      {
        items: [
          {
            ingredientId: '54af6188-0aa6-4e50-9649-84c5669f4b59',
            weight: 500.0
          }
        ],
        caption: 'Ряженка',
        comment: '',
        category: 'Дополнительное',
        id: 'a6ec9638-7c30-4eb6-b7f3-662abea91545'
      },
      {
        items: [
          {
            ingredientId: '46e89910-94a0-4c9c-baa3-8ab6dacbf173',
            weight: 18.0
          }
        ],
        caption: 'Слоеный десерт (1 пч)',
        comment: '',
        category: 'Дополнительное',
        id: 'd92fb362-d304-42cc-87e0-6a3fa64af55b'
      }
    ];
  }

  private seedIngredients(): Ingredient[] {
    return [
      {
        caption: 'Молоко 1%',
        kkal100: 42.0,
        protein100: 3.4,
        fat100: 1.0,
        carbon100: 5.0,
        comment: null,
        id: 'e06f7a74-f28d-4bed-b775-7141e9940877'
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
        protein100: 0.0,
        fat100: 0.0,
        carbon100: 100.0,
        comment: null,
        id: '0668b18f-3fa2-41ed-9d53-3d6d218efd66'
      },
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
        caption: 'Горбуша филе',
        kkal100: 116.0,
        protein100: 20.0,
        fat100: 4.0,
        carbon100: 0.0,
        comment: null,
        id: 'dd1cc9f0-d4b5-46f0-b820-b816fdab8956'
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
        caption: 'Соевый соус',
        kkal100: 75.0,
        protein100: 5.5,
        fat100: 0.0,
        carbon100: 13.0,
        comment: null,
        id: 'b4fb0931-e720-4f05-b947-b4425e23f23e'
      },
      {
        caption: 'Рис белый',
        kkal100: 344.0,
        protein100: 6.7,
        fat100: 0.7,
        carbon100: 78.9,
        comment: 'красный покупать не стоит, т.к. окрашивает всё, что с ним варится в розовый цвет, а впоследствии становится неприятного фиолетового цвета',
        id: '36f45de1-88e5-4218-b5d1-08662c5c6501'
      },
      {
        caption: 'Форель стейк с/м',
        kkal100: 113.0,
        protein100: 20.5,
        fat100: 3.5,
        carbon100: 0.0,
        comment: '',
        id: '149fd136-49c5-4a30-ab6a-2a82a419cbd1'
      },
      {
        caption: 'Миндаль жареный',
        kkal100: 614.0,
        protein100: 19.0,
        fat100: 54.0,
        carbon100: 13.0,
        comment: '',
        id: 'b385ab9a-97c8-47bb-a2ac-beea71d6bcc8'
      },
      {
        caption: 'Яблоко',
        kkal100: 52.0,
        protein100: 0.0,
        fat100: 0.0,
        carbon100: 14.0,
        comment: '',
        id: 'ffcb2b10-ed01-4630-96b0-69417fc2c76e'
      },
      {
        caption: 'Ряженка',
        kkal100: 65.0,
        protein100: 3.0,
        fat100: 4.0,
        carbon100: 4.2,
        comment: 'ВкусВилл 0.5 баночка',
        id: '54af6188-0aa6-4e50-9649-84c5669f4b59'
      },
      {
        caption: 'Слоеный десерт (Печенье)',
        kkal100: 472.8,
        protein100: 10.1,
        fat100: 22.8,
        carbon100: 56.8,
        comment: '1 печенка 18 гр',
        id: '46e89910-94a0-4c9c-baa3-8ab6dacbf173'
      }
    ];
  }
}
