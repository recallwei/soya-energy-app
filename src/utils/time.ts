import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

import type { CommonTimeFormatter, LocalTimeFormatter } from '@/types'

dayjs.extend(localizedFormat)

export class TimeUtils {
  static formatTime(
    time?: Date | string | number,
    formatter: CommonTimeFormatter | LocalTimeFormatter = 'L',
    placeholder = ''
  ) {
    if (!time) {
      return placeholder
    }
    return dayjs(time).format(formatter)
  }
}
