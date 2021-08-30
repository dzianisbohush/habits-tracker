import React, { useContext } from 'react';
import { Form, Input, Button, InputNumber } from 'antd';
import { fireDB } from '../../../firebase';
import { HABITS } from '../../../constants/refsDB';
import { TODAY } from '../../../constants/date';
import { UserContext } from '../../../utils/context';

export const HabitAddingForm = () => {
  const { uid } = useContext(UserContext);
  const todayHabitsRef = fireDB.ref(`${uid}/${HABITS}/${TODAY}`);

  const onFinish = (values) => {
    todayHabitsRef.push({ ...values, completedSteps: 0 });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
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
  );
};
