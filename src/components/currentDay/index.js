import React, { useState, useEffect, useContext } from 'react';
import { fireDB } from '../../firebase';
import { UserContext } from '../../utils/context';
import { TODAY } from '../../constants/date';
import { COMPLETED_STEPS, HABITS } from '../../constants/refsDB';
import { ProgressHeader } from './progressHeader';
import { HabitsList } from './habitList';

export const CurrentDay = () => {
  const initialHabitsValue = [];
  const { uid } = useContext(UserContext);
  const [allDates, setAllDates] = useState([]);
  const [currentDate, setCurrentDate] = useState(TODAY);
  const [habits, setHabits] = useState(initialHabitsValue);
  const [shouldSendHabitsToDB, setShouldSendHabitsToDB] =
    useState(false);

  const allHabitsRef = fireDB.ref(`${uid}/${HABITS}`);
  const currentHabitsRef = fireDB.ref(
    `${uid}/${HABITS}/${currentDate}`,
  );

  useEffect(() => {
    allHabitsRef.on('value', (snapshot) => {
      const habits = snapshot.val();
      if (habits) setAllDates(Object.keys(habits));
    });
  }, []);
  // TODO investigate about getting habits from prev day
  useEffect(() => {
    currentHabitsRef.on('value', (snapshot) => {
      const currentHabits = snapshot.val();
      const habitsList = [];

      if (currentHabits) {
        for (const id in currentHabits) {
          habitsList.push({ id, ...currentHabits[id] });
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
  }, [currentDate]);

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
        currentHabitsRef.push(habitToSend);
      });
    }
  }, [shouldSendHabitsToDB]);

  return (
    <div>
      <ProgressHeader
        habits={habits}
        currentDate={currentDate}
        allDates={allDates}
        setCurrentDate={setCurrentDate}
      />
      <HabitsList
        habits={habits}
        setHabits={setHabits}
        currentDate={currentDate}
      />
    </div>
  );
};
