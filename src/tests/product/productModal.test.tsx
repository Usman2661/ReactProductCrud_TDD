import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { ProductModalBase } from '../../components/Product/ProductModal';
import { wrap } from 'module';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props: any, state: any) => {
  const wrapper = shallow(<ProductModalBase {...props} />);

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
  test('renders the form inside the modal', () => {
    const wrapper = setup(null, null);
    const productModal = findByTestAtrrByClassName(wrapper, 'productForm');
    expect(productModal.length).toBe(1);
  });
});

describe('When Different prop values are passed', () => {
  test('When the edit is true the Modal should have title edit product', () => {
    const wrapper = shallow(<ProductModalBase edit={true} />);

    // const productModal = findByTestAtrrByClassName(wrapper, 'productForm');
    // expect(productModal.length).toBe(1);
    // const productField = findByTestAtrrByClassName(wrapper, 'Product');
    // expect(productField.length).toBe(1);
    // expect(productField.value).toBe(undefined);
    // console.log(productField.value);
  });
  // test('When the cancel button is clicked the modal disappears with false show state', () => {
  //   const wrapper = setup(null, null);
  //   const productModal = findByTestAtrrByClassName(wrapper, 'productModal');
  //   expect(productModal.length).toBe(1);
  //   const title = findByTestAtrrByClassName(wrapper, 'ant-modal-header');
  //   expect(title.length).toBe(1);
  // });
  test('If the product is passed in the props then the fields should contain values', () => {
    const wrapper = shallow(<ProductModalBase edit={true} />);

    // console.log(wrapper.props().show);

    // const productModal = findByTestAtrrByClassName(wrapper, 'productForm');
    // expect(productModal.length).toBe(1);
    // const productField = findByTestAtrrByClassName(wrapper, 'Product');
    // expect(productField.length).toBe(1);
    // expect(productField.value).toBe(undefined);
    // console.log(productField.value);
  });
});
