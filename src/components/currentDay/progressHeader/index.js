import React, { useEffect, useMemo, useState } from 'react';
import { Progress, Button } from 'antd';
import moment from 'moment';
import styles from './style.module.css';

export const ProgressHeader = ({
  habits,
  currentDate,
  allDates,
  setCurrentDate,
}) => {
  // TODO maybe this state will be better move to parent
  const [idxCurrentDateInAll, setIdxCurrentDateInAll] = useState(0);

  useEffect(() => {
    setIdxCurrentDateInAll(
      allDates.findIndex((date) => date === currentDate),
    );
  }, [allDates, currentDate]);

  const currentDayProgress = useMemo(() => {
    let allTotalStepsCount = 0;
    let allCompletedStepsCount = 0;

    habits.forEach(({ totalSteps, completedSteps }) => {
      allTotalStepsCount += totalSteps;
      allCompletedStepsCount += completedSteps;
    });

    return (100 / allTotalStepsCount) * allCompletedStepsCount;
  }, [habits]);
  // TODO unit clickPrev and clickNext to one common function
  const clickPrev = () => {
    setCurrentDate(allDates[idxCurrentDateInAll - 1]);
  };

  const clickNext = () => {
    setCurrentDate(allDates[idxCurrentDateInAll + 1]);
  };
  // TODO change styles for buttons
  // TODO disabled buttons instead of don't rendering like this
  return (
    <div className={styles.mainWrapper}>
      <p className={styles.date}>
        {moment(currentDate).format('LL')}
      </p>
      <div className={styles.progressWrapper}>
        {idxCurrentDateInAll !== 0 && (
          <Button onClick={clickPrev}>Prev</Button>
        )}
        <Progress
          className={styles.progressCircle}
          type="circle"
          percent={currentDayProgress}
          format={(percents) => `${Math.trunc(percents)} %`}
        />
        {allDates.length - 1 > idxCurrentDateInAll && (
          <Button onClick={clickNext}>Next</Button>
        )}
      </div>
    </div>
  );
};
