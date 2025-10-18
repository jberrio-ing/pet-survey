import { useEffect, useState } from 'react';
import type { GetPetSurveyResponse } from './types';
import RankingBar from './components/RankingBar';
import PetCard from './components/PetCard';
import { APP_CONFIG } from './config/app.config';

const VOTED_PET_KEY = 'votedPetId';

function App() {
  const [surveyData, setSurveyData] = useState<GetPetSurveyResponse | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [votedPetId, setVotedPetId] = useState<number | null>(null);

  useEffect(() => {
    // Verificar si el usuario ya votó
    const storedVotedPetId = localStorage.getItem(VOTED_PET_KEY);
    if (storedVotedPetId) {
      setVotedPetId(Number(storedVotedPetId));
    }
    fetchSurveyData();
  }, []);

  const fetchSurveyData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/api/pet-survey`);
      if (!response.ok) {
        throw new Error('Error al cargar los datos');
      }
      const data: GetPetSurveyResponse = await response.json();
      setSurveyData(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Error al cargar los datos',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (petId: number) => {
    if (voting || votedPetId) return;

    try {
      setVoting(true);
      setError(null);
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/api/pet-survey/vote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ petId }),
        },
      );

      if (!response.ok) {
        throw new Error('Error al registrar el voto');
      }

      // Guardar el voto en localStorage
      localStorage.setItem(VOTED_PET_KEY, petId.toString());
      setVotedPetId(petId);

      // Actualizar los datos
      await fetchSurveyData();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Error al registrar el voto',
      );
    } finally {
      setVoting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-300 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">🐾</div>
          <p className="text-2xl font-bold text-white">Cargando mascotas...</p>
        </div>
      </div>
    );
  }

  if (error || !surveyData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-300 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
          <div className="text-6xl mb-4">😿</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            ¡Ups! Algo salió mal
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchSurveyData}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-md"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  const topPets = [...surveyData.pets]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-300 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
            🐾 Encuesta de Mascotas 🐾
          </h1>
          <p className="text-xl text-white/90 font-semibold">
            ¡Vota por tu mascota favorita!
          </p>
        </div>

        {/* Total Votes */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 text-center">
          <div className="text-5xl mb-2">🗳️</div>
          <p className="text-gray-600 text-lg mb-1">Total de votos</p>
          <p className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            {surveyData.totalVotes}
          </p>
        </div>

        {/* Top 3 Ranking */}
        {surveyData.totalVotes > 0 && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span>🏆</span>
              <span>Top 3 Ranking</span>
            </h2>
            <div>
              {topPets.map((pet, index) => (
                <RankingBar
                  key={pet.id}
                  rank={index + 1}
                  name={pet.name}
                  score={pet.score}
                  imageUrl={pet.imageUrl}
                />
              ))}
            </div>
          </div>
        )}

        {/* Voted Message */}
        {votedPetId && (
          <div className="bg-green-500/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 text-center text-white">
            <div className="text-4xl mb-2">✅</div>
            <p className="text-xl font-bold">
              ¡Gracias por votar! Tu voto ha sido registrado
            </p>
            <p className="text-white/80 mt-2">Tu elección está marcada abajo</p>
          </div>
        )}

        {/* Pets Grid */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            {votedPetId ? 'Todas las mascotas' : 'Elige tu favorita'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {surveyData.pets.map((pet) => (
              <PetCard
                key={pet.id}
                pet={pet}
                onVote={handleVote}
                hasVoted={!!votedPetId}
                isUserVote={votedPetId === pet.id}
                disabled={!!votedPetId || voting}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-white/80">
          <p className="text-sm">
            Desarrollado con ❤️ para los amantes de las mascotas
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
