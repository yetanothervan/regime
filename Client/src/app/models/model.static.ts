export class ModelService {
    public static getPercentageClass (n: number): number {
        if (n === 0) return 1;
        if (!n) return 0;
        if (n < 75 || n > 115) return 1;
        if (n < 90 || n > 105) return 2;
        return 3;
      }

    public static getClass (n: number): string {
      switch(n){
        case 0: return '';
        case 1: return 'bad';
        case 2: return 'average';
        case 3: return 'good';
      }
      return '';
    }
}