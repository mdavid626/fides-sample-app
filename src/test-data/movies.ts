import { Movie } from '../types/movies-response';

export const movie1: Movie = {
  adult: false,
  backdrop_path:
    'https://image.tmdb.org/t/p/original/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg',
  genre_ids: [878, 12, 28],
  id: 76600,
  original_language: 'en',
  original_title: 'Avatar: The Way of Water',
  overview:
    'Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.',
  popularity: 6516.443,
  poster_path:
    'https://image.tmdb.org/t/p/original/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
  release_date: '2022-12-14',
  title: 'Avatar: The Way of Water',
  video: false,
  vote_average: 7.7,
  vote_count: 3343,
};

export const movie2: Movie = {
  adult: false,
  backdrop_path:
    'https://image.tmdb.org/t/p/original/dKqa850uvbNSCaQCV4Im1XlzEtQ.jpg',
  genre_ids: [9648, 53, 35],
  id: 661374,
  original_language: 'en',
  original_title: 'Glass Onion: A Knives Out Mystery',
  overview:
    'World-famous detective Benoit Blanc heads to Greece to peel back the layers of a mystery surrounding a tech billionaire and his eclectic crew of friends.',
  popularity: 6801.729,
  poster_path:
    'https://image.tmdb.org/t/p/original/vDGr1YdrlfbU9wxTOdpf3zChmv9.jpg',
  release_date: '2022-11-23',
  title: 'Glass Onion: A Knives Out Mystery',
  video: false,
  vote_average: 7.1,
  vote_count: 1868,
};

export const movie3: Movie = {
  adult: false,
  backdrop_path:
    'https://image.tmdb.org/t/p/original/6mEYUYdkKoVCMeYf3rTFj0L1uyv.jpg',
  genre_ids: [28, 35, 80, 53],
  id: 899112,
  original_language: 'en',
  original_title: 'Violent Night',
  overview:
    'When a team of mercenaries breaks into a wealthy family compound on Christmas Eve, taking everyone inside hostage, the team isn’t prepared for a surprise combatant: Santa Claus is on the grounds, and he’s about to show why this Nick is no saint.',
  popularity: 5267.458,
  poster_path:
    'https://image.tmdb.org/t/p/original/1XSYOP0JjjyMz1irihvWywro82r.jpg',
  release_date: '2022-11-30',
  title: 'Violent Night',
  video: false,
  vote_average: 7.7,
  vote_count: 715,
};

export const movies = [movie1, movie2, movie3];
