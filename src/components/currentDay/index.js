import React, { useState, useEffect, useMemo } from 'react';
import { Progress, Button } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';

export const CurrentDay = () => {
  // @todo add getting init value from firebase db
  const [habits, setHabits] = useState([
    {
      title: 'habit 1',
      completedSteps: 0,
      totalSteps: 1,
    },
    {
      title: 'habit 2',
      completedSteps: 1,
      totalSteps: 1,
    },
    {
      title: 'habit 3',
      completedSteps: 2,
      totalSteps: 3,
    },
    {
      title: 'habit 4',
      completedSteps: 0,
      totalSteps: 2,
    },
    {
      title: 'habit 5',
      completedSteps: 2,
      totalSteps: 4,
    },
  ]);

  useEffect(() => {
    // @todo add getting init habits from db
  }, []);

  const currentDayProgress = useMemo(() => {
    let allTotalStepsCount = 0;
    let allCompletedStepsCount = 0;

    habits.forEach(({ totalSteps, completedSteps }) => {
      allTotalStepsCount += totalSteps;
      allCompletedStepsCount += completedSteps;
    });

    return (100 / allTotalStepsCount) * allCompletedStepsCount;
  }, [habits]);

  // @todo change to id instead of title
  const declineStep = (title) => () => {
    setHabits(
      habits.map((habit) => {
        if (habit.title === title) {
          return {
            ...habit,
            completedSteps: habit.completedSteps - 1,
          };
        }

        return habit;
      }),
    );

    // @todo try union the func with increaseStep
    // @todo add changes to db
    // date format moment().toISOString()
    // example
    // const todoRef = firebase.database().ref('Todo').child(todo.id);
    //         todoRef.update({
    //             complete: !todo.complete,
    //         })
  };

  // @todo change to id instead of title
  const increaseStep = (title) => () => {
    setHabits(
      habits.map((habit) => {
        if (habit.title === title) {
          return {
            ...habit,
            completedSteps: habit.completedSteps + 1,
          };
        }

        return habit;
      }),
    );

    // @todo add changes to db
    // example
    // const todoRef = firebase.database().ref('Todo').child(todo.id);
    //         todoRef.update({
    //             complete: !todo.complete,
    //         })
  };

  return (
    <div>
      {/* @todo move header to separate component */}
      {/* @todo add real date */}
      <div>
        {moment('2021-08-26T08:54:05.130Z').format('LL')}
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
  );
};
