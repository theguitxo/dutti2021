import { ChangeDetectorRef, Component, OnInit, Renderer2 } from '@angular/core';
import { map } from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {

  private _show: boolean = false;

  get show(): boolean {
    return this._show;
  }
  constructor(
    private loadingService: LoadingService,
    private cdRef: ChangeDetectorRef,
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {
    this.loadingService.isLoading.subscribe(
      (value) => {
        if (value) {
          this.renderer.addClass(document.body, 'no-overflow');
        } else {
          this.renderer.removeClass(document.body, 'no-overflow');
        }
        this._show = value;
        this.cdRef.detectChanges();
      }
    );
  }
}
