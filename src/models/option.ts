import type { IChoice } from "./choice";
import type { ITranslation } from "./translation";

export interface IOption {
  type: string;
  name: string;
  nameTranslated: ITranslation;
  choices: IChoice[];
  defaultChoice: number;
  required: boolean;
}
