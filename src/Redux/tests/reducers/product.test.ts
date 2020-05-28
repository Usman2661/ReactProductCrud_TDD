import { productReducer } from '../../reducers/product';
import { ProductActions, ProductActionTypes } from '../../actions/products';

const initialState = {
  products: [],
};

const initialStateWithData = {
  products: [
    {
      _id: 1,
      Product: 'Play Station 4',
      ProductCode: 'PS4',
      ProductLocation: 'Luton',
      ProductCost: 299.99,
      ProductOwner: 'Safian',
      OwnerEmail: 'usmanusman136@hotmail.com',
    },
    {
      _id: 2,
      Product: 'Play Station 4',
      ProductCode: 'PS4',
      ProductLocation: 'Luton',
      ProductCost: 299.99,
      ProductOwner: 'Safian',
      OwnerEmail: 'usmanusman137@hotmail.com',
    },
    {
      _id: 3,
      Product: 'Play Station 4',
      ProductCode: 'PS4',
      ProductLocation: 'Luton',
      ProductCost: 299.99,
      ProductOwner: 'Safian',
      OwnerEmail: 'usmanusman138@hotmail.com',
    },
  ],
};

it('returns the initial state correctly', () => {
  const reducer = productReducer(undefined, {});

  expect(reducer).toEqual(initialState);
});

it('It Handles the GET_PRODUCTS Actions properly', () => {
  const reducer = productReducer(initialState, {
    type: ProductActionTypes.GET_PRODUCTS,

    products: [
      {
        _id: 'jhhhgjh898',
        Product: 'Play Station 4',
        ProductCode: 'PS4',
        ProductLocation: 'Luton',
        ProductCost: 299.99,
        ProductOwner: 'Safian',
        OwnerEmail: 'usmanusman136@hotmail.com',
      },
    ],
  });

  expect(reducer).toEqual({
    products: [
      {
        _id: 'jhhhgjh898',
        Product: 'Play Station 4',
        ProductCode: 'PS4',
        ProductCost: 299.99,
        ProductOwner: 'Safian',
        OwnerEmail: 'usmanusman136@hotmail.com',
      },
    ],
  });
});
