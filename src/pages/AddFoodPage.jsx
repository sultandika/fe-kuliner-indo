import React from "react";
import { useNavigate } from "react-router-dom";
import FoodForm from "../components/FoodForm";
import { createFood } from "../services/api";

// Definisikan objek kosong DI LUAR komponen
const initialFormData = {
  name: "",
  description: "",
  image: "",
  youtubeId: "",
  recipe: "",
  instructions: "",
};

const AddFoodPage = () => {
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    try {
      await createFood(formData);
      alert("Resep berhasil ditambahkan!");
      navigate("/");
    } catch (error) {
      console.error("Gagal menambahkan resep:", error);
      alert(`Gagal menambahkan resep: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center text-stone-800 mb-8">
        Tambah Resep Baru
      </h1>
      {/* Berikan initialData yang stabil */}
      <FoodForm
        onSubmit={handleCreate}
        initialData={initialFormData}
        submitButtonText="Tambah Resep"
      />
    </div>
  );
};

export default AddFoodPage;
