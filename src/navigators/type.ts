import {IProduct} from '@/interfaces';

export type RootStackParamList = {
  Main: undefined;
  SignIn: undefined;
  ProductDetail: {id: number; state: IProduct};
};
