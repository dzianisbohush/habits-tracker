import React, { useState, useEffect, useMemo, useContext } from 'react'
import { Progress, Button } from 'antd'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import moment from 'moment'
import firebase from '../../firebase'
import { UserContext } from '../../utils/context'
import { KEY_DATE_FORMAT } from '../../constants/date'

export const CurrentDay = () => {
  //@todo add getting init value from firebase db
  const { uid } = useContext(UserContext)
  const [habits, setHabits] = useState([])

  useEffect(() => {
    const todayHabitsRef = firebase
      .database()
      .ref(`${uid}/habbits/${moment().format(KEY_DATE_FORMAT)}`)

    const allHabitsRef = firebase.database().ref(`${uid}/habbits`)

    todayHabitsRef.on('value', (snapshot) => {
      const todayHabits = snapshot.val()
      const habitsList = []

      if (todayHabits) {
        for (let id in todayHabits) {
          habitsList.push({ id, ...todayHabits[id] })
        }

        setHabits(habitsList)
      } else {
        allHabitsRef.on('value', (snapshot) => {
          const allHabits = snapshot.val()
          const dates = Object.keys(allHabits)
          const lastDate = dates[dates.length - 1]

          const yesterdayHabitsRef = firebase
            .database()
            .ref(`${uid}/habbits/${lastDate}`)

          yesterdayHabitsRef.on('value', (snapshot) => {
            const yesterdayHabits = snapshot.val()

            for (let id in yesterdayHabits) {
              habitsList.push({ id, ...yesterdayHabits[id] })
            }
            setHabits(habitsList)
          })
        })

        habitsList.forEach(habit => {
          const habitKeys = Object.keys(habit).filter(key => key !== 'id')
          const habitToSend = {}
          habitKeys.forEach(key => {
            if (key === 'completedSteps') {
              habitToSend[key] = 0
            } else {
              habitToSend[key] = habit[key]
            }
          })
          todayHabitsRef.push(habitToSend)
        })
      }
    })
  }, [])

  const currentDayProgress = useMemo(() => {
    let allTotalStepsCount = 0
    let allCompletedStepsCount = 0

    habits.forEach(({ totalSteps, completedSteps }) => {
      allTotalStepsCount += totalSteps
      allCompletedStepsCount += completedSteps
    })

    return (100 / allTotalStepsCount) * allCompletedStepsCount
  }, [habits])

  // @todo change to id instead of title
  const declineStep = (id, title) => () => {
    setHabits(
      habits.map((habit) => {
        if (habit.title === title) {
          return { ...habit, completedSteps: --habit.completedSteps }
        }

        return habit
      }),
    )

    //@todo try union the func with increaseStep
    //@todo add changes to db
    // date format moment().toISOString()
    // example
    // const todoRef = firebase.database().ref('Todo').child(todo.id);
    //         todoRef.update({
    //             complete: !todo.complete,
    //         })
  }

  // @todo change to id instead of title
  const increaseStep = (id, title) => () => {
    setHabits(
      habits.map((habit) => {
        if (habit.title === title) {
          return { ...habit, completedSteps: ++habit.completedSteps }
        }

        return habit
      }),
    )

    //@todo add changes to db
    // example
    // const todoRef = firebase.database().ref('Todo').child(todo.id);
    //         todoRef.update({
    //             complete: !todo.complete,
    //         })
  }

  return (
    <div>
      {/* @todo move header to separate component */}
      {/* @todo add real date */}
      <div>
        {moment().format('LL')}
        <Progress
          type="circle"
          percent={currentDayProgress}
          format={(percents) => `${Math.trunc(percents)} %`}
        />
      </div>

      {/* //@todo habits list to separate component */}
      <div>
        {habits.map(({ title, completedSteps, totalSteps }) => (
          <div
            key={title}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>{title}</span>
            <Progress
              percent={(100 / totalSteps) * completedSteps}
              showInfo={false}
              size="small"
            />
            <Button.Group>
              <Button
                onClick={declineStep(title)}
                icon={<MinusOutlined />}
                disabled={completedSteps === 0}
              />
              <Button
                onClick={increaseStep(title)}
                icon={<PlusOutlined />}
                disabled={completedSteps === totalSteps}
              />
            </Button.Group>
          </div>
        ))}
      </div>
    </div>
  )
}
