import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ShipsService } from 'src/app/services/ships.service';
import { ShipsComponent } from './ships.component';
import { BehaviorSubject } from 'rxjs';
import { ShipsState } from 'src/app/store/ships.state';
import { NgxsModule } from '@ngxs/store';

describe('ShipsComponent', () => {
  let component: ShipsComponent;
  let fixture: ComponentFixture<ShipsComponent>;
  const serviceMock ={
    getShips:function(){ return  new BehaviorSubject([])}

  }

  @Component({
    selector: 'ships-details',
    template: '<p>Mock Ship Details</p>'
  })
  class MockShipDetails {
    @Input() dataList:any;
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipsComponent,MockShipDetails ],
      providers:[
        {provide: ShipsService, useValue: serviceMock}
      ],
      imports: [
        NgxsModule.forRoot([
          ShipsState
        ]),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
