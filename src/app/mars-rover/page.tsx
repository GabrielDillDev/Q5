import { getLatestMarsRoverPhotos } from "../../services/MarsRoverService";
import MarsRoverGallery from "../../components/MarsRoverGallery";

export default async function MarsRoverPage() {
  const { date, photos } = await getLatestMarsRoverPhotos();

  return <MarsRoverGallery initialPhotos={photos} initialDate={date} />;
}
