
import React, { Component } from 'react';

import { DateRangePicker, CustomProvider } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import enGB from 'date-fns/locale/en-GB';

import subDays from 'date-fns/subDays';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import addDays from 'date-fns/addDays';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import addMonths from 'date-fns/addMonths';

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
  dateLocale: enGB,
  last7Days: 'Останні 7 днів',
  months: ['Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер', 'Лип', 'Сер', 'Вер', 'Жов', 'Лис', 'Гру'], };

const locale = {
  common: {
    loading: 'Завантаження...',
    emptyMessage: 'Дані не знайдені'
  },
  Calendar: uk_UA,
  DateRangePicker: {
    ...uk_UA,
    months: uk_UA.months
  },
  Picker: {
    noResultsText: 'Результатів не знайдено',
    placeholder: 'Оберіть',
    searchPlaceholder: 'Пошук',
    checkAll: 'Всі'
  },

};

const { afterToday } = DateRangePicker;

class DateRange extends Component {
  
  render() {
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
          style={{ width: 330 }}
        />
        </CustomProvider>
    );
  }
}

export default DateRange;
