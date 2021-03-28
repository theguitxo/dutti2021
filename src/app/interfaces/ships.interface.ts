export interface Ship {
  name: String;
  model: String;
  manufacturer: String;
  cost_in_credits: String;
  length: String;
  max_atmosphering_speed: String;
  crew: String;
  passengers: String;
  cargo_capacity: String;
  consumables: String;
  hyperdrive_rating: String;
  MGLT: String;
  starship_class: String;
  pilots: Array<String>;
  films: Array<String>;
  created: String;
  edited: String;
  url: String;
}

export interface ShipsResponse {
  count: number;
  next: string;
  previous: string;
  results: Array<Ship>;
}

export interface iShipsState {
    page: number;
    total: number;
    list: Array<Ship>;
}
