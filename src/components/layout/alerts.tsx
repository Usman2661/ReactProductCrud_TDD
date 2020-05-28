import React from 'react';
import { Alert, Row, Col } from 'antd';
import { connect } from 'react-redux';
import { IAppState } from '../../Redux/store/Store';
import { Dispatch, bindActionCreators } from 'redux';
import { IAlert } from '../../Models/alert';

export interface IALertDefaultProps {
  alerts: any;
}

export interface IAlertActionProps {}

export class AlertsBase extends React.Component<IALertDefaultProps> {
  render() {
    const { alerts } = this.props;

    return (
      <div>
        <Row>
          <Col span={12} offset={6} style={{ marginTop: '2%' }}>
            {alerts.length > 0
              ? alerts.map((alert: any) => (
                  <Alert
                    message={alert.msg}
                    type={alert.type}
                    showIcon
                    className={`alertMessage${alert.type}`}
                  />
                ))
              : null}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (store: IAppState) => {
  return {
    alerts: store.alertState.alerts,
  };
};

const mapActionsToProps = (dispatch: Dispatch): IAlertActionProps => {
  return bindActionCreators({}, dispatch);
};

export const Alerts = connect(mapStateToProps, mapActionsToProps)(AlertsBase);
