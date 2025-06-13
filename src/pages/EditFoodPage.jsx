// src/pages/EditFoodPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FoodForm from "../components/FoodForm";
import { getFoodById, updateFood } from "../services/api";

const EditFoodPage = () => {
  const { foodId } = useParams();
  const navigate = useNavigate();

  // State untuk menyimpan data awal dari API
  const [foodData, setFoodData] = useState(null);

  useEffect(() => {
    // Fungsi ini akan dipanggil hanya sekali saat komponen pertama kali dimuat
    const fetchFood = async () => {
      try {
        const data = await getFoodById(foodId);
        setFoodData(data); // Simpan data ke state
      } catch (error) {
        console.error("Gagal mengambil data resep:", error);
        alert("Gagal mengambil data resep.");
        navigate("/");
      }
    };

    fetchFood();
  }, [foodId, navigate]); // Dependency array yang aman

  const handleUpdate = async (formData) => {
    try {
      await updateFood(foodId, formData);
      alert("Resep berhasil diperbarui!");
      navigate(`/resep/${foodId}`);
    } catch (error) {
      console.error("Gagal memperbarui resep:", error);
      alert(`Gagal memperbarui resep: ${error.message}`);
    }
  };

  // Tampilkan pesan loading sampai data dari API siap
  if (!foodData) {
    return <div className="text-center p-10">Memuat data resep...</div>;
  }

  // Setelah foodData siap, baru render FoodForm dengan initialData
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center text-stone-800 mb-8">
        Edit Resep
      </h1>
      <FoodForm
        onSubmit={handleUpdate}
        initialData={foodData} // Berikan state foodData sebagai initialData
        submitButtonText="Simpan Perubahan"
      />
    </div>
  );
};

export default EditFoodPage;
