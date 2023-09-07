export interface Page {
  page?: number;
  limit?: number;
}
export interface QrProductBranch extends Page {
  status?: boolean;
}
export interface QrProduct extends Page {
  search?: string;
  branch_ids?: string;
  tag_id?: number | string;
  category_ids?: string;
  min_price?: number;
  max_price?: number;
  includes?: string;
  sort?: string;
  status?: boolean;
}
