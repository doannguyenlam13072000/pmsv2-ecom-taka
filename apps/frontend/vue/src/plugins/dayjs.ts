// plugins/dayjs.ts
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/vi";

import { LOCALE, TIMEZONE } from "@/constants";

// Extend plugins
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);

// ✅ Set timezone to Australia/Sydney
dayjs.tz.setDefault(TIMEZONE);

dayjs.locale(LOCALE);

export default dayjs;
