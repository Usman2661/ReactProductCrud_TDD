import React from 'react';
import { Modal, Button, Input, Form, InputNumber } from 'antd';
import { IProduct } from '../../Models/product';

interface ProductProps {
  product?: IProduct;
  show: boolean;
  edit?: boolean;
}

interface ProductState {
  show: boolean;
}

export class ProductModal extends React.Component<ProductProps, ProductState> {
  constructor(props: any) {
    super(props);
    this.state = {
      show: false,
    };
  }

  componentWillReceiveProps(productProps: ProductProps) {
    console.log(productProps.product);
    console.log(productProps.edit);
    console.log(productProps.show);

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
    console.log('Success:', values);
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
              initialValues={{ Product: product?.Product }}
              onFinish={this.saveProduct}
              onFinishFailed={this.saveProductFailed}
            >
              <Form.Item
                label='Product Name'
                name='Product'
                id='Product'
                className='Product'
                valuePropName='Product'
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

export default ProductModal;
