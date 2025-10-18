interface RankingBarProps {
  rank: number;
  name: string;
  score: number;
  imageUrl: string;
}

const getRankColor = (rank: number) => {
  switch (rank) {
    case 1:
      return 'bg-gradient-to-r from-yellow-400 to-yellow-500';
    case 2:
      return 'bg-gradient-to-r from-gray-300 to-gray-400';
    case 3:
      return 'bg-gradient-to-r from-amber-600 to-amber-700';
    default:
      return 'bg-blue-500';
  }
};

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return '🥇';
    case 2:
      return '🥈';
    case 3:
      return '🥉';
    default:
      return rank;
  }
};

export default function RankingBar({
  rank,
  name,
  score,
  imageUrl,
}: RankingBarProps) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="text-3xl">{getRankIcon(rank)}</div>
      <img
        src={imageUrl}
        alt={name}
        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
      />
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className="font-semibold text-gray-800">{name}</span>
          <span className="text-sm font-bold text-gray-700">
            {score.toFixed(2)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full ${getRankColor(rank)} transition-all duration-500 ease-out shadow-sm`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>
    </div>
  );
}
