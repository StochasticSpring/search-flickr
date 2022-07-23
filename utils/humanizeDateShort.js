import { parseISO, format } from "date-fns";

export function humanizeDateShort(dateISOStr) {
  try {
    const date = parseISO(dateISOStr.split("T")[0]);
    return format(date, "do MMM, yyyy");
  } catch (error) {
    console.error(error);
    console.log(`Failed to humanize date: ${dateISOStr}`);
    return "[date unknown]";
  }
}

export default humanizeDateShort;
