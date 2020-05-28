import { Reducer } from 'redux';
import { IProduct } from '../../Models/product';
import { ProductActions, ProductActionTypes } from '../actions/products';

// Define the Product State
export interface IProductState {
  readonly products: IProduct[];
  readonly product: IProduct;
}

const initialProduct: IProduct = {
  Product: '',
  ProductCost: 0,
  OwnerEmail: '',
  ProductCode: '',
};

const initialProductState: IProductState = {
  products: [],
  product: initialProduct,
};

export const productReducer: Reducer<IProductState, ProductActions> = (
  state = initialProductState,
  action
) => {
  switch (action.type) {
    case ProductActionTypes.GET_PRODUCTS: {
      return {
        ...state,
        products: action.products,
      };
    }
    case ProductActionTypes.DELETE_PRODUCT: {
      return {
        ...state,
        products: state.products.filter((product) => product._id !== action.id),
      };
    }
    case ProductActionTypes.CREATE_PRODUCT: {
      return {
        ...state,
        products: [action.product, ...state.products],
      };
    }
    case ProductActionTypes.UPDATE_PRODUCT: {
      return {
        ...state,
        products: state.products.map((product) => {
          if (product._id === action.product._id) {
            return action.product;
          }
          return product;
        }),
      };
    }
    default:
      return state;
  }
};
