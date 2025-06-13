import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./components/MainLayout";
import FoodListPage from "./pages/FoodListPage";
import RecipePage from "./pages/RecipePage";
import AddFoodPage from "./pages/AddFoodPage";
import EditFoodPage from "./pages/EditFoodPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<FoodListPage />} />
          <Route path="resep/:foodId" element={<RecipePage />} />
          <Route path="tambah-resep" element={<AddFoodPage />} />
          <Route path="edit-resep/:foodId" element={<EditFoodPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
