
import React, { Component } from 'react';

import { DateRangePicker, CustomProvider } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

import subDays from 'date-fns/subDays';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import addDays from 'date-fns/addDays';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import addMonths from 'date-fns/addMonths';
import { uk } from 'date-fns/locale';

const predefinedRanges = [
  {
    label: 'Сьогодні',
    value: [new Date(), new Date()],
    placement: 'left'
  },
  {
    label: 'Вчора',
    value: [addDays(new Date(), -1), addDays(new Date(), -1)],
    placement: 'left'
  },
  {
    label: 'Поточний тиждень',
    value: [startOfWeek(new Date(), { weekStartsOn: 1 }), new Date()],
    placement: 'left'
  },
  {
    label: 'Минулий тиждень',
    value: [startOfWeek(subDays(new Date(), 7), { weekStartsOn: 1 }), endOfWeek(subDays(new Date(), 7), { weekStartsOn: 1 })],
    placement: 'left'
  },
  {
    label: 'Минулі 7 днів',
    value: [subDays(new Date(), 6), new Date()],
    placement: 'left'
  },
  {
    label: 'Поточний місяць',
    value: [startOfMonth(new Date()), new Date()],
    placement: 'left'
  },
  {
    label: 'Минулий місяць',
    value: [startOfMonth(addMonths(new Date(), -1)), endOfMonth(addMonths(new Date(), -1))],
    placement: 'left'
  },
  {
    label: 'Минулі 30 днів',
    value: [subDays(new Date(), 29), new Date()],
    placement: 'left'
  },  
  {
    label: 'Поточний рік',
    value: [new Date(new Date().getFullYear(), 0, 1), new Date()],
    placement: 'left'
  },
  {
    label: 'Весь період',
    value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date()],
    placement: 'left'
  },
  {
    label: '<<',
    closeOverlay: false,
    value: value => {
      const [start = new Date()] = value || [];
      return [
        addDays(startOfWeek(start, { weekStartsOn: 1 }), -7),
        addDays(endOfWeek(start, { weekStartsOn: 1 }), -7)
      ];
    },
    appearance: 'default'
  },
  {
    label: '>>',
    closeOverlay: false,
    value: value => {
      const [start = new Date()] = value || [];
      return [
        addDays(startOfWeek(start, { weekStartsOn: 1 }), 7),
        addDays(endOfWeek(start, { weekStartsOn: 1 }), 7)
      ];
    },
    appearance: 'default'
  }
];

const uk_UA = {
  sunday: 'Нд',
  monday: 'Пн',
  tuesday: 'Вт',
  wednesday: 'Ср',
  thursday: 'Чт',
  friday: 'Пт',
  saturday: 'Сб',
  ok: 'OK',
  today: 'Сьогодні',
  yesterday: 'Вчора',
  hours: 'Години',
  minutes: 'Хвилини',
  seconds: 'Секунди',
  formattedMonthPattern: 'MMM yyyy',
  formattedDayPattern: 'dd MMM yyyy',
  dateLocale: uk
};

const locale = {
  common: {
    loading: 'Завантаження...',
    emptyMessage: 'Дані не знайдені'
  },
  Calendar: uk_UA,
  DateRangePicker: {
    ...uk_UA,
  },
  Picker: {
    noResultsText: 'Результатів не знайдено',
    placeholder: 'Оберіть',
    searchPlaceholder: 'Пошук',
    checkAll: 'Всі'
  },
};

const { afterToday } = DateRangePicker;


/**
 * DateRange component that renders a date range picker with predefined ranges and locale settings.
 *
 * @component
 * @param {Object} props - The props object
 * @returns {JSX.Element} The rendered date range picker component.
 * @param {function} [props.onChange] - Callback fired when value changed. (value: [Date, Date]) => void
 * @param {function} [props.onOk] - Callback fired when clicked OK button. (value: [Date, Date]) => void
 *
 * @example
 * // Example usage:
 * import DateRange from './components/DateRange';
 *
 * function App() {
 *   return (
 *     <div>
 *       <DateRange onChange={handleDateChange}/>
 *     </div>
 *   );
 * }
 * https://rsuitejs.com/components/date-range-picker/
 */

class DateRange extends Component {
  
  render() {

    const { onChange, onOk } = this.props;

    return (
      <CustomProvider locale={locale}>
        <DateRangePicker
          size="lg"
          format="dd.MM.yyyy"
          label="Період: "
          preventOverflow='true' 
          weekStart='1'
          shouldDisableDate={afterToday()}
          ranges={predefinedRanges}
          defaultValue={[new Date(), new Date()]} // set today as default value
          //style={{ width: 330 }}
          onChange={onChange} 
          onOk={onOk} 
        />
      </CustomProvider>
    );
  }
}

export default DateRange;
