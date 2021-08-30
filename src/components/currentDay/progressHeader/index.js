import React, { useMemo } from 'react';
import { Progress } from 'antd';
import styles from './style.module.css';
import { TODAY_VIEW } from '../../../constants/date';

export const ProgressHeader = ({ habits }) => {
  const currentDayProgress = useMemo(() => {
    let allTotalStepsCount = 0;
    let allCompletedStepsCount = 0;

    habits.forEach(({ totalSteps, completedSteps }) => {
      allTotalStepsCount += totalSteps;
      allCompletedStepsCount += completedSteps;
    });

    return (100 / allTotalStepsCount) * allCompletedStepsCount;
  }, [habits]);

  return (
    <div>
      <p className={styles.date}>{TODAY_VIEW}</p>
      <Progress
        className={styles.progressCircle}
        type="circle"
        percent={currentDayProgress}
        format={(percents) => `${Math.trunc(percents)} %`}
      />
    </div>
  );
};
