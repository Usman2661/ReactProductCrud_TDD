import React from 'react';
import { Row, Col, Table, Card, Button, Space } from 'antd';
import ProductModal from './ProductModal';
import { IProduct } from '../../Models/product';

export interface IProductState {
  show: boolean;
  product?: IProduct;
  edit: boolean;
}
export class Product extends React.Component<{}, IProductState> {
  constructor(props: any) {
    super(props);
    this.state = {
      show: false,
      edit: false,
    };
  }

  private addProduct = () => {
    this.setState({
      show: true,
      edit: false,
    });
  };

  private editProduct = (product: IProduct) => {
    this.setState({
      edit: true,
      product: product,
    });
  };
  private deleteProduct = (id?: any) => {
    console.log(id);
  };

  render() {
    const { show, product, edit } = this.state;
    const dataSource = [
      {
        _id: '1',
        Product: 'Test Product',
        ProductCode: 'TS4',
        ProductLocation: 'Test Town',
        ProductCost: 299.99,
        ProductOwner: 'Test',
        OwnerEmail: 'test@hotmail.com',
      },
      {
        _id: '2',
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
      {
        title: 'Actions',
        key: 'action',
        render: (text: any, product: IProduct) => (
          <Space size='middle'>
            <a href='!#' onClick={() => this.editProduct(product)}>
              Edit{' '}
            </a>
            <a href='!#' onClick={() => this.deleteProduct(product._id)}>
              Delete{' '}
            </a>
          </Space>
        ),
      },
    ];

    return (
      <div id='productTableContainer'>
        {edit ? (
          <ProductModal show={true} edit={true} product={product} />
        ) : (
          <ProductModal show={show} edit={false} />
        )}

        <Row style={{ marginTop: '2%' }}>
          <Col
            xs={{ span: 12 }}
            sm={{ span: 22, offset: 1 }}
            lg={{ span: 20, offset: 2 }}
          >
            <Card title='Products' bordered={true}>
              <Table
                id='productTable'
                className='productTable'
                dataSource={dataSource}
                columns={columns}
              />

              <Button
                type='primary'
                id='productButton'
                style={{ float: 'right' }}
                onClick={this.addProduct}
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
