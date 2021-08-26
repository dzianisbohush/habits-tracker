import React from 'react';
import { Form, Input, Button, InputNumber } from 'antd';

export const EditPage = () => {
  const onFinish = (values) => {
    console.log('Success:', values);

    // @todo add to db here
    //    format for date     moment().toISOString()
    // it should be something like:
    // 'user_id' : {
    //     "some date": {
    //         details: [
    //             {
    //                 ...values,
    //                 completedSteps: 0,
    //             }
    //         ]
    //     }
    // }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      {/* @todo add adding form to sepatatre componnet */}
      <div>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
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

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Add new habit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
