import React from 'react';
import { Row, Col, Table, Card, Button, Space, Spin, Popover } from 'antd';
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
  showProductModal: boolean;
  product?: IProduct;
  editProduct: boolean;
}

export type IProductProps = IProductPropsDefault & IProductActionProps;

export class ProductBase extends React.Component<IProductProps, IProductState> {
  constructor(props: any) {
    super(props);
    this.state = {
      showProductModal: false,
      editProduct: false,
    };
  }

  componentDidMount() {
    this.props.getProducts();
  }

  private addProduct = () => {
    this.setState({
      showProductModal: true,
      editProduct: false,
    });
  };

  private editProduct = (product: IProduct) => {
    this.setState({
      editProduct: true,
      showProductModal: true,
      product: product,
    });
  };
  private deleteProduct = (product: IProduct) => {
    this.props.deleteProduct(product._id);
  };
  private closeProductModal = () => {
    this.setState({
      showProductModal: false,
    });
  };

  render() {
    const { showProductModal, product, editProduct } = this.state;
    const { products } = this.props;

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
          <div className='productAction'>
            <Space size='middle'>
              <a onClick={() => this.editProduct(product)}>Edit </a>
              <a onClick={() => this.deleteProduct(product)}>Delete </a>
            </Space>
          </div>
        ),
      },
    ];

    return (
      <div id='productTableContainer'>
        {showProductModal ? (
          <ProductModal
            edit={editProduct}
            product={product}
            onCancel={this.closeProductModal}
          />
        ) : null}

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

// Mapping the state of the store to the props of the components
const mapStateToProps = (store: IAppState) => {
  return {
    products: store.productState.products,
  };
};
//Mapping teh store actions to the props of the page
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
