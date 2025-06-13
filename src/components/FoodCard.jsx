// src/components/FoodCard.jsx
import React from "react";
import { Link } from "react-router-dom";

// Tambahkan prop onEdit dan onDelete
const FoodCard = ({ food, onDelete }) => {
  const handleDelete = () => {
    if (
      window.confirm(`Apakah Anda yakin ingin menghapus resep "${food.name}"?`)
    ) {
      onDelete(food.id);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out flex flex-col">
      <img
        src={food.image}
        alt={food.name}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://placehold.co/600x400/CCCCCC/000000?text=Gambar+Rusak`;
        }}
      />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-stone-800">{food.name}</h3>
        <p className="text-stone-600 mt-2 text-sm flex-grow">
          {food.description}
        </p>
        <div className="mt-4 space-y-2">
          <Link
            to={`/resep/${food.id}`}
            className="block w-full text-center bg-green-800 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-900 transition-colors duration-300 shadow-md"
          >
            Coba Masak
          </Link>
          <div className="flex space-x-2">
            <Link
              to={`/edit-resep/${food.id}`}
              className="block w-full text-center bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-sm text-sm"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="block w-full bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-300 shadow-sm text-sm"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
