import CityLandingPage from "./CityLandingPage";
import { CITY_DATA } from "@/lib/constants/city-data";

export default function Erlangen() {
  return <CityLandingPage city={CITY_DATA.erlangen} />;
}
