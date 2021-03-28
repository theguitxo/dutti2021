import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { iShipsState, Ship } from 'src/app/interfaces/ships.interface';
import { ShipsService } from 'src/app/services/ships.service';
import { GetShips } from 'src/app/store/ships.actions';
import { ShipsState } from 'src/app/store/ships.state';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss']
})
export class ShipsComponent implements OnInit {

  public dataList: iShipsState;
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
