import React from 'react';
import './App.css';
import { Alerts } from './components/layout/alerts';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { IAppState } from './Redux/store/Store';
import configureStore from './Redux/store/Store';
import { Product } from './components/Product/Product';

class App extends React.Component {
  private store: Store<IAppState>;

  constructor(props: any) {
    super(props);

    this.store = configureStore();
  }

  render() {
    return (
      <Provider store={this.store}>
        <div className='App'>
          <Alerts />
          <Product />
        </div>
      </Provider>
    );
  }
}

export default App;
