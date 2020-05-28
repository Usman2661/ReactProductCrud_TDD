import React from 'react';
import { Modal, Button, Input, Form, InputNumber } from 'antd';
import { IProduct } from '../../Models/product';
import { IAppState } from '../../Redux/store/Store';
import { bindActionCreators, Dispatch } from 'redux';
import { createProduct, updateProduct } from '../../Redux/actions/products';
import { connect } from 'react-redux';

interface IProductModalDefaultProps {
  product?: IProduct;
  edit?: boolean;
  onCancel: () => void;
  // onOk: (product: IProduct) => void;
}

interface IProductModalActionProps {
  createProduct: typeof createProduct;
  updateProduct: typeof updateProduct;
}

type IProductModalProps = IProductModalDefaultProps & IProductModalActionProps;

export class ProductModalBase extends React.Component<IProductModalProps> {
  private saveProduct = (values: any) => {
    const { onCancel } = this.props;
    if (values.Product) {
      values['_id'] = this.props.product?._id;
      if (this.props.edit) {
        this.props.updateProduct(values);
        onCancel();
      } else {
        this.props.createProduct(values);
        onCancel();
      }
    }
  };
  private saveProductFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  render() {
    const { edit, product, onCancel } = this.props;

    return (
      <div>
        <div className='modalContainer' id='modalContainer'>
          <Modal
            className='productModal'
            title={edit ? 'Edit Product ' : 'New Product'}
            visible={true}
            onOk={this.saveProduct}
            onCancel={onCancel}
          >
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
                id='ProductCode'
                className='ProductCode'
                initialValue={edit ? product?.ProductCode : undefined}
                rules={[
                  { required: true, message: 'Please add the product code!' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='Product Location'
                name='ProductLocation'
                id='ProductLocation'
                className='ProductLocation'
                initialValue={edit ? product?.ProductLocation : undefined}
                rules={[{ required: false }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='Product Cost'
                name='ProductCost'
                id='ProductCost'
                className='ProductCost'
                initialValue={edit ? product?.ProductCost : undefined}
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
                id='ProductOwner'
                className='ProductOwner'
                initialValue={edit ? product?.ProductOwner : undefined}
                rules={[{ required: false }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='Owner Email'
                name='OwnerEmail'
                id='OwnerEmail'
                className='OwnerEmail'
                initialValue={edit ? product?.OwnerEmail : undefined}
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
