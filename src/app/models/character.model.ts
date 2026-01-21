export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  gender: 'Male' | 'Female' | 'Genderless' | 'unknown';
  origin: { name: string };
  location: { name: string };
  image: string;
  episode: string[];
}