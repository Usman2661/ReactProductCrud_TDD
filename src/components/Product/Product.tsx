import React from 'react';
import { Row, Col, Table, Card, Button } from 'antd';
import ProductModal from './ProductModal';
import { IProduct } from '../../Models/product';

export interface IProductState {
  show: boolean;
  product?: IProduct;
}
export class Product extends React.Component<{}, IProductState> {
  constructor(props: any) {
    super(props);
    this.state = {
      show: false,
    };
  }

  private openModal = () => {
    this.setState({
      show: true,
    });
  };
  render() {
    const { show } = this.state;
    const dataSource = [
      {
        key: 1,
        Product: 'Test Product',
        ProductCode: 'TS4',
        ProductLocation: 'Test Town',
        ProductCost: 299.99,
        ProductOwner: 'Test',
        OwnerEmail: 'test@hotmail.com',
      },
      {
        key: 2,
        Product: 'Playsation 4',
        ProductCode: 'PS$',
        ProductLocation: 'Play Town',
        ProductCost: 299.99,
        ProductOwner: 'Playslattion',
        OwnerEmail: 'conatct@psn.com',
      },
    ];

    const columns = [
      {
        title: 'Product Name',
        dataIndex: 'Product',
        key: 'Product',
      },
      {
        title: 'Product Code',
        dataIndex: 'ProductCode',
        key: 'ProductCode',
      },
      {
        title: 'Product Location',
        dataIndex: 'ProductLocation',
        key: 'ProductLocation',
      },
      {
        title: 'Product Price',
        dataIndex: 'ProductCost',
        key: 'ProductCost',
      },
      {
        title: 'Product Owner',
        dataIndex: 'ProductOwner',
        key: 'ProductOwner',
      },
      {
        title: 'Owner Email',
        dataIndex: 'OwnerEmail',
        key: 'OwnerEmail',
      },
    ];

    return (
      <div id='productTableContainer'>
        <ProductModal show={show} product={this.state.product} />
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
