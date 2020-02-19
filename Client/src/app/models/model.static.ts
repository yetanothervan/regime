import { WholeDayNutrientIndicator, WholeDayNutrientTotals, WholeDayNutrientTargetPercent } from './day-indicator.model';
import { MealType } from '../dtos/meal-type';

export class ModelService {
  public static getPercentageClass(n: number): number {
    if (n === 0) return 1;
    if (!n) return 0;
    if (n < 75 || n > 115) return 1;
    if (n < 90 || n > 105) return 2;
    return 3;
  }

  public static getClass(n: number): string {
    switch (n) {
      case 0: return '';
      case 1: return 'bad';
      case 2: return 'average';
      case 3: return 'good';
    }
    return '';
  }

  public static getDayIndicator(targets: WholeDayNutrientTargetPercent,
    totals: WholeDayNutrientTotals, totalKk: number): WholeDayNutrientIndicator {
    const result = new WholeDayNutrientIndicator();
    result.kkPercent = totalKk === 0 ? 0 : this.round(totals.kkalTotal / totalKk /*(!)*/);
    const nutrientsTotal = totals.proteinTotal + totals.fatTotal + totals.carbonTotal;
    result.proteinDisplay = nutrientsTotal === 0 ? 0 : this.round(totals.proteinTotal / nutrientsTotal);
    result.fatDisplay = nutrientsTotal === 0 ? 0 : this.round(totals.fatTotal / nutrientsTotal);
    result.carbonDisplay = nutrientsTotal === 0 ? 0 : this.round(totals.carbonTotal / nutrientsTotal);
    result.proteinPercent = targets.proteinTargetPercent === 0 ? 0 : result.proteinDisplay / targets.proteinTargetPercent;
    result.fatPercent = targets.fatTargetPercent === 0 ? 0 : result.fatDisplay / targets.fatTargetPercent;
    result.carbonPercent = targets.carbonTargetPercent === 0 ? 0 : result.carbonDisplay / targets.carbonTargetPercent;
    result.proteinClass = ModelService.getClass(ModelService.getPercentageClass(result.proteinPercent));
    result.fatClass = ModelService.getClass(ModelService.getPercentageClass(result.fatPercent));
    result.carbonClass = ModelService.getClass(ModelService.getPercentageClass(result.carbonPercent));
    result.kkClass = ModelService.getClass(ModelService.getPercentageClass(result.kkPercent));
    return result;
  }

  public static getDayTargets(mt: MealType[]): WholeDayNutrientTargetPercent {
    const result = new WholeDayNutrientTargetPercent();
    mt.forEach(el => {
      if (el) {
        result.proteinTargetPercent += el.kkalTotal * el.proteinPart / 100;
        result.fatTargetPercent += el.kkalTotal * el.fatPart / 100;
        result.carbonTargetPercent += el.kkalTotal * el.carbonPart / 100;
        result.kkTargetPercent += el.kkalTotal;
      }
    });
    result.proteinTargetPercent = result.proteinTargetPercent / result.kkTargetPercent;
    result.fatTargetPercent = result.fatTargetPercent / result.kkTargetPercent;
    result.carbonTargetPercent = result.carbonTargetPercent / result.kkTargetPercent;
    return result;
  }

  private static round(n: number): number {
    return Math.round((n + Number.EPSILON) * 100);
  }
}