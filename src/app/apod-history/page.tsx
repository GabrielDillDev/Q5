import { getApodHistory } from "../../services/ApodService";
import ApodHistoryList from "../../components/ApodHistoryList";

const DAYS_PER_PAGE = 12;

function getNDaysAgoDate(n: number): string {
  const date = new Date();
  date.setDate(date.getDate() - n);
  return date.toISOString().split("T")[0];
}

export default async function ApodHistoryPage() {
  const endDate = getNDaysAgoDate(0);
  const startDate = getNDaysAgoDate(DAYS_PER_PAGE - 1);
  const data = await getApodHistory(startDate, endDate);

  return (
    <ApodHistoryList
      initialData={data}
      initialStartDate={startDate}
      initialEndDate={endDate}
    />
  );
}
