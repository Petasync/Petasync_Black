import CityLandingPage from "./CityLandingPage";
import { CITY_DATA } from "@/lib/constants/city-data";

export default function NeustadtAisch() {
  return <CityLandingPage city={CITY_DATA["neustadt-aisch"]} />;
}
