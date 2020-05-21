import React from 'react';
import { Modal, Button } from 'antd';
import { IProduct } from '../../Models/product';

interface ProductProps {
  product?: IProduct;
  show: boolean;
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
    console.log('I am being called');
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

  render() {
    const { show } = this.state;
    const { product } = this.props;
    return (
      <div>
        <div className='modalContainer' id='modalContainer'>
          <Modal
            className='productModal'
            title={product ? 'Edit Product ' : 'New Product'}
            visible={show}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button
                key='back'
                id='cancelButton'
                className='cancelButton'
                onClick={this.handleCancel}
              >
                Cancel
              </Button>,
              <Button
                key='submit'
                id='confirmButton'
                className='confirmButton'
                type='primary'
                onClick={this.handleOk}
              >
                Submit
              </Button>,
            ]}
          ></Modal>
        </div>
      </div>
    );
  }
}

export default ProductModal;
