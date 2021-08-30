import React, { useState, useEffect, useContext } from 'react';
import { fireDB } from '../../firebase';
import { UserContext } from '../../utils/context';
import { TODAY } from '../../constants/date';
import { COMPLETED_STEPS, HABITS } from '../../constants/refsDB';
import { ProgressHeader } from './progressHeader';
import { HabitsList } from './habitList';

export const CurrentDay = () => {
  const { uid } = useContext(UserContext);
  const [habits, setHabits] = useState([]);
  const [shouldSendHabitsToDB, setShouldSendHabitsToDB] =
    useState(false);

  const todayHabitsRef = fireDB.ref(`${uid}/${HABITS}/${TODAY}`);

  useEffect(() => {
    const allHabitsRef = fireDB.ref(`${uid}/${HABITS}`);

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

            const lastDayHabitsRef = fireDB.ref(
              `${uid}/${HABITS}/${lastDate}`,
            );

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
      setShouldSendHabitsToDB(false);
      habits.forEach((habit) => {
        const habitKeys = Object.keys(habit).filter(
          (key) => key !== 'id',
        );
        const habitToSend = {};
        habitKeys.forEach((key) => {
          if (key === COMPLETED_STEPS) {
            habitToSend[key] = 0;
          } else {
            habitToSend[key] = habit[key];
          }
        });
        todayHabitsRef.push(habitToSend);
      });
    }
  }, [shouldSendHabitsToDB]);

  return (
    <div>
      <ProgressHeader habits={habits} />
      <HabitsList habits={habits} setHabits={setHabits} />
    </div>
  );
};
