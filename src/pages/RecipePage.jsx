import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const RecipePage = () => {
  const { foodId } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/foods/${foodId}`
        );
        if (!response.ok) {
          throw new Error("Resep tidak ditemukan");
        }
        const data = await response.json();
        setFood(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFood();
  }, [foodId]);

  const videoId = food ? food.youtubeId : null;

  if (loading) {
    return <div className="text-center py-10">Memuat resep...</div>;
  }

  if (!food) {
    return (
      <div className="min-h-screen bg-[#F5F5DC]/40 flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-3xl font-bold text-stone-800">
          Resep Tidak Ditemukan
        </h1>
        <p className="text-stone-600 mt-2">
          Maaf, kami tidak dapat menemukan resep yang Anda cari.
        </p>
        <Link
          to="/"
          className="mt-6 bg-green-800 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-900 transition-colors"
        >
          Kembali ke Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5DC]/40 py-10 px-4 sm:px-8 flex items-center">
      <div className="max-w-5xl w-full mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-10">
        <Link
          to="/"
          className="text-green-800 hover:text-green-900 font-semibold mb-6 inline-block"
        >
          ← Kembali ke Daftar Makanan
        </Link>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-800">
          {food.name}
        </h1>
        <p className="mt-3 text-stone-600 max-w-3xl">{food.description}</p>

        {videoId && (
          <div className="my-8">
            <h2 className="text-2xl font-bold text-stone-700 mb-4">
              Tonton Tutorial Memasak
            </h2>
            <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`} // URL Embed YouTube yang benar
                title={`Tutorial Memasak ${food.name}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          <div>
            <h3 className="text-xl font-semibold text-stone-700 mb-3">
              Bahan-Bahan
            </h3>
            <ul className="list-disc list-inside pl-2 text-stone-600 space-y-2">
              {food.recipe.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-stone-700 mb-3">
              Cara Memasak
            </h3>
            <ol className="list-decimal list-inside pl-2 text-stone-600 space-y-2">
              {food.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
