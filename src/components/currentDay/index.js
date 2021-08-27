import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
} from 'react';
import { Progress, Button } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import styles from './style.module.css';
import firebase from '../../firebase';
import { UserContext } from '../../utils/context';
import { KEY_DATE_FORMAT } from '../../constants/date';

export const CurrentDay = () => {
  const { uid } = useContext(UserContext);
  const [habits, setHabits] = useState([]);
  const [shouldSendHabitsToDB, setShouldSendHabitsToDB] =
    useState(false);

  // @todo add todayHabitsRef to constants (we will use this for edit page at least)
  const todayHabitsRef = firebase
    .database()
    .ref(`${uid}/habbits/${moment().format(KEY_DATE_FORMAT)}`);

  useEffect(() => {
    // @todo add allHabitsRef to constants (we will use this for dashboard page at least)
    const allHabitsRef = firebase.database().ref(`${uid}/habbits`);

    todayHabitsRef.on('value', (snapshot) => {
      const todayHabits = snapshot.val();
      const habitsList = [];

      if (todayHabits) {
        for (const id in todayHabits) {
          habitsList.push({ id, ...todayHabits[id] });
        }
        setHabits(habitsList);
      } else {
        allHabitsRef.on('value', (snapshot) => {
          const allHabits = snapshot.val();

          if (allHabits) {
            const dates = Object.keys(allHabits);
            const lastDate = dates[dates.length - 1];

            const lastDayHabitsRef = firebase
              .database()
              .ref(`${uid}/habbits/${lastDate}`);

            lastDayHabitsRef.on('value', (snapshot) => {
              const yesterdayHabits = snapshot.val();

              for (const id in yesterdayHabits) {
                habitsList.push({ id, ...yesterdayHabits[id] });
              }
              setHabits(habitsList);
              setShouldSendHabitsToDB(true);
            });
          }
        });
      }
    });
  }, []);

  useEffect(() => {
    if (shouldSendHabitsToDB) {
      habits.forEach((habit) => {
        const habitKeys = Object.keys(habit).filter(
          (key) => key !== 'id',
        );
        const habitToSend = {};
        habitKeys.forEach((key) => {
          if (key === 'completedSteps') {
            habitToSend[key] = 0;
          } else {
            habitToSend[key] = habit[key];
          }
        });
        todayHabitsRef.push(habitToSend);
      });

      setShouldSendHabitsToDB(false);
    }
  }, [shouldSendHabitsToDB]);

  const currentDayProgress = useMemo(() => {
    let allTotalStepsCount = 0;
    let allCompletedStepsCount = 0;

    habits.forEach(({ totalSteps, completedSteps }) => {
      allTotalStepsCount += totalSteps;
      allCompletedStepsCount += completedSteps;
    });

    return (100 / allTotalStepsCount) * allCompletedStepsCount;
  }, [habits]);

  const changeHabitStep = (id, value) => {
    todayHabitsRef.child(id).update({
      completedSteps: value,
    });
  };

  // @todo try union the func with increaseStep
  // @todo change to id instead of title
  const declineStep = (id, title) => () => {
    let value;
    setHabits(
      habits.map((habit) => {
        if (habit.title === title) {
          value = --habit.completedSteps;
          return { ...habit, completedSteps: value };
        }

        return habit;
      }),
      changeHabitStep(id, value),
    );
  };

  // @todo change to id instead of title
  const increaseStep = (id, title) => () => {
    let value;
    setHabits(
      habits.map((habit) => {
        if (habit.title === title) {
          value = ++habit.completedSteps;
          return { ...habit, completedSteps: value };
        }

        return habit;
      }),
      changeHabitStep(id, value),
    );
  };

  return (
    <div>
      {/* @todo move header to separate component */}
      <div>
        <p className={styles.date}>{moment().format('LL')}</p>
        <Progress
          className={styles.progressCircle}
          type="circle"
          percent={currentDayProgress}
          format={(percents) => `${Math.trunc(percents)} %`}
        />
      </div>

      {/* //@todo habits list to separate component */}
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
                onClick={declineStep(id, title)}
                icon={<MinusOutlined />}
                disabled={completedSteps === 0}
              />
              <Button
                className={styles.button}
                onClick={increaseStep(id, title)}
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
