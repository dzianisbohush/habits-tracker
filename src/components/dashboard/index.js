import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import {
  randomValues,
  shiftDate,
  today,
  classNames,
} from './dataUtils';
import './hitmap.css';
import ReactTooltip from 'react-tooltip';

export const Dashboard = () => {
  const getValueClass = (value) =>
    classNames({
      cell: true,
      [`color-github-${value.count}`]: value,
      'color-empty': !value,
    });

  const getTooltipDataAttr = (value) => ({
    'data-tip': `${value.date
      .toISOString()
      .slice(0, 10)} has count: ${value.count}`,
  });

  const transformDayElement = (element, value, index) => {
    const newValue = value.date.getDate();
    const a = newValue / 10 >= 1 ? 0 : 1.5;
    return (
      <g>
        {element}
        <text
          x={element.props.x + 2 + a}
          y={element.props.y + 7}
          style={{
            fontSize: '0.4em',
            fill: '#fff',
          }}
        >
          {newValue}
        </text>
      </g>
    );
  };

  return (
    <>
      <CalendarHeatmap
        startDate={shiftDate(today, -90)}
        endDate={today}
        values={randomValues}
        classForValue={getValueClass}
        tooltipDataAttrs={getTooltipDataAttr}
        showWeekdayLabels
        titleForValue={(value) => value.count}
        transformDayElement={transformDayElement}
        // showOutOfRangeDays={true}
      />
      <ReactTooltip />
    </>
  );
};
