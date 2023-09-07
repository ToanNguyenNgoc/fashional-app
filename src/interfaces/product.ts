import {IMedia} from '@/interfaces';

export interface ITag {
  id: number;
  name: string;
  name_slugify: string;
  type: string;
  status: boolean;
  deleted: boolean;
  updated_at: string;
  created_at: string;
}
export interface ICategory {
  id: number;
  name: string;
  name_slugify: string;
  status: boolean;
  deleted: boolean;
  updated_at: string;
  created_at: string;
}
export interface IProduct {
  id: number;
  name: string;
  name_slugify: string;
  thumbnail_url: string;
  price_original: number;
  price: number;
  price_special: number;
  short_content: string;
  status: boolean;
  deleted: boolean;
  updated_at: string;
  created_at: string;
  created_by_id: number;
  tag_id: number;
  category_id: number;
  tag?: ITag;
  category?: ICategory;
}
export interface IProductMedia {
  media: IMedia;
}
export interface IProductSize {
  id: number;
  product_id: number;
  name: string;
  status: boolean;
  updated_at: string;
  created_at: string;
}
export interface IProductBranch {
  quantity: number;
  status: boolean;
  created_at: string;
  branch: {
    id: number;
    name: string;
    short_address: string;
    email: string;
    hotline: string;
    province: {
      name: string;
    };
    district: {
      name: string;
    };
    ward: {
      name: string;
    };
  };
}
