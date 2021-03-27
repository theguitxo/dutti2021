import { Injectable, setTestabilityGetter } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { iShipsState, ShipsResponse } from "../interfaces/ships.interface";
import { ShipsService } from "../services/ships.service";
import { GetShips } from "./ships.actions";

@State<iShipsState>({
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
  static getList(state: iShipsState) {
    return state.list;
  }

  @Selector()
  static getPage(state: iShipsState) {
    return state.page;
  }

  @Selector()
  static getTotal(state: iShipsState) {
    return state.total;
  }

  @Selector()
  static getState(state: iShipsState) {
    return state;
  }

  @Action(GetShips)
  getShips({ getState, setState }: StateContext<iShipsState>, {payload}: GetShips) {
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

