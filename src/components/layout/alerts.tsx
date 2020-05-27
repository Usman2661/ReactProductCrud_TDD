import React from 'react';
import { Alert, Row, Col } from 'antd';

export interface IAlertProps {
  message?: string;
  type?: string;
}
export default function Alerts(IAlertProps) {
  return (
    <div>
      <Row>
        <Col span={12} offset={6} style={{ marginTop: '2%' }}>
          <Alert message={IAlertProps.message} type='success' showIcon />
          {/* <Alert message='Informational Notes' type='info' showIcon />
          <Alert message='Warning' type='warning' showIcon closable />
          <Alert message='Error' type='error' showIcon /> */}
        </Col>
      </Row>
    </div>
  );
}
