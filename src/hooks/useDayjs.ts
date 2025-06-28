'use client';

import { useMemo } from 'react';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);
dayjs.locale('ko');

const useDayjs = () => {
  return useMemo(() => dayjs, []);
};

export default useDayjs;
