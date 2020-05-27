// Import redux types
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

// Import Character Typing
import { IProduct } from '../../Models/product';
import { IProductState } from '../reducers/product';
import { setAlert } from './alert';

// Create Action Constants
export enum ProductActionTypes {
  CREATE_PRODUCT = 'CREATE_PRODUCT',
  GET_PRODUCTS = 'GET_PRODUCTS',
  UPDATE_PRODUCT = 'UPDATE_PRODUCT',
  DELETE_PRODUCT = 'DELETE_PRODUCT',
}

// Interface for Get All Action Type
export interface GetProductsAction {
  type: ProductActionTypes.GET_PRODUCTS;
  products: IProduct[];
}

export interface DeleteProductAction {
  type: ProductActionTypes.DELETE_PRODUCT;
  id: string;
}

export interface CreateProductAction {
  type: ProductActionTypes.CREATE_PRODUCT;
  product: IProduct;
}

export interface UpdateProductAction {
  type: ProductActionTypes.UPDATE_PRODUCT;
  product: IProduct;
}

/* 
Combine the action types with a union (we assume there are more)
example: export type CharacterActions = IGetAllAction | IGetOneAction ... 
*/
export type ProductActions =
  | GetProductsAction
  | DeleteProductAction
  | CreateProductAction
  | UpdateProductAction;

/* Get All Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const getAllProducts: ActionCreator<ThunkAction<
  Promise<any>,
  IProductState,
  null,
  GetProductsAction
>> = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get('http://localhost:3002/api/product');
      dispatch({
        products: response.data,
        type: ProductActionTypes.GET_PRODUCTS,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const createProduct: ActionCreator<ThunkAction<
  Promise<any>,
  IProductState,
  null,
  CreateProductAction
>> = (product: IProduct) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(
        'http://localhost:3002/api/product',
        product
      );
      dispatch({
        product: response.data,
        type: ProductActionTypes.CREATE_PRODUCT,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const deleteProduct: ActionCreator<ThunkAction<
  Promise<any>,
  IProductState,
  null,
  DeleteProductAction
>> = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.delete(
        `http://localhost:3002/api/product/${id}`
      );
      dispatch({
        id: response.data.id,
        type: ProductActionTypes.UPDATE_PRODUCT,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const updateProduct: ActionCreator<ThunkAction<
  Promise<any>,
  IProductState,
  null,
  UpdateProductAction
>> = (product: IProduct) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.put(
        `http://localhost:3002/api/product/${product._id}`,
        product
      );
      dispatch({
        product: response.data.product,
        type: ProductActionTypes.UPDATE_PRODUCT,
      });
    } catch (err) {
      console.error(err);
    }
  };
};
