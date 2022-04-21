export interface Ship {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export interface ShipsResponse {
  count: number;
  next: string;
  previous: string;
  results: Array<Ship>;
}

export interface IShipsState {
    page: number;
    total: number;
    list: Array<Ship>;
}
