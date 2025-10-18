import type { PetSurvey } from '../types';

interface PetCardProps {
  pet: PetSurvey;
  onVote: (petId: number) => void;
  hasVoted: boolean;
  isUserVote: boolean;
  disabled: boolean;
}

export default function PetCard({
  pet,
  onVote,
  hasVoted,
  isUserVote,
  disabled,
}: PetCardProps) {
  return (
    <div
      className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${
        disabled && !isUserVote
          ? 'opacity-60 cursor-not-allowed'
          : 'hover:shadow-2xl hover:scale-105 cursor-pointer'
      } ${isUserVote ? 'ring-4 ring-green-500 ring-offset-2' : ''}`}
      onClick={() => !disabled && onVote(pet.id)}
    >
      {isUserVote && (
        <div className="absolute top-3 right-3 z-10 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
          <span>✓</span>
          <span>Tu voto</span>
        </div>
      )}

      <div className="aspect-square overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
        <img
          src={pet.imageUrl}
          alt={pet.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-5">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{pet.name}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">❤️</span>
            <span className="text-lg font-semibold text-gray-700">
              {pet.score.toFixed(2)}%
            </span>
          </div>
          {!hasVoted && (
            <button
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-md"
              onClick={(e) => {
                e.stopPropagation();
                onVote(pet.id);
              }}
            >
              Votar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
