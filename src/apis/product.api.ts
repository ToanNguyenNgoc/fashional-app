import {axiosConfig} from '@/configs';
import {
  IProduct,
  IProductBranch,
  IProductMedia,
  IProductSize,
  QrProduct,
  QrProductBranch,
  ResponseDetail,
  ResponseList,
} from '@/interfaces';

export const productApi = {
  findAll: (qr: QrProduct) =>
    axiosConfig
      .get('/v1/products', {params: qr})
      .then<ResponseList<IProduct[]>>(res => res.data),
  findProductById: (id: number) =>
    axiosConfig
      .get(`/v1/products/${id}`, {
        params: {
          includes: 'category|sizes',
        },
      })
      .then<ResponseDetail<IProduct>>(res => res.data),
  findProductGalleries: (id: number) =>
    axiosConfig
      .get(`/v1/products/${id}/medias`)
      .then<ResponseList<IProductMedia[]>>(res => res.data),
  findProductSizes: (id: number) =>
    axiosConfig
      .get(`/v1/products/${id}/sizes`)
      .then<ResponseList<IProductSize[]>>(res => res.data),
  findProductBranches: (id: number, qr: QrProductBranch) =>
    axiosConfig
      .get(`/v1/products/${id}/branches`, {params: qr})
      .then<ResponseList<IProductBranch[]>>(res => res.data),
};
