import { BrowserRouter, Routes, Route } from "react-router-dom";

import { App, Calendar } from '../pages';

function routes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/calendar" element={<Calendar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default routes;
