// Import redux types
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

// Import Character Typing
import { IProduct } from '../../Models/product';
import { IProductState } from '../reducers/product';
import { setAlert, AlertActionTypes } from './alert';

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

      const id = uuid();

      const alert = {
        msg: `Sucessfully Created Product ${product.Product} `,
        type: 'success',
        id,
      };

      dispatch({
        alert: alert,
        type: AlertActionTypes.SET_ALERT,
      });

      setTimeout(
        () => dispatch({ type: AlertActionTypes.REMOVE_ALERT, alert: id }),
        5000
      );
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
        type: ProductActionTypes.DELETE_PRODUCT,
      });

      const alertID = uuid();

      const alert = {
        msg: `Sucessfully Deleted Product `,
        type: 'info',
        id,
      };

      dispatch({
        alert: alert,
        type: AlertActionTypes.SET_ALERT,
      });

      setTimeout(
        () => dispatch({ type: AlertActionTypes.REMOVE_ALERT, alert: alertID }),
        5000
      );
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
      const id = uuid();
      const alert = {
        msg: `Sucessfully Updated Product ${product.Product} `,
        type: 'success',
        id,
      };
      dispatch({
        alert: alert,
        type: AlertActionTypes.SET_ALERT,
      });
      setTimeout(
        () => dispatch({ type: AlertActionTypes.REMOVE_ALERT, alert: id }),
        5000
      );
    } catch (err) {
      const id = uuid();
      const alert = {
        msg: err.message,
        type: 'error',
        id,
      };
      dispatch({
        alert: alert,
        type: AlertActionTypes.SET_ALERT,
      });
      setTimeout(
        () => dispatch({ type: AlertActionTypes.REMOVE_ALERT, alert: id }),
        5000
      );
      console.error(err);
    }
  };
};
