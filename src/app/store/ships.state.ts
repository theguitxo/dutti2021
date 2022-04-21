import { Injectable, setTestabilityGetter } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { IShipsState, ShipsResponse } from "../interfaces/ships.interface";
import { ShipsService } from "../services/ships.service";
import { GetShips } from "./ships.actions";

@State<IShipsState>({
  name: 'ships',
  defaults: {
    list: [],
    page: 1,
    total: 1,
  }
})
@Injectable()
export class ShipsState {
  constructor (private shipsService: ShipsService) {
  }

  @Selector()
  static getList(state: IShipsState) {
    return state.list;
  }

  @Selector()
  static getPage(state: IShipsState) {
    return state.page;
  }

  @Selector()
  static getTotal(state: IShipsState) {
    return state.total;
  }

  @Selector()
  static getState(state: IShipsState) {
    return state;
  }

  @Action(GetShips)
  getShips({ getState, setState }: StateContext<IShipsState>, {payload}: GetShips) {
    return this.shipsService.getShips(payload)
      .pipe(tap((result: ShipsResponse) => {
        const state = getState();
        state.list = result.results;
        state.page = payload;
        state.total = result.count;
        setState(state);
      }));
  }
}

