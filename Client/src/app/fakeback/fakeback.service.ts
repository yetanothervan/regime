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
        id: 'b4a5e44f-6c00-4ace-a871-5e53a5082f62',
        caption: 'Завтрак',
        kkalTotal: 500,
        proteinPart: 30,
        fatPart: 20,
        carbonPart: 50
      },
      {
        id: '15d825af-de2f-41c8-a5c0-14a832e7a533',
        caption: 'Завтрак разгруз',
        kkalTotal: 350,
        proteinPart: 30,
        fatPart: 20,
        carbonPart: 50
      },
      {
        id: 'd9fe93b7-cc95-4a67-8e9f-fa602eb0c425',
        caption: 'Обед',
        kkalTotal: 600,
        proteinPart: 30,
        fatPart: 20,
        carbonPart: 50
      },
      {
        id: 'dd695a37-1958-417d-90f6-1c9e57f1f221',
        caption: 'Обед разгруз',
        kkalTotal: 400,
        proteinPart: 30,
        fatPart: 20,
        carbonPart: 50
      },
      {
        id: '7ec0770d-ec0f-4b98-9ca6-4de758bff72b',
        caption: 'Перекус',
        kkalTotal: 200,
        proteinPart: 30,
        fatPart: 20,
        carbonPart: 50
      },
      {
        id: '521f15a7-2ad7-43e3-974c-20ca457644b0',
        caption: 'Ужин',
        kkalTotal: 300,
        proteinPart: 30,
        fatPart: 20,
        carbonPart: 50
      },
      {
        id: 'cd2a2aad-13fa-4a1d-83f1-5fc6428fbed3',
        caption: 'Ужин разгруз',
        kkalTotal: 250,
        proteinPart: 30,
        fatPart: 20,
        carbonPart: 50
      }
    ];
  }

  private seedDays(): RationDay[] {
    return [
      {
        id: '2e26dece-cd65-48c8-bff7-40631136081a',
        caption: 'Понедельник',
        totalKkal: 1800,
        meals: [
          {
            id: 'cd09434f-b232-4546-9d6a-10806fc1c2d1',
            mealTypeId: 'b4a5e44f-6c00-4ace-a871-5e53a5082f62',
            mealItems: [
              {
                id: '23116c1e-28dd-4aed-a8b8-ed4a3dc6b387',
                dishId: 'd49fde96-18e7-4da2-9015-73753db97359',
                weight: 1
              },
              {
                id: '4c5d48d8-79d9-4dfb-b4d6-4445454914e4',
                dishId: '0ebb86fd-87e9-428b-a898-2975cdd12315',
                weight: 2
              }
            ]
          },
          {
            id: '5bf89dc2-be73-4f77-982c-3a702a3eddd1',
            mealTypeId: '7ec0770d-ec0f-4b98-9ca6-4de758bff72b',
            mealItems: [
              {
                id: '5f2baf86-4a9a-420b-99db-57c5940c842f',
                dishId: 'a0dd2525-6a84-4511-bcd2-d85ba8a03863',
                weight: 0.5
              },
              {
                id: '57d91979-741a-4aea-96dd-1ce2debc1770',
                dishId: '64e55816-9469-4cc6-85e8-3ccd47976384',
                weight: 1
              }
            ]
          },
          {
            id: '6e1c57b5-72c6-42d9-abba-59e7d670f0a7',
            mealTypeId: 'd9fe93b7-cc95-4a67-8e9f-fa602eb0c425',
            mealItems: [
              {
                id: '30f3b62d-9a32-4318-b102-4871bbff770d',
                dishId: '8838bc96-6a52-40ff-92b4-6f8e7f0714f0',
                weight: 1
              },
              {
                id: 'e24ce5f4-eed5-4725-96cf-e0535be22206',
                dishId: 'c32a9c5d-ee8c-4df1-945b-df47d8616610',
                weight: 1
              },
              {
                id: '8cb0bc48-2943-4a4b-b34f-9794981bee10',
                dishId: 'a6d43d16-a8e1-44fa-aef1-c85ecbda3cea',
                weight: 1
              }
            ]
          },
          {
            id: '37a6eeed-77e5-4e6d-933e-3c925fadd8f3',
            mealTypeId: '7ec0770d-ec0f-4b98-9ca6-4de758bff72b',
            mealItems: [
              {
                id: 'a7fe096b-b77f-4e0c-8e56-3cbb4ea64c57',
                dishId: 'a0dd2525-6a84-4511-bcd2-d85ba8a03863',
                weight: 0.5
              },
              {
                id: 'fd125091-f3ac-4fdf-a3a9-b8675dc56de5',
                dishId: '0c2161d8-387b-41a8-a402-a21a29f3e09e',
                weight: 0.5
              }
            ]
          },
          {
            id: '9ed1eb2d-634f-4b93-ad85-d54599513037',
            mealTypeId: '521f15a7-2ad7-43e3-974c-20ca457644b0',
            mealItems: [
              {
                id: 'e79ee071-185a-4d4e-ba43-0d88e65ea228',
                dishId: '8838bc96-6a52-40ff-92b4-6f8e7f0714f0',
                weight: 1
              },
              {
                id: 'e12925db-744e-4fab-b781-ecae715802f0',
                dishId: 'c32a9c5d-ee8c-4df1-945b-df47d8616610',
                weight: 0.5
              }
            ]
          }
        ]
      },
      {
        id: 'f64ef5ab-cffd-4b92-9c15-9dd64ffe1085',
        caption: 'Вторник',
        totalKkal: 1800,
        meals: [
          {
            id: '3ad126c1-ffa2-4c2f-a69f-af0c9007b36e',
            mealTypeId: 'b4a5e44f-6c00-4ace-a871-5e53a5082f62',
            mealItems: [
              {
                id: 'f419375f-d550-4655-9cc7-657cef08d5a6',
                dishId: 'd49fde96-18e7-4da2-9015-73753db97359',
                weight: 1
              },
              {
                id: 'e5d40e7a-b1c1-4a1e-8017-c62740e062ac',
                dishId: '0ebb86fd-87e9-428b-a898-2975cdd12315',
                weight: 2
              }
            ]
          },
          {
            id: 'ffb1340e-fef2-4020-994c-48775432b207',
            mealTypeId: '7ec0770d-ec0f-4b98-9ca6-4de758bff72b',
            mealItems: [
              {
                id: '09635b85-5d72-407c-ace5-4c526d4c5a1b',
                dishId: 'a6d43d16-a8e1-44fa-aef1-c85ecbda3cea',
                weight: 1.05
              },
              {
                id: '58d4f12e-87c9-4fb8-80ad-f71d9bfc3865',
                dishId: '64e55816-9469-4cc6-85e8-3ccd47976384',
                weight: 1
              }
            ]
          },
          {
            id: '93fcdb93-ba28-4698-a16e-b08a9d315602',
            mealTypeId: 'd9fe93b7-cc95-4a67-8e9f-fa602eb0c425',
            mealItems: [
              {
                id: 'aec64111-fb2d-430d-a49c-a75fa6d5847c',
                dishId: '028bd6db-1f91-41c3-bbad-9a9e63f4cc5e',
                weight: 1
              }
            ]
          },
          {
            id: '3cf0e27e-524e-43bf-8527-d9a0fe0ba147',
            mealTypeId: '7ec0770d-ec0f-4b98-9ca6-4de758bff72b',
            mealItems: [
              {
                id: 'dddac207-7adc-4e44-9bbf-8f0d37f05376',
                dishId: 'a6d43d16-a8e1-44fa-aef1-c85ecbda3cea',
                weight: 1
              }
            ]
          },
          {
            id: 'de06df29-81e4-4ef4-b993-d687b4b68c73',
            mealTypeId: '521f15a7-2ad7-43e3-974c-20ca457644b0',
            mealItems: [
              {
                id: 'b92972b4-cdcd-4628-96a4-c2e85f7cc997',
                dishId: '028bd6db-1f91-41c3-bbad-9a9e63f4cc5e',
                weight: 0.5
              }
            ]
          }
        ]
      }
    ];
  }

  private seedDishes(): Dish[] {
    return [
      {
        id: 'd49fde96-18e7-4da2-9015-73753db97359',
        caption: 'Каша Геркулесовая ',
        comment: null,
        items: [
          {
            ingredientId: 'bbf564c1-7e4e-4536-85ef-b17a8304a50c',
            weight: 40
          },
          {
            ingredientId: 'cb978aa4-f507-4068-899a-7a00d59c0a41',
            weight: 10
          },
          {
            ingredientId: 'e06f7a74-f28d-4bed-b775-7141e9940877',
            weight: 225
          }
        ],
        category: 'Основное/Каши'
      },
      {
        id: '0ebb86fd-87e9-428b-a898-2975cdd12315',
        caption: 'Яйцо вареное',
        comment: null,
        items: [
          {
            ingredientId: 'ba352489-6d7c-44c7-8cc9-c538ac8fd4a8',
            weight: 60
          }
        ],
        category: 'Дополнительное'
      },
      {
        id: '9820c41b-7f14-4d72-96a9-061e0d5172eb',
        caption: 'Горбуша печеный кусок',
        comment: null,
        items: [
          {
            ingredientId: 'dd1cc9f0-d4b5-46f0-b820-b816fdab8956',
            weight: 150
          }
        ],
        category: 'Основное'
      },
      {
        id: 'c32a9c5d-ee8c-4df1-945b-df47d8616610',
        caption: 'Гречка отварная',
        comment: null,
        items: [
          {
            ingredientId: '86cfff13-3478-4cce-856d-d82c7fdf7919',
            weight: 80
          }
        ],
        category: 'Гарнир'
      },
      {
        id: '8838bc96-6a52-40ff-92b4-6f8e7f0714f0',
        caption: 'Форель печеный стейк',
        comment: '',
        items: [
          {
            ingredientId: '149fd136-49c5-4a30-ab6a-2a82a419cbd1',
            weight: 150
          }
        ],
        category: 'Основное'
      },
      {
        id: '0c2161d8-387b-41a8-a402-a21a29f3e09e',
        caption: 'Миндаль жареный',
        comment: '',
        items: [
          {
            ingredientId: 'b385ab9a-97c8-47bb-a2ac-beea71d6bcc8',
            weight: 25
          }
        ],
        category: 'Дополнительное'
      },
      {
        id: '64e55816-9469-4cc6-85e8-3ccd47976384',
        caption: 'Яблоко',
        comment: '',
        items: [
          {
            ingredientId: 'ffcb2b10-ed01-4630-96b0-69417fc2c76e',
            weight: 150
          }
        ],
        category: 'Дополнительное'
      },
      {
        id: 'a6ec9638-7c30-4eb6-b7f3-662abea91545',
        caption: 'Ряженка',
        comment: '',
        items: [
          {
            ingredientId: '54af6188-0aa6-4e50-9649-84c5669f4b59',
            weight: 500
          }
        ],
        category: 'Дополнительное'
      },
      {
        id: 'd92fb362-d304-42cc-87e0-6a3fa64af55b',
        caption: 'Слоеный десерт (1 пч)',
        comment: '',
        items: [
          {
            ingredientId: '46e89910-94a0-4c9c-baa3-8ab6dacbf173',
            weight: 18
          }
        ],
        category: 'Дополнительное'
      },
      {
        id: 'a0dd2525-6a84-4511-bcd2-d85ba8a03863',
        caption: 'Тарелка творога',
        comment: '',
        items: [
          {
            ingredientId: '00cde435-988d-4e97-801c-df96ae250c2b',
            weight: 180
          },
          {
            ingredientId: '54af6188-0aa6-4e50-9649-84c5669f4b59',
            weight: 125
          },
          {
            ingredientId: 'cb978aa4-f507-4068-899a-7a00d59c0a41',
            weight: 10
          }
        ],
        category: 'Дополнительное'
      },
      {
        id: '6347fa44-91f9-4514-bc5a-a078f94f561e',
        caption: 'Хлебец с сыром',
        comment: '1 хлебец с сыром',
        items: [
          {
            ingredientId: '69be4c6a-3db5-448d-8080-248f10893d4a',
            weight: 5
          },
          {
            ingredientId: '7675d8ab-18d4-4455-ae50-5b30fe8f1e3f',
            weight: 30
          }
        ],
        category: 'Дополнительное'
      },
      {
        id: 'a6d43d16-a8e1-44fa-aef1-c85ecbda3cea',
        caption: 'Хлебец с печенью по мурмански',
        comment: '',
        items: [
          {
            ingredientId: '69be4c6a-3db5-448d-8080-248f10893d4a',
            weight: 5
          },
          {
            ingredientId: '7ab209b9-5dd8-4ad8-a259-65ef92fe08f5',
            weight: 30
          }
        ],
        category: 'Дополнительное'
      },
      {
        id: '028bd6db-1f91-41c3-bbad-9a9e63f4cc5e',
        caption: 'Куриные бедра на рисе в рукаве',
        comment: 'Полпачки курицы в маринад - томатная паста 100 г, соевый соус 2 ст/ложки, чайная ложка горчицы, луковица. В рукав на 350 г. риса и 550 г. воды  - 40 минут',
        items: [
          {
            ingredientId: 'ffcaf27d-3f12-4682-9975-2b3c5bcbe8b4',
            weight: 100
          },
          {
            ingredientId: '7f0a57c1-1312-4fa1-bd96-e10f33382044',
            weight: 100
          },
          {
            ingredientId: 'c9c2b303-19d1-4fbc-97f9-853bdf6e049e',
            weight: 30
          },
          {
            ingredientId: 'fac693f4-ad90-4e2f-ac55-a4a335d5547b',
            weight: 25
          },
          {
            ingredientId: 'ef42796c-402d-4e88-b21d-51abf8886ce6',
            weight: 10
          }
        ],
        category: 'Основное'
      }
    ];
  }

  private seedIngredients(): Ingredient[] {
    return [
      {
        caption: 'Молоко 1%',
        kkal100: 42,
        protein100: 3.4,
        fat100: 1,
        carbon100: 5,
        id: 'e06f7a74-f28d-4bed-b775-7141e9940877',
        comment: null
      },
      {
        caption: 'Геркулес',
        kkal100: 350,
        protein100: 12,
        fat100: 6,
        carbon100: 62,
        id: 'bbf564c1-7e4e-4536-85ef-b17a8304a50c',
        comment: 'Геркулес традиционный, варить 15 мин'
      },
      {
        caption: 'Подсластитель',
        kkal100: 300,
        protein100: 0,
        fat100: 0,
        carbon100: 100,
        id: '0668b18f-3fa2-41ed-9d53-3d6d218efd66',
        comment: null
      },
      {
        caption: 'Яйцо',
        kkal100: 157,
        protein100: 12.7,
        fat100: 10.9,
        carbon100: 0.7,
        id: 'ba352489-6d7c-44c7-8cc9-c538ac8fd4a8',
        comment: null
      },
      {
        caption: 'Горбуша филе',
        kkal100: 116,
        protein100: 20,
        fat100: 4,
        carbon100: 0,
        id: 'dd1cc9f0-d4b5-46f0-b820-b816fdab8956',
        comment: null
      },
      {
        caption: 'Гречка',
        kkal100: 360,
        protein100: 13,
        fat100: 2.5,
        carbon100: 72,
        id: '86cfff13-3478-4cce-856d-d82c7fdf7919',
        comment: 'Пакетики по 80 г'
      },
      {
        caption: 'Сыр твороженный ВкусВилл',
        kkal100: 323,
        protein100: 6.1,
        fat100: 30,
        carbon100: 7.1,
        id: 'de104684-287a-4d5a-9dcc-9f9a6f3d5617',
        comment: null
      },
      {
        caption: 'Хлебец рис. с кунж',
        kkal100: 340,
        protein100: 8,
        fat100: 0.8,
        carbon100: 75.2,
        id: '69be4c6a-3db5-448d-8080-248f10893d4a',
        comment: '1 хлебец - 4.3 г'
      },
      {
        caption: 'Масло кунжутное',
        kkal100: 899,
        protein100: 0,
        fat100: 99.9,
        carbon100: 0,
        id: 'bb17a0cc-65f1-4eb6-afc9-938956b83bd1',
        comment: null
      },
      {
        caption: 'Нут',
        kkal100: 364,
        protein100: 19,
        fat100: 6,
        carbon100: 61,
        id: '444a22dd-c9ff-4004-837a-aeb7c23c5ff0',
        comment: null
      },
      {
        caption: 'Соевый соус',
        kkal100: 75,
        protein100: 5.5,
        fat100: 0,
        carbon100: 13,
        id: 'b4fb0931-e720-4f05-b947-b4425e23f23e',
        comment: null
      },
      {
        caption: 'Рис белый',
        kkal100: 344,
        protein100: 6.7,
        fat100: 0.4,
        carbon100: 78.4,
        id: '36f45de1-88e5-4218-b5d1-08662c5c6501',
        comment: 'Рис белый круглозерновой Италика (для сушев и онигирев)'
      },
      {
        caption: 'Форель стейк с/м',
        kkal100: 113,
        protein100: 20.5,
        fat100: 3.5,
        carbon100: 0,
        id: '149fd136-49c5-4a30-ab6a-2a82a419cbd1',
        comment: 'Выращенная карельская'
      },
      {
        caption: 'Миндаль жареный',
        kkal100: 614,
        protein100: 19,
        fat100: 54,
        carbon100: 13,
        id: 'b385ab9a-97c8-47bb-a2ac-beea71d6bcc8',
        comment: ''
      },
      {
        caption: 'Яблоко',
        kkal100: 52,
        protein100: 0,
        fat100: 0,
        carbon100: 14,
        id: 'ffcb2b10-ed01-4630-96b0-69417fc2c76e',
        comment: ''
      },
      {
        caption: 'Ряженка 3.5-4.5',
        kkal100: 65,
        protein100: 3,
        fat100: 4,
        carbon100: 4.2,
        id: '54af6188-0aa6-4e50-9649-84c5669f4b59',
        comment: 'ВкусВилл 0.5 баночка'
      },
      {
        caption: 'Слоеный десерт (Печенье)',
        kkal100: 472.8,
        protein100: 10.1,
        fat100: 22.8,
        carbon100: 56.8,
        id: '46e89910-94a0-4c9c-baa3-8ab6dacbf173',
        comment: '1 печенка 18 гр'
      },
      {
        caption: 'Манго',
        kkal100: 67,
        protein100: 0.5,
        fat100: 0.3,
        carbon100: 11.5,
        id: 'd8f2a8ca-c33e-4fee-b3be-1bb6f8c1cd37',
        comment: ''
      },
      {
        caption: 'Киви',
        kkal100: 48,
        protein100: 1,
        fat100: 0.6,
        carbon100: 10.3,
        id: '9024406c-b8d0-49f2-9d2b-c20391604a28',
        comment: ''
      },
      {
        caption: 'Авокадо',
        kkal100: 212,
        protein100: 2,
        fat100: 20,
        carbon100: 6,
        id: '4344bbe5-bc56-4f83-bad6-71d70f5f6369',
        comment: ''
      },
      {
        caption: 'Грейпфрут',
        kkal100: 29,
        protein100: 0.7,
        fat100: 0.2,
        carbon100: 6.5,
        id: 'b2e8f233-2e28-46bd-9ab7-aeb05ffc6a88',
        comment: ''
      },
      {
        caption: 'Банан',
        kkal100: 95,
        protein100: 1.5,
        fat100: 0.2,
        carbon100: 21.8,
        id: '407f18bb-bfc7-4bad-90b7-3f27b0df95d7',
        comment: ''
      },
      {
        caption: 'Томатная паста',
        kkal100: 26,
        protein100: 1.3,
        fat100: 0.2,
        carbon100: 4,
        id: 'fac693f4-ad90-4e2f-ac55-a4a335d5547b',
        comment: 'Pomi  Strained Tomatoes Passata di Pomodoro... Итальянские, августовские, не выше Краснодара, упаковка 0.5'
      },
      {
        caption: 'Огурец',
        kkal100: 15,
        protein100: 0.8,
        fat100: 0.1,
        carbon100: 2.8,
        id: 'c176aca5-5287-4ca3-9ed8-cd48f0b77d09',
        comment: 'Мелкий 130, крупный 300'
      },
      {
        caption: 'Томат',
        kkal100: 20,
        protein100: 1.1,
        fat100: 0.2,
        carbon100: 3.7,
        id: '53f1f6ea-aae3-4d35-a514-4f719b71d381',
        comment: ''
      },
      {
        caption: 'Салат Айсберг',
        kkal100: 14,
        protein100: 0.9,
        fat100: 0.1,
        carbon100: 1.8,
        id: 'cc59248e-37e0-43e2-b4f5-16b4ed1cb4aa',
        comment: ''
      },
      {
        caption: 'Капуста',
        kkal100: 27,
        protein100: 1.8,
        fat100: 0.1,
        carbon100: 4.7,
        id: '932a7e13-cb07-4bf7-b59d-81f2ef56d884',
        comment: ''
      },
      {
        caption: 'Морковь',
        kkal100: 32,
        protein100: 1.3,
        fat100: 0.1,
        carbon100: 6.9,
        id: 'd015043b-b39b-4fe9-a7cc-e65fa10f862a',
        comment: 'Мелкая 130 г / Крупная 330'
      },
      {
        caption: 'Тыква',
        kkal100: 28,
        protein100: 1.3,
        fat100: 0.3,
        carbon100: 7.7,
        id: 'cfe0d807-5c8f-4d9d-a2cf-ec428ab942cd',
        comment: ''
      },
      {
        caption: 'Кабачок',
        kkal100: 24,
        protein100: 0.6,
        fat100: 0.3,
        carbon100: 4.6,
        id: '3c8afbdf-b169-4714-bc0e-23d0b71b6c94',
        comment: ''
      },
      {
        caption: 'Баклажан',
        kkal100: 24,
        protein100: 1.2,
        fat100: 0.1,
        carbon100: 4.5,
        id: 'e8788d27-69bb-4c67-bb64-cc2287fbeb51',
        comment: ''
      },
      {
        caption: 'Лук репчатый',
        kkal100: 47,
        protein100: 1.4,
        fat100: 0,
        carbon100: 10.4,
        id: 'c9c2b303-19d1-4fbc-97f9-853bdf6e049e',
        comment: 'Одна луковица 130'
      },
      {
        caption: 'Чеснок',
        kkal100: 143,
        protein100: 6.5,
        fat100: 0.5,
        carbon100: 29.9,
        id: 'aa6222f9-6b1f-4cd7-9f0f-c5b1396228ff',
        comment: ''
      },
      {
        caption: 'Зелень (Укроп, петрушка, зеленый лук)',
        kkal100: 36,
        protein100: 2.6,
        fat100: 0.4,
        carbon100: 5.5,
        id: 'ef42796c-402d-4e88-b21d-51abf8886ce6',
        comment: ''
      },
      {
        caption: 'Набор винегрета',
        kkal100: 47.6,
        protein100: 1.6,
        fat100: 0,
        carbon100: 10.3,
        id: '72f2f294-5ba9-4823-b938-203d38805da5',
        comment: 'Набор для винегрета 600 гр. ВкусВилл (свекла, картофель, морковь)'
      },
      {
        caption: 'Горошек консервированный',
        kkal100: 38.4,
        protein100: 3.1,
        fat100: 0,
        carbon100: 6.5,
        id: '9a84a2f2-c2d0-4fb3-913e-434ea4773c7d',
        comment: '400 гр'
      },
      {
        caption: 'Огурцы маринованные',
        kkal100: 12,
        protein100: 0,
        fat100: 0,
        carbon100: 3,
        id: 'a16b3688-3aac-49f9-a763-31aac917d43e',
        comment: 'Банка 650 г ВкусВилл'
      },
      {
        caption: 'Фасоль консервированная красная',
        kkal100: 84,
        protein100: 6.1,
        fat100: 0,
        carbon100: 15,
        id: '47a785b1-85a1-4c57-bb01-039b86bc3bc2',
        comment: 'Банка 400 г'
      },
      {
        caption: 'Перец болгарский',
        kkal100: 27,
        protein100: 1.3,
        fat100: 0.1,
        carbon100: 5.3,
        id: 'c5792c0b-57a0-49db-92b4-22dcfbf36f89',
        comment: ''
      },
      {
        caption: 'Кофе',
        kkal100: 0,
        protein100: 0,
        fat100: 0,
        carbon100: 0,
        id: 'df84a005-22ae-4ecd-a178-a932822972c9',
        comment: 'Живой кофе - арабика Колумбия/Эфиопия (не кислит) или  Робуста Бразилия. Или растворимый ВкусВилл '
      },
      {
        caption: 'Сироп Тапинамбура',
        kkal100: 254,
        protein100: 0,
        fat100: 0,
        carbon100: 63.5,
        id: 'cb978aa4-f507-4068-899a-7a00d59c0a41',
        comment: ''
      },
      {
        caption: 'Шоколад горький',
        kkal100: 539,
        protein100: 6.2,
        fat100: 35.4,
        carbon100: 48.2,
        id: 'be75e27c-0dc8-4441-a702-4e509b28a616',
        comment: ''
      },
      {
        caption: 'Макароны из тв.пшеницы',
        kkal100: 380,
        protein100: 15,
        fat100: 1.5,
        carbon100: 73,
        id: '7ee8fa97-2c04-4b54-9120-566f4f3628fb',
        comment: 'Например "Макфа"'
      },
      {
        caption: 'Чечевица зел.',
        kkal100: 360,
        protein100: 28,
        fat100: 2,
        carbon100: 58,
        id: 'ce050b33-aaa2-4e48-8cc4-c6c18e265d82',
        comment: 'Чечевица элитная агроальянс'
      },
      {
        caption: 'Рис коричневый ',
        kkal100: 343,
        protein100: 7.8,
        fat100: 2.2,
        carbon100: 73.1,
        id: '7f0a57c1-1312-4fa1-bd96-e10f33382044',
        comment: 'Браун Мистраль'
      },
      {
        caption: 'Фасоль микс',
        kkal100: 327,
        protein100: 22,
        fat100: 1.7,
        carbon100: 63.3,
        id: '55cda763-59ba-4d89-a5e6-505c6716bd25',
        comment: 'Фасоль микс мистраль. (черная и белая)'
      },
      {
        caption: 'Киноа',
        kkal100: 380,
        protein100: 14,
        fat100: 7,
        carbon100: 65,
        id: 'd408b822-c195-4462-8eba-e8e98ed4109b',
        comment: ''
      },
      {
        caption: 'Миндаль',
        kkal100: 614,
        protein100: 19,
        fat100: 54,
        carbon100: 13,
        id: '2c6a66fe-7c5c-4ac5-8713-873f8bdd1a92',
        comment: 'Миндаль Ашан жареный'
      },
      {
        caption: 'Семечки',
        kkal100: 660,
        protein100: 22,
        fat100: 62,
        carbon100: 3,
        id: '29f9e092-2bf6-4760-915f-40eb28eee39c',
        comment: 'Сушеные чищенные'
      },
      {
        caption: 'Кедровый орех',
        kkal100: 670,
        protein100: 33.5,
        fat100: 67.5,
        carbon100: 11.8,
        id: '589ed13e-ff5e-45d4-91f2-3ec954f0c137',
        comment: ''
      },
      {
        caption: 'Масло оливковое',
        kkal100: 898,
        protein100: 0,
        fat100: 100,
        carbon100: 0,
        id: '30ade8fd-8a9c-4396-a3f3-e82372d44ddb',
        comment: ''
      },
      {
        caption: 'Котлеты из трески с брокколи (ВВ)',
        kkal100: 180,
        protein100: 13,
        fat100: 7,
        carbon100: 17,
        id: 'eacabe70-1f0d-403a-b32e-37762f64641f',
        comment: 'ВкусВилл вес 300 г 4 котлеты'
      },
      {
        caption: 'Печень и икра минтая (ВВ)',
        kkal100: 299,
        protein100: 14,
        fat100: 27,
        carbon100: 0,
        id: 'e81a017c-3c1a-4315-bd0f-6dc41a8033ee',
        comment: 'ВкусВилл 120 г'
      },
      {
        caption: 'Печень трески по мурмански',
        kkal100: 590,
        protein100: 4.5,
        fat100: 63,
        carbon100: 0,
        id: '7ab209b9-5dd8-4ad8-a259-65ef92fe08f5',
        comment: 'ВкусВилл 190 г.'
      },
      {
        caption: 'Скумбрия пряного посола (ВВ)',
        kkal100: 191,
        protein100: 18,
        fat100: 13,
        carbon100: 0,
        id: '221d3a8a-360d-486e-b6a0-9b386986e144',
        comment: 'Вес 300 г'
      },
      {
        caption: 'Сардина "Иваси" х/к',
        kkal100: 310,
        protein100: 13,
        fat100: 29,
        carbon100: 0,
        id: '98b3e3e3-be6a-4ebc-9e41-2a3578a6ede5',
        comment: 'Вес 150 г'
      },
      {
        caption: 'Кета зам стейк',
        kkal100: 127,
        protein100: 19,
        fat100: 5.6,
        carbon100: 0,
        id: '94c6176a-4a79-470b-9710-8e51808f1e5d',
        comment: '500 г. вылов Дальний Восток'
      },
      {
        caption: 'Семга малосол. кусок',
        kkal100: 202,
        protein100: 22.5,
        fat100: 12.5,
        carbon100: 0,
        id: '21213f4d-80d2-4507-ad7d-aca85dc5d151',
        comment: '250 г кусок для суши, вкус нейтральный. Самая жирная'
      },
      {
        caption: 'Форель малосол. кусок',
        kkal100: 97,
        protein100: 19.5,
        fat100: 2.1,
        carbon100: 0,
        id: '89bbaf2c-32cd-40df-a6e0-0f537b0eb893',
        comment: 'Кусок 200 г.  выращенная. Наименее жирная'
      },
      {
        caption: 'Нерка малосол. кусок',
        kkal100: 161,
        protein100: 20,
        fat100: 9,
        carbon100: 0,
        id: '6709c278-b8b1-4f07-9d43-4dc27cde17d3',
        comment: 'Вылов Камчатка'
      },
      {
        caption: 'Филе бедра куриное без кост',
        kkal100: 187,
        protein100: 13,
        fat100: 15,
        carbon100: 0,
        id: 'ffcaf27d-3f12-4682-9975-2b3c5bcbe8b4',
        comment: '800 г'
      },
      {
        caption: 'Филе грудки цып',
        kkal100: 132,
        protein100: 15,
        fat100: 8,
        carbon100: 0,
        id: '5ba09431-90a1-4518-9aa0-5b97cd6053a2',
        comment: '900 г'
      },
      {
        caption: 'Творог обезж. пачка',
        kkal100: 90,
        protein100: 18.5,
        fat100: 0.3,
        carbon100: 3.3,
        id: '00cde435-988d-4e97-801c-df96ae250c2b',
        comment: '180 г'
      },
      {
        caption: 'Сыр мягкий "Южный"',
        kkal100: 228,
        protein100: 16.5,
        fat100: 18,
        carbon100: 0,
        id: 'c48abbed-13b8-436f-857d-4b4600c288c2',
        comment: '300 г'
      },
      {
        caption: 'Сыр легкий',
        kkal100: 291,
        protein100: 28.4,
        fat100: 19.1,
        carbon100: 1.3,
        id: '7675d8ab-18d4-4455-ae50-5b30fe8f1e3f',
        comment: '300 г'
      },
      {
        caption: 'Кефир 1%',
        kkal100: 37,
        protein100: 3,
        fat100: 1,
        carbon100: 4,
        id: 'ec1ca83f-e408-4797-a95c-a9428349d2af',
        comment: '900 г'
      },
      {
        caption: 'Сыр с плесенью Дор Блю и т.д.',
        kkal100: 388,
        protein100: 18.7,
        fat100: 34.8,
        carbon100: 0,
        id: 'da55da02-e851-47c0-b3d9-24f5079b3df7',
        comment: ''
      },
      {
        caption: 'Сыр пармезан',
        kkal100: 358,
        protein100: 31.7,
        fat100: 25.7,
        carbon100: 0,
        id: '5864b1aa-e93f-4e8b-abad-199d1a59880a',
        comment: ''
      }
    ];
  }
}
