import React, { useContext, useState } from 'react'
import firebase from '../../firebase'
import moment from 'moment'
import { Form, Input, Button, InputNumber } from 'antd'
import { UserContext } from '../../utils/context'
import { KEY_DATE_FORMAT } from '../../constants/date'

export const EditPage = () => {
  const { uid } = useContext(UserContext)
  const [habbits, setHabbits] = useState({})

  const todayHabbitsRef = firebase
    .database()
    .ref(`${uid}/habbits/${moment().format(KEY_DATE_FORMAT)}`)

  const onFinish = (values) => {
    todayHabbitsRef.push({ ...values, completedSteps: 0 })
  }

  const todoRefff = firebase
    .database()
    .ref(`${uid}/habbits`)

  const test = () => {
    todoRefff.on('value', (snapshot) => {
      const todos = snapshot.val()
      const todoList = []
      for (let id in todos) {
        todoList.push({ id, ...todos[id] })
      }
      setHabbits(todoList)
    })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

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
