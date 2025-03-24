import type { IBorderInfo } from "./border-info";

export interface IGalleryImage {
  id: number;
  url: string;
  thumbnail: string;
  originalImageUrl: string;
  imageUrl: string;
  hdThumbnailUrl: string;
  thumbnailUrl: string;
  smallThumbnailUrl: string;
  width: number;
  height: number;
  orderBy: number;
  borderInfo: IBorderInfo;
}
