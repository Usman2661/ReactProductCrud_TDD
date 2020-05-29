import { productReducer } from '../../reducers/product';
import { ProductActions, ProductActionTypes } from '../../actions/products';
import {
  initialState,
  initialStateWithData,
  getProductProducts,
} from './product.data';

describe('Initial Render of state', () => {
  it('returns the initial state correctly', () => {
    const reducer = productReducer(undefined, {});
    expect(reducer).toEqual(initialState);
  });
});

describe('GET_PRODUCTS', () => {
  it('It Handles the GET_PRODUCTS Actions properly', () => {
    const reducer = productReducer(initialState, {
      type: ProductActionTypes.GET_PRODUCTS,
      products: getProductProducts,
    });

    expect(reducer).toEqual({
      products: getProductProducts,
    });
  });
  it('GET_PRODUCTS should mactch whats passed in the payload', () => {
    const reducer = productReducer(initialState, {
      type: ProductActionTypes.GET_PRODUCTS,
      products: getProductProducts,
    });

    expect(reducer).not.toEqual({
      products: initialStateWithData,
    });
  });
});

it('handles CREATE_PRODUCT as expected', () => {
  const reducer = productReducer(initialStateWithData, {
    type: ProductActionTypes.CREATE_PRODUCT,
    product: {
      _id: '5kshkhas',
      Product: 'Play Station 4',
      ProductCode: 'PS4',
      ProductLocation: 'Luton',
      ProductCost: 299.99,
      ProductOwner: 'Safian',
      OwnerEmail: 'usmanusman140@hotmail.com',
    },
  });

  expect(reducer).toEqual({
    products: [
      {
        _id: '5kshkhas',
        Product: 'Play Station 4',
        ProductCode: 'PS4',
        ProductLocation: 'Luton',
        ProductCost: 299.99,
        ProductOwner: 'Safian',
        OwnerEmail: 'usmanusman140@hotmail.com',
      },
      {
        _id: 'jbjshjhsg',
        Product: 'Play Station 4',
        ProductCode: 'PS4',
        ProductLocation: 'Luton',
        ProductCost: 299.99,
        ProductOwner: 'Safian',
        OwnerEmail: 'usmanusman136@hotmail.com',
      },
      {
        _id: 'test-jhgjh-76hsja',
        Product: 'Test Product',
        ProductCode: 'TS4',
        ProductLocation: 'Test Town',
        ProductCost: 123.99,
        ProductOwner: 'Test',
        OwnerEmail: 'test@test.com',
      },
    ],
  });
});

describe('UPDATE_PRODUCT', () => {
  it('update product should update the required attributes of the product', () => {
    const reducer = productReducer(initialStateWithData, {
      type: ProductActionTypes.UPDATE_PRODUCT,
      product: {
        _id: 'test-jhgjh-76hsja',
        Product: 'Update Product',
        ProductCode: 'UPS5',
        ProductLocation: 'Update Town',
        ProductCost: 123.99,
        ProductOwner: 'Update',
        OwnerEmail: 'update@test.com',
      },
    });

    expect(reducer).toEqual({
      products: [
        {
          _id: 'jbjshjhsg',
          Product: 'Play Station 4',
          ProductCode: 'PS4',
          ProductLocation: 'Luton',
          ProductCost: 299.99,
          ProductOwner: 'Safian',
          OwnerEmail: 'usmanusman136@hotmail.com',
        },
        {
          _id: 'test-jhgjh-76hsja',
          Product: 'Update Product',
          ProductCode: 'UPS5',
          ProductLocation: 'Update Town',
          ProductCost: 123.99,
          ProductOwner: 'Update',
          OwnerEmail: 'update@test.com',
        },
      ],
    });
  });
});

describe('DELETE_PRODUCT', () => {
  it('it should remove the product with the given ID products array', () => {
    const reducer = productReducer(initialStateWithData, {
      type: ProductActionTypes.DELETE_PRODUCT,
      id: 'test-jhgjh-76hsja',
    });

    expect(reducer).toEqual({
      products: [
        {
          _id: 'jbjshjhsg',
          Product: 'Play Station 4',
          ProductCode: 'PS4',
          ProductLocation: 'Luton',
          ProductCost: 299.99,
          ProductOwner: 'Safian',
          OwnerEmail: 'usmanusman136@hotmail.com',
        },
      ],
    });
  });
});
