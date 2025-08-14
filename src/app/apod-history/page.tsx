import ApodHistoryList from "../../components/ApodHistoryList";
import { getApodHistory } from "../../services/ApodService";
import { ApodData } from "../../types/ApodTypes";

const DAYS_PER_PAGE = 12;

function getNDaysAgoDate(n: number): string {
  const date = new Date();
  date.setDate(date.getDate() - n);
  return date.toISOString().split("T")[0];
}

export default async function Page() {
  const endDate = getNDaysAgoDate(0);
  const startDate = getNDaysAgoDate(DAYS_PER_PAGE - 1);

  let data: ApodData[] = []; 
  try {
    data = await getApodHistory(startDate, endDate);
  } catch (err) {
    console.error("Erro ao buscar histórico:", err);
  }

  return (
    <ApodHistoryList
      initialData={data}
      initialStartDate={startDate}
      initialEndDate={endDate}
    />
  );
}
