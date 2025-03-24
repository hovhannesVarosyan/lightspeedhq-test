export interface ITax {
  taxable: boolean;
  defaultLocationIncludedTaxRate: number;
  enabledManualTaxes: unknown[];
  taxClassCode: string;
}
