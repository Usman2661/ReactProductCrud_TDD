import React from 'react';
import { Modal, Button, Input, Form, InputNumber } from 'antd';
import { IProduct } from '../../Models/product';
import { IAppState } from '../../Redux/store/Store';
import { bindActionCreators, Dispatch } from 'redux';
import { createProduct, updateProduct } from '../../Redux/actions/products';
import { connect } from 'react-redux';

interface IProductModalDefaultProps {
  product?: IProduct;
  show: boolean;
  edit?: boolean;
}

interface IProductModalActionProps {
  createProduct: typeof createProduct;
  updateProduct: typeof updateProduct;
}

type IProductModalProps = IProductModalDefaultProps & IProductModalActionProps;
interface IProductState {
  show: boolean;
}

export class ProductModalBase extends React.Component<
  IProductModalProps,
  IProductState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      show: false,
    };
  }

  componentWillReceiveProps(productProps: IProductModalDefaultProps) {
    if (productProps.show) {
      this.setState({
        show: productProps.show,
      });
    }
  }

  private handleOk = () => {
    this.setState({
      show: false,
    });
  };
  private handleCancel = () => {
    this.setState({
      show: false,
    });
  };

  private saveProduct = (values: any) => {
    if (values.Product) {
      // values._id = this.props.product?._id;
      values['_id'] = this.props.product?._id;
      if (this.props.edit) {
        this.props.updateProduct(values);
      } else {
        this.props.createProduct(values);
      }
    }
  };
  private saveProductFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  render() {
    const { show } = this.state;
    const { edit, product } = this.props;

    return (
      <div>
        <div className='modalContainer' id='modalContainer'>
          <Modal
            className='productModal'
            title={edit ? 'Edit Product ' : 'New Product'}
            visible={show}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <h1> {product?.Product}</h1>
            <Form
              id='productForm'
              className='productForm'
              name='basic'
              onFinish={this.saveProduct}
              onFinishFailed={this.saveProductFailed}
            >
              <Form.Item
                label='Product Name'
                name='Product'
                id='Product'
                className='Product'
                initialValue={edit ? product?.Product : undefined}
                rules={[
                  { required: true, message: 'Please add the product name!' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='Product Code'
                name='ProductCode'
                initialValue={product?.ProductCode}
                rules={[
                  { required: true, message: 'Please add the product code!' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='Product Location'
                name='ProductLocation'
                initialValue={product?.ProductLocation}
                rules={[{ required: false }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='Product Cost'
                name='ProductCost'
                initialValue={product?.ProductCost}
                rules={[
                  {
                    type: 'number',
                    required: true,
                    message: 'Please add the product cost',
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item
                label='Product Owner'
                name='ProductOwner'
                initialValue={product ? product.ProductOwner : undefined}
                rules={[{ required: false }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='Owner Email'
                name='OwnerEmail'
                initialValue={product ? product.OwnerEmail : undefined}
                rules={[
                  {
                    type: 'email',
                    required: true,
                    message: 'Please enter a valid email!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button
                  type='primary'
                  className='saveProduct'
                  id='saveProduct'
                  htmlType='submit'
                  onClick={this.saveProduct}
                >
                  Save
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    );
  }
}

// Grab the characters from the store and make them available on props
const mapStateToProps = (store: IAppState) => {
  return {
    products: store.productState.products,
  };
};

const mapActionsToProps = (dispatch: Dispatch): IProductModalActionProps => {
  return bindActionCreators(
    {
      createProduct: createProduct,
      updateProduct: updateProduct,
    },
    dispatch
  );
};

export const ProductModal = connect(
  mapStateToProps,
  mapActionsToProps
)(ProductModalBase);
