import React from 'react';
import { Row, Col, Table, Card, Button } from 'antd';
import ProductModal from './ProductModal';

export interface IProductState {
  show: boolean;
}
export class Product extends React.Component<{}, IProductState> {
  constructor(props: any) {
    super(props);
    this.state = {
      show: false,
    };

    this.openModal = this.openModal.bind(this);
  }

  state = { show: false };

  openModal() {
    this.setState({
      show: true,
    });
  }
  render() {
    const dataSource = [
      {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
      },
      {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
      },
    ];

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
    ];
    return (
      <div id='productTableContainer'>
        <ProductModal show={this.state.show} />

        <Row style={{ marginTop: '2%' }}>
          <Col
            xs={{ span: 12 }}
            sm={{ span: 22, offset: 1 }}
            lg={{ span: 20, offset: 2 }}
          >
            <Card title='Products' bordered={true}>
              <Table
                id='productTable'
                dataSource={dataSource}
                columns={columns}
              />

              <Button
                type='primary'
                id='productButton'
                style={{ float: 'right' }}
                onClick={this.openModal}
              >
                Add Product
              </Button>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Product;
