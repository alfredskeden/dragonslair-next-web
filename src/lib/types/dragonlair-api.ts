export interface DragonLairApi {
  code: number;
  response: Response;
  location?: null;
}
export interface Response {
  total: number;
  url: string;
  rows?: RowsEntity[] | null;
}
export interface RowsEntity {
  Id: string;
  Name: string;
  SortString: string;
  Fulltext: string;
  Active: boolean;
  Expired: boolean;
  Sku: string;
  Price: number;
  BasePrice: number;
  Rating?: null;
  BuyinPrice: string;
  Tags?: string[] | null;
  Categories?: string[] | null;
  Barcodes?: null[] | null;
  Campaigns?: null[] | null;
  ImageId: string;
  Stock: StockOrPopularityByStore;
  StockPoint: StockPoint;
  TotalAvailable: number;
  PrimaryAvailable: number;
  PrimaryStore: string;
  Reserved: number;
  Popularity: number;
  PopularityByStore: StockOrPopularityByStore;
  RecentByStore: RecentByStore;
  URL: string;
  ReleasedAt: string;
  ReleasedAtFormat: string;
  ReleasedAtFormatted: string;
  AvailableAt?: string | null;
  Fuzzy: boolean;
  Bookable: boolean;
  CampaignPrice: boolean;
  AddedAt: string;
  UpdatedAt: string;
  Boost: number;
  _boost: number;
  Score: string;
}
export interface StockOrPopularityByStore {
  1: number;
  2: number;
  3: number;
  5: number;
}
export interface StockPoint {
  1: string;
  2: number;
  3: number;
  5: number;
}
export interface RecentByStore {
  1: string;
  2: string;
  3: string;
  5: string;
}
