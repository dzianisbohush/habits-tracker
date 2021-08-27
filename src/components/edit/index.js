import React, { useContext } from 'react';
import moment from 'moment';
import { Form, Input, Button, InputNumber } from 'antd';
import firebase from '../../firebase';
import { UserContext } from '../../utils/context';
import { KEY_DATE_FORMAT } from '../../constants/date';

export const EditPage = () => {
  const { uid } = useContext(UserContext);

  const todayHabbitsRef = firebase
    .database()
    .ref(`${uid}/habbits/${moment().format(KEY_DATE_FORMAT)}`);

  const onFinish = (values) => {
    todayHabbitsRef.push({ ...values, completedSteps: 0 });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      {/* @todo add adding form to sepatatre componnet */}
      <div>
        <Form
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 3 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Title of habit' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Total steps"
            name="totalSteps"
            rules={[
              {
                required: true,
                message: 'Please input total steps per day',
              },
            ]}
          >
            <InputNumber min={1} max={10} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 3, span: 3 }}>
            <Button type="primary" htmlType="submit">
              Add new habit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
