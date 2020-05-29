//import the action to mock
import { getAllProducts, ProductActionTypes } from '../../actions/products';

// import configreStore to create a mock store where we will dispatch our actions
import configureStore from 'redux-mock-store';
//import thunk middle to make our action asyncronous
import thunk from 'redux-thunk';

// important:  this i have used to mock the axios call
import MockAdapter from 'axios-mock-adapter';
// import axios dependency
import axios from 'axios';
import { initialStateWithData } from '../reducers/product.data';

// declare middlewares
const middlewares = [thunk];

// initialize mockStore which is only the configureStore method which take middlesware as its parameters
const mockStore = configureStore(middlewares);

//creating a mock instance from the MockAdapter of axios
const mock = new MockAdapter(axios);

const store = mockStore({});

// firing up the test Suite
describe('Testing getAllProducts()', () => {
  beforeEach(() => {
    // Runs before each test in the suite
    store.clearActions();
  });
  it('should get GET_PRODUCTS', () => {
    mock.onGet('/products').reply(200, {
      products: initialStateWithData,
    });

    store.dispatch<any>(getAllProducts()).then(() => {
      let expectedActions = [
        {
          type: ProductActionTypes.GET_PRODUCTS,
          products: initialStateWithData,
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
