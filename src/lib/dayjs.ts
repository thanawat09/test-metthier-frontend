import dayjs from 'dayjs';
import 'dayjs/locale/th';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';

dayjs.extend(buddhistEra);
dayjs.extend(utc);
dayjs.extend(duration);
dayjs.extend(relativeTime);

dayjs.locale('th');

export default dayjs;
