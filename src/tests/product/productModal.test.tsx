import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import ProductModal from '../../components/Product/ProductModal';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props: any, state: any) => {
  const wrapper = shallow(<ProductModal {...props} />);

  if (state) wrapper.setState(state);

  return wrapper;
};

const findByTestAttr = (wrapper: any, val: any) => {
  return wrapper.find(`[id="${val}"]`);
};

const findByTestAtrrByClassName = (wrapper: any, val: any) => {
  return wrapper.find(`[className="${val}"]`);
};

const product = {
  Product: 'Test Product',
  ProductCode: 'TS4',
  ProductLocation: 'Test Town',
  ProductCost: 299.99,
  ProductOwner: 'Test',
  OwnerEmail: 'test@hotmail.com',
};

describe('Initial Rendering of elements', () => {
  test('renders without any error', () => {
    const wrapper = setup(null, null);
    const modalContainer = findByTestAttr(wrapper, 'modalContainer');
    expect(modalContainer.length).toBe(1);
  });
  test('renders the modal without any error', () => {
    const wrapper = setup(null, null);
    const productModal = findByTestAtrrByClassName(wrapper, 'productModal');
    expect(productModal.length).toBe(1);
  });
  test('Initial State of show is false and modal is hidden', () => {
    const wrapper = setup(null, null);
    expect(wrapper.state('show')).toBeFalsy();
  });
});

describe('When Different prop values are passed', () => {
  test('When prop value for the show is passed and no product the state changes and modal is displayed with new product title', () => {
    // const componentWillReceiveProps = jest.fn();
    // const wrapper = setup({ show: true }, null);
    // const titleModal = findByTestAtrrByClassName(wrapper, 'ant-modal-title');
    // expect(titleModal.length).toBe(1);
  });
  test('When the cancel button is clicked the modal disappears with false show state', () => {
    const wrapper = setup({ show: true }, null);
    wrapper.setState({ show: true });
    const productModal = findByTestAtrrByClassName(wrapper, 'productModal');
    expect(productModal.length).toBe(1);
    const cancelButton = findByTestAtrrByClassName(wrapper, 'cancelButton');
    expect(cancelButton.length).toBe(1);
    cancelButton.simulate('click');
    expect(wrapper.state('show')).toBe(false);
  });
  // test('If the product is passed in the props then the title is edit product', () => {
  //   const wrapper = setup({ show: true }, null);
  //   expect(wrapper.state('show')).toBeTruthy();
  // });
});
