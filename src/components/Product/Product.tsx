import React from 'react';
import { Row, Col, Table, Card, Button, Space, Spin } from 'antd';
import { ProductModal } from './ProductModal';
import { IProduct } from '../../Models/product';
import { connect } from 'react-redux';
import { IAppState } from '../../Redux/store/Store';
import { Dispatch, bindActionCreators } from 'redux';
import { getAllProducts, deleteProduct } from '../../Redux/actions/products';

export interface IProductPropsDefault {
  products: IProduct[];
}

export interface IProductActionProps {
  getProducts: typeof getAllProducts;
  deleteProduct: typeof deleteProduct;
}

export interface IProductState {
  show: boolean;
  product?: IProduct;
  edit: boolean;
}

export type IProductProps = IProductPropsDefault & IProductActionProps;

export class ProductBase extends React.Component<IProductProps, IProductState> {
  constructor(props: any) {
    super(props);
    this.state = {
      show: false,
      edit: false,
    };
  }

  componentDidMount() {
    this.props.getProducts();
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
  private deleteProduct = (product: IProduct) => {
    this.props.deleteProduct(product._id);
    console.log('Deleted ', product.Product);
  };

  render() {
    const { show, product, edit } = this.state;
    const { products } = this.props;

    // const dataSource = [
    //   {
    //     _id: '1',
    //     key: 1,
    //     Product: 'Test Product',
    //     ProductCode: 'TS4',
    //     ProductLocation: 'Test Town',
    //     ProductCost: 299.99,
    //     ProductOwner: 'Test',
    //     OwnerEmail: 'test@hotmail.com',
    //   },
    //   {
    //     key: 2,
    //     _id: '2',
    //     Product: 'Playsation 4',
    //     ProductCode: 'PS$',
    //     ProductLocation: 'Play Town',
    //     ProductCost: 299.99,
    //     ProductOwner: 'Playslattion',
    //     OwnerEmail: 'conatct@psn.com',
    //   },
    // ];

    const columns = [
      {
        title: 'Product Name',
        dataIndex: 'Product',
        key: '_id',
      },
      {
        title: 'Product Code',
        dataIndex: 'ProductCode',
        key: '_id',
      },
      {
        title: 'Product Location',
        dataIndex: 'ProductLocation',
        key: '_id',
      },
      {
        title: 'Product Price',
        dataIndex: 'ProductCost',
        key: '_id',
      },
      {
        title: 'Product Owner',
        dataIndex: 'ProductOwner',
        key: '_id',
      },
      {
        title: 'Owner Email',
        dataIndex: 'OwnerEmail',
        key: '_id',
      },
      {
        title: 'Actions',
        key: 'action',
        render: (text: any, product: IProduct) => (
          <Space size='middle'>
            <a onClick={() => this.editProduct(product)}>Edit </a>
            <a onClick={() => this.deleteProduct(product)}>Delete </a>
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
              {products.length > 0 ? (
                <Table
                  id='productTable'
                  className='productTable'
                  dataSource={products}
                  columns={columns}
                />
              ) : (
                <Spin tip='Loading...' />
              )}

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

// Grab the characters from the store and make them available on props
const mapStateToProps = (store: IAppState) => {
  return {
    products: store.productState.products,
  };
};

const mapActionsToProps = (dispatch: Dispatch): IProductActionProps => {
  return bindActionCreators(
    {
      getProducts: getAllProducts,
      deleteProduct: deleteProduct,
    },
    dispatch
  );
};

export const Product = connect(mapStateToProps, mapActionsToProps)(ProductBase);
