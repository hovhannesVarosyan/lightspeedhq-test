export interface IShipping {
  type: string;
  methodMarkup: number;
  flatRate: number;
  disabledMethods: unknown[];
  enabledMethods: unknown[];
}
