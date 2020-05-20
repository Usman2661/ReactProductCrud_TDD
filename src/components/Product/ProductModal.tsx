import React from 'react';
import { Modal } from 'antd';

interface productProps {
  product?: {};
  show: boolean;
}

export class ProductModal extends React.Component<productProps> {
  render() {
    console.log(this.props.show);
    return (
      <div>
        <Modal
          title='Basic Modal'
          visible={this.props.show}
          // onOk={this.handleOk}
          // onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}

export default ProductModal;
