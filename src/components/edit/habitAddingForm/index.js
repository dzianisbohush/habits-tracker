import React, { useContext } from 'react';
import { Form, Input, Button, InputNumber } from 'antd';
import styles from './style.module.css';
import { fireDB } from '../../../firebase';
import { HABITS } from '../../../constants/refsDB';
import { TODAY } from '../../../constants/date';
import { UserContext } from '../../../utils/context';
import { showNotification } from '../../../utils/showNotification';

export const HabitAddingForm = () => {
  const { uid } = useContext(UserContext);
  const [form] = Form.useForm();
  const todayHabitsRef = fireDB.ref(`${uid}/${HABITS}/${TODAY}`);

  const onFinish = (values) => {
    showNotification('Habit was add to DB', 'success');
    todayHabitsRef.push({ ...values, completedSteps: 0 });
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    showNotification(
      'Something went wrong. More information in console',
      'error',
    );
    console.log(errorInfo);
  };

  return (
    <div>
      <Form
        className={styles.form}
        form={form}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          className={styles.formItem}
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Title of habit' }]}
        >
          <Input className={styles.input} />
        </Form.Item>

        <Form.Item
          className={styles.formItem}
          wrapperCol={{ span: 6 }}
          label="Total steps"
          name="totalSteps"
          initialValue={1}
          rules={[
            {
              required: true,
              message: 'Please input total steps per day',
            },
          ]}
        >
          <InputNumber className={styles.input} min={1} max={10} />
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
