import CityLandingPage from "./CityLandingPage";
import { CITY_DATA } from "@/lib/constants/city-data";

export default function Nuernberg() {
  return <CityLandingPage city={CITY_DATA.nuernberg} />;
}
