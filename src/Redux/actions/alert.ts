// Import redux types
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

// Import Character Typing
import { v4 as uuid } from 'uuid';
import { IAlertState } from '../reducers/alert';

// Create Action Constants
export enum AlertActionTypes {
  SET_ALERT = 'SET_ALERT',
  REMOVE_ALERT = 'REMOVE_ALERT',
}

// Interface for Get All Action Type
export interface SetAlertAction {
  type: AlertActionTypes.SET_ALERT;
  alert: any;
}

export interface RemoveAlertAction {
  type: AlertActionTypes.REMOVE_ALERT;
  alert: any;
}

/* 
Combine the action types with a union (we assume there are more)
example: export type CharacterActions = IGetAllAction | IGetOneAction ... 
*/
export type AlertActions = SetAlertAction | RemoveAlertAction;

/* Get All Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const setAlert: ActionCreator<ThunkAction<
  Promise<any>,
  IAlertState,
  null,
  SetAlertAction
>> = (msg, alertType, timeout = 5000) => {
  return async (dispatch: Dispatch) => {
    try {
      const id = uuid();
      dispatch({
        alert: { msg, alertType, id },
        type: AlertActionTypes.SET_ALERT,
      });

      setTimeout(
        () => dispatch({ type: AlertActionTypes.REMOVE_ALERT, alert: id }),
        timeout
      );
    } catch (err) {
      console.error(err);
    }
  };
};
