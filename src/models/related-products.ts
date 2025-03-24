import type { IRelatedCategory } from "./related-category";

export interface IRelatedProducts {
  productIds: number[];
  relatedCategory: IRelatedCategory;
}
