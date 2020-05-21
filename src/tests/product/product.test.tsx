import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Product from '../../components/Product/Product';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<Product {...props} />);

  if (state) wrapper.setState(state);

  return wrapper;
};

const findByTestAttr = (wrapper: any, val: any) => {
  return wrapper.find(`[id="${val}"]`);
};
const findByTestAtrrByClassName = (wrapper: any, val: any) => {
  return wrapper.find(`[className="${val}"]`);
};

describe('Rendering of elements', () => {
  test('renders without any error', () => {
    const wrapper = setup();
    const productTableContainer = findByTestAttr(
      wrapper,
      'productTableContainer'
    );
    expect(productTableContainer.length).toBe(1);
  });
  test('renders table without any error', () => {
    const wrapper = setup();
    const productTable = findByTestAttr(wrapper, 'productTable');
    expect(productTable.length).toBe(1);
  });
  test('renders button without any error', () => {
    const wrapper = setup();
    const productButton = findByTestAttr(wrapper, 'productButton');
    expect(productButton.length).toBe(1);
  });
});

describe('Functionality', () => {
  test('Initial state of the show is false', () => {
    const wrapper = setup();
    expect(wrapper.state('show')).toBe(false);
  });
  test('Button Click changes the state to true and opens the modal', () => {
    const wrapper = setup();
    const productButton = findByTestAttr(wrapper, 'productButton');
    expect(productButton.length).toBe(1);
    productButton.simulate('click');
    expect(wrapper.state('show')).toBe(true);
  });
});
