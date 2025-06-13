import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FoodCard from "../components/FoodCard";
import { getAllFoods, deleteFood } from "../services/api";

const FoodListPage = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const data = await getAllFoods();
        setFoods(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteFood(id);
      setFoods(foods.filter((food) => food.id !== id));
      alert("Resep berhasil dihapus.");
    } catch (err) {
      console.error("Gagal menghapus resep:", err);
      alert(`Gagal menghapus resep: ${err.message}`);
    }
  };

  if (loading) return <p className="text-center p-10">Memuat resep...</p>;
  if (error)
    return <p className="text-center p-10 text-red-500">Error: {error}</p>;

  return (
    <>
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-stone-800 text-center">
          Rekomendasi Makanan Populer
        </h2>
        <Link
          to="/tambah-resep"
          className="bg-green-800 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-900 transition-colors duration-300 shadow-md whitespace-nowrap"
        >
          + Tambah Resep
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {foods.map((food) => (
          <FoodCard key={food.id} food={food} onDelete={handleDelete} />
        ))}
      </div>
    </>
  );
};

export default FoodListPage;
