export interface PetSurvey {
  id: number;
  name: string;
  imageUrl: string;
  score: number;
}

export interface GetPetSurveyResponse {
  totalVotes: number;
  pets: PetSurvey[];
}
