import React, { useContext } from 'react';
import { Progress, Button } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './style.module.css';
import { fireDB } from '../../../firebase';
import { MINUS, PLUS } from '../../../constants/values';
import { COMPLETED_STEPS, HABITS } from '../../../constants/refsDB';
import { TODAY } from '../../../constants/date';
import { UserContext } from '../../../utils/context';
import { showNotification } from '../../../utils/showNotification';

export const HabitsList = ({ habits, setHabits, currentDate }) => {
  const { uid } = useContext(UserContext);
  const todayHabitsRef = fireDB.ref(
    `${uid}/${HABITS}/${currentDate}`,
  );

  const changeHabitStepDB = (id, value) => {
    todayHabitsRef.child(id).update({
      [COMPLETED_STEPS]: value,
    });
    showNotification('Changes have been send to DB', 'success');
  };

  const changeHabitStep = (id) => (event) => {
    const buttonValue = event.currentTarget.value;
    let value;
    setHabits(
      habits.map((habit) => {
        if (habit.id === id) {
          value =
            buttonValue === PLUS
              ? ++habit[COMPLETED_STEPS]
              : --habit[COMPLETED_STEPS];
          return { ...habit, [COMPLETED_STEPS]: value };
        }

        return habit;
      }),
      changeHabitStepDB(id, value),
    );
  };

  return (
    <div>
      {habits.map(({ id, title, completedSteps, totalSteps }) => (
        <div key={id} className={styles.habitWrapper}>
          <div className={styles.habitProgressCircleWrapper}>
            <Progress
              className={styles.habitProgressCircle}
              percent={(100 / totalSteps) * completedSteps}
              showInfo={false}
              size="small"
              type="circle"
              strokeWidth={15}
              width={20}
            />
            <p className={styles.habitName}>{title}</p>
          </div>
          <Button.Group className={styles.buttonGroup}>
            <Button
              className={styles.button}
              onClick={changeHabitStep(id)}
              icon={<MinusOutlined />}
              disabled={completedSteps === 0}
              value={MINUS}
            />
            <Button
              className={styles.button}
              onClick={changeHabitStep(id)}
              icon={<PlusOutlined />}
              disabled={completedSteps === totalSteps}
              value={PLUS}
            />
          </Button.Group>
        </div>
      ))}
    </div>
  );
};
