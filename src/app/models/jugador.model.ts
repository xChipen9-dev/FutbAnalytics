export interface JugadorStats {
  id: string;
  nombre: string;
  stats: number[]; 
}

export const LISTADO_JUGADORES: JugadorStats[] = [
  { id: '1', nombre: 'Lionel Messi', stats: [85, 92, 91, 95, 35, 65, 96, 97] },
  { id: '2', nombre: 'Cristiano Ronaldo', stats: [83, 94, 78, 87, 40, 78, 82, 89] },
  { id: '3', nombre: 'Kylian Mbappé', stats: [97, 89, 80, 92, 36, 76, 84, 90] },
  { id: '4', nombre: 'Erling Haaland', stats: [88, 93, 65, 80, 45, 91, 74, 82] },
  { id: '5', nombre: 'Kevin De Bruyne', stats: [74, 86, 95, 88, 65, 78, 96, 91] },
  { id: '6', nombre: 'Jude Bellingham', stats: [82, 84, 86, 87, 78, 84, 88, 89] },
  { id: '7', nombre: 'Pedri', stats: [79, 75, 90, 88, 68, 70, 91, 90] },
  { id: '8', nombre: 'Vinícius Jr', stats: [95, 84, 79, 93, 42, 74, 80, 88] },
  { id: '9', nombre: 'Robert Lewandowski', stats: [78, 91, 76, 86, 44, 82, 83, 87] },
  { id: '10', nombre: 'Lamine Yamal', stats: [88, 80, 82, 90, 38, 63, 84, 89] },
  { id: '11', nombre: 'Rodri', stats: [68, 78, 89, 82, 86, 84, 92, 88] },
  { id: '12', nombre: 'Mohamed Salah', stats: [90, 88, 80, 89, 45, 75, 83, 87] },
  { id: '13', nombre: 'Bukayo Saka', stats: [87, 84, 83, 88, 58, 72, 85, 86] },
  { id: '14', nombre: 'Harry Kane', stats: [69, 92, 84, 82, 47, 83, 88, 86] }
];