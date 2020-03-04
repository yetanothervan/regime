import { ReportItem } from './report-item';

export class ReportDay {
    constructor() {
        this.items = [];
    }
    caption: string;
    items: ReportItem[];
}