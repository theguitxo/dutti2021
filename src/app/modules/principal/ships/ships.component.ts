import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { IShipsState } from 'src/app/interfaces/ships.interface';
import { GetShips } from 'src/app/store/ships.actions';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss']
})
export class ShipsComponent implements OnInit {

  public dataList: IShipsState;
  loaded: boolean = false;

  constructor(
    private store: Store
  ) {
    this.store.select(state => state).subscribe(
      data => {
        this.dataList = data.ships;
        this.loaded =  true;
      }
    );
  }

  ngOnInit(): void {
    this.loadData(1);
  }

  loadData(page: number) {
    this.loaded = false;
    this.store.dispatch(new GetShips(page));
  }

  changePage(page: number) {
    this.loadData(page);
  }
}
