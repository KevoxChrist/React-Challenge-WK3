import { Routes, Route } from "react-router-dom";
import MovieSearch from "../components/mediumComponents/MovieSearch";
import MovieDetail from "../components/mediumComponents/MovieDetail";

function MediumPage() {
  return (
    <Routes>
      <Route path="/" element={<MovieSearch />} />
      <Route path="/movie/:movieId" element={<MovieDetail />} />
    </Routes>
  );
}

export default MediumPage;