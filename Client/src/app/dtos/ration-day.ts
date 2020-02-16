/**
 * This is a TypeGen auto-generated file.
 * Any changes made to this file can be lost when this file is regenerated.
 */

import { Meal } from './meal';
import { DayModel } from '../models/day.model';

export class RationDay {
    id: string;
    caption: string;
    totalKkal: number;
    meals: Meal[];
}
