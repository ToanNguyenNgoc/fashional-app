export interface ResponseList<T> {
  statusCode: number;
  context: {
    data: T;
    total: number;
    total_page: number;
    prev_page: number;
    current_page: number;
    next_page: number;
  };
}

export interface ResponseDetail<T> {
  statusCode: number;
  context: T;
}
