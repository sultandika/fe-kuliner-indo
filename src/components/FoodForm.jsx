import React, { useState, useEffect } from "react";
import {
  SparklesIcon,
  DocumentTextIcon,
  PhotoIcon,
  PlayCircleIcon,
  ClipboardDocumentListIcon,
  ListBulletIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

// KOMPONEN BANTUAN UNTUK INPUT FIELD (Membuat kode lebih bersih)
const FormField = ({
  id,
  label,
  name,
  type = "text",
  as = "input",
  rows = 3,
  value,
  onChange,
  required = false,
  placeholder = "",
  helperText = "",
  icon: Icon,
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-slate-700">
      {label}
    </label>
    <div className="mt-1 relative rounded-md shadow-sm">
      {Icon && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon className="h-5 w-5 text-slate-400" aria-hidden="true" />
        </div>
      )}
      {as === "input" ? (
        <input
          type={type}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={`block w-full rounded-md border-slate-300 ${Icon ? 'pl-10' : 'pl-3'} pr-3 py-2 focus:border-green-500 focus:ring-green-500 sm:text-sm`}
        />
      ) : (
        <textarea
          name={name}
          id={id}
          rows={rows}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={`block w-full rounded-md border-slate-300 ${Icon ? 'pl-10' : 'pl-3'} pr-3 py-2 focus:border-green-500 focus:ring-green-500 sm:text-sm`}
        />
      )}
    </div>
    {helperText && <p className="mt-2 text-xs text-slate-500">{helperText}</p>}
  </div>
);


// KOMPONEN UTAMA
const FoodForm = ({
  onSubmit,
  initialData,
  submitButtonText = "Submit",
  isLoading = false, // <-- Prop baru untuk loading state
}) => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return; // Mencegah submit ganda saat loading

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
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="space-y-8 max-w-3xl mx-auto bg-white p-8 sm:p-10 rounded-xl shadow-lg"
      >
        {/* --- Header Form --- */}
        <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Resep Makanan Baru
            </h2>
            <p className="mt-2 text-sm text-slate-600">
                Isi detail resep makanan di bawah ini dengan lengkap.
            </p>
        </div>

        {/* --- Grid untuk Input Fields --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
            <div className="md:col-span-2">
                <FormField
                    id="name"
                    label="Nama Makanan"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Contoh: Nasi Goreng Spesial"
                    icon={SparklesIcon}
                />
            </div>
            
            <div className="md:col-span-2">
                 <FormField
                    as="textarea"
                    id="description"
                    label="Deskripsi Singkat"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={3}
                    placeholder="Jelaskan secara singkat tentang makanan ini."
                    icon={DocumentTextIcon}
                />
            </div>

            <FormField
                id="image"
                label="URL Gambar"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                placeholder="https://example.com/gambar.jpg"
                icon={PhotoIcon}
                helperText="URL gambar yang menarik akan meningkatkan minat."
            />

            <FormField
                id="youtubeId"
                label="YouTube Video ID"
                name="youtubeId"
                value={formData.youtubeId}
                onChange={handleChange}
                placeholder="Contoh: qeF-p_cih4E"
                icon={PlayCircleIcon}
                helperText="Hanya ID video, bukan URL lengkap."
            />

            <div className="md:col-span-2">
                <FormField
                    as="textarea"
                    id="recipe"
                    label="Bahan-Bahan"
                    name="recipe"
                    value={formData.recipe}
                    onChange={handleChange}
                    required
                    rows={6}
                    icon={ClipboardDocumentListIcon}
                    placeholder="Satu bahan per baris..."
                    helperText="Pisahkan setiap bahan dengan menekan 'Enter'."
                />
            </div>

            <div className="md:col-span-2">
                <FormField
                    as="textarea"
                    id="instructions"
                    label="Cara Memasak"
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleChange}
                    required
                    rows={8}
                    icon={ListBulletIcon}
                    placeholder="Satu langkah per baris..."
                    helperText="Pisahkan setiap langkah dengan menekan 'Enter'."
                />
            </div>
        </div>

        {/* --- Tombol Submit --- */}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Memproses...
                </>
            ) : (
                <>
                    <PaperAirplaneIcon className="h-5 w-5" />
                    {submitButtonText}
                </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FoodForm;