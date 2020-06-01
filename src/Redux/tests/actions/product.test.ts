import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { getAllProducts, ProductActionTypes } from '../../actions/products';
import { initialStateWithData } from '../reducers/product.data';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('getAllProducts actions', () => {
  beforeEach(function () {
    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });

  it('creates GET_PRODUCTS Actions once succesfully fetched the post', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: initialStateWithData,
      });
    });

    const expectedActions = [
      { type: ProductActionTypes.GET_PRODUCTS, products: initialStateWithData },
    ];

    const store = mockStore({ posts: {} });

    return store.dispatch<any>(getAllProducts()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
