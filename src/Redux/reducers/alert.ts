import { Reducer } from 'redux';
import { IProduct } from '../../Models/product';
import { AlertActions, AlertActionTypes } from '../actions/alert';

// Define the Product State
export interface IAlertState {
  readonly alerts: any;
}

// Define the initial state
const initialAlertState: IAlertState = {
  alerts: [],
};

export const alertReducer: Reducer<IAlertState, AlertActions> = (
  state = initialAlertState,
  action
) => {
  switch (action.type) {
    case AlertActionTypes.SET_ALERT: {
      return {
        ...state,
        alerts: action.alert,
      };
    }
    case AlertActionTypes.REMOVE_ALERT: {
      return {
        ...state,
        alerts: state.alerts.filter((alert: any) => alert._id !== action.alert),
      };
    }
    default:
      return state;
  }
};
