// src/components/FoodForm.jsx
import React, { useState, useEffect } from "react";

const FoodForm = ({ onSubmit, initialData, submitButtonText = "Submit" }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    youtubeId: "",
    recipe: "",
    instructions: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        image: initialData.image || "",
        youtubeId: initialData.youtubeId || "",
        recipe: Array.isArray(initialData.recipe)
          ? initialData.recipe.join("\n")
          : "",
        instructions: Array.isArray(initialData.instructions)
          ? initialData.instructions.join("\n")
          : "",
      });
    }
  }, [initialData]);

  // FUNGSI KUNCI: Pastikan fungsi ini ada dan sudah benar
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const processedData = {
      ...formData,
      recipe: formData.recipe.split("\n").filter((line) => line.trim() !== ""),
      instructions: formData.instructions
        .split("\n")
        .filter((line) => line.trim() !== ""),
    };
    onSubmit(processedData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg"
    >
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Nama Makanan
        </label>
        <input
          type="text"
          name="name" // <-- Atribut 'name' harus ada
          id="name"
          value={formData.name} // <-- Nilai dari state
          onChange={handleChange} // <-- Handler untuk update state
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Deskripsi
        </label>
        <textarea
          name="description" // <-- Atribut 'name' harus ada
          id="description"
          value={formData.description} // <-- Nilai dari state
          onChange={handleChange} // <-- Handler untuk update state
          required
          rows="3"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        ></textarea>
      </div>
      <div>
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-700"
        >
          URL Gambar
        </label>
        <input
          type="text"
          name="image"
          id="image"
          value={formData.image}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
      </div>
      <div>
        <label
          htmlFor="youtubeId"
          className="block text-sm font-medium text-gray-700"
        >
          YouTube Video ID
        </label>
        <input
          type="text"
          name="youtubeId"
          id="youtubeId"
          value={formData.youtubeId}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
      </div>
      <div>
        <label
          htmlFor="recipe"
          className="block text-sm font-medium text-gray-700"
        >
          Bahan-Bahan (satu per baris)
        </label>
        <textarea
          name="recipe"
          id="recipe"
          value={formData.recipe}
          onChange={handleChange}
          required
          rows="5"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        ></textarea>
      </div>
      <div>
        <label
          htmlFor="instructions"
          className="block text-sm font-medium text-gray-700"
        >
          Cara Memasak (satu per baris)
        </label>
        <textarea
          name="instructions"
          id="instructions"
          value={formData.instructions}
          onChange={handleChange}
          required
          rows="7"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        ></textarea>
      </div>
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-800 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          {submitButtonText}
        </button>
      </div>
    </form>
  );
};

export default FoodForm;
