import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IShipsState } from 'src/app/interfaces/ships.interface';
declare var $: any;


@Component({
  selector: 'ships-details',
  templateUrl: './ships-details.component.html',
  styleUrls: ['./ships-details.component.scss']
})
export class ShipsDetailsComponent implements OnInit {

  @Input() dataList: IShipsState;
  @Output() changePage = new EventEmitter<number>();

  config: any;
  shipId: string = '';
  url: string = '';
  // Modal
  titleDetails: string = '';
  modelDetails: string = '';
  starship_class: string = '';

  ngOnInit(): void {
      this.config = {
        itemsPerPage: 10,
        currentPage: this.dataList.page,
        totalItems: this.dataList.total
      };
  }

  getStarshipId(url) {
    this.shipId = url.split('/').filter(item => item !== '').slice(-1)[0];
    const urlImage = `https://starwars-visualguide.com/assets/img/starships/${this.shipId}.jpg`;
    return urlImage;
  }

  pageChanged(event){
    this.config.currentPage = event;
    this.changePage.emit(event);
  }

  openDetails(details) {
    $("#exampleModal").modal('show');
    this.titleDetails = details.name;
    this.modelDetails = details.model;
    this.starship_class = details.starship_class
  }

}
