import type { ITranslation } from "./translation";

export interface IChoice {
  text: string;
  textTranslated: ITranslation;
  priceModifier: number;
  priceModifierType: string;
}
