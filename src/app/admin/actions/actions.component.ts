import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import tippy, { hideAll } from 'tippy.js';
import { UsersService } from '../Users/users.service';
import { SharedService } from '../../service/shared.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.css'
})
export class ActionsComponent implements ICellRendererAngularComp {
  
  public isOpen = false;
  public params: any;
  private tippyInstance:any
  selected:boolean= false
  deleteHoliday:any
  deleteEvent:any

  @ViewChild('content') container:any;
  @ViewChild('trigger') button:any;
  
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  
  constructor(private changeDetector: ChangeDetectorRef,
      private http:UsersService,
      private _snackBar: MatSnackBar,
      private shared:SharedService){}

  agInit(params: any): void {
    this.params = params;
    this.deleteHoliday = params.data.deleteType
    this.deleteEvent = params.data.deleteEvent 
  }

  refresh(params: any): boolean {
    this.params = params;
    return true;
  }

  ngAfterViewInit(): void {
    this.tippyInstance = tippy(this.button.nativeElement);
    this.tippyInstance.disable();
    // this.tippyInstance = tippy(this.button.nativeElement, {
    //   content: "I'm a Tippy tooltip!",
    //   placement: 'left',
    //   theme: 'user-tippy',
    //   arrow: true,
    //   interactive: true,
    //   appendTo: document.body,
    //   hideOnClick: false,
    //   onShow: (instance:any) => {
    //     hideAll({ exclude: instance });
    //   },
    //   onClickOutside: (instance:any) => {
    //     this.isOpen = false;
    //     instance.unmount();
    //   },
    // });
  }

  configureTippyInstance() {
    this.tippyInstance.enable();
    this.tippyInstance.show();
    this.tippyInstance.setProps({
      trigger: 'manual',
      placement: 'left',
      theme: 'light',
      arrow: true,
      interactive: true,
      appendTo: document.body,
      hideOnClick: false,
      // offset: [-50, 200],
      onShow: (instance:any) => {
        hideAll({ exclude: instance });
      },
      onClickOutside: (instance:any) => {
        this.isOpen = false;
        instance.unmount();
      },
    });
    this.tippyInstance.setContent(this.container.nativeElement);
  }

  tickmark(){
    this.selected = true;
  }

  togglePopup() {
    this.isOpen = !this.isOpen;
    this.changeDetector.detectChanges();
    if (this.isOpen) {
      this.configureTippyInstance();
      this.tippyInstance.setContent(this.container.nativeElement);
    } else {
      this.tippyInstance.unmount();
    }
  }

  onEditClick(): void {
    console.log('Edit clicked for row:', this.params.data);
  }

  onDeleteClick(): void {
    console.log('Delete clicked for row:', this.params.data);
    let id = this.params.data._id
    this.http.deleteuser(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.shared.refresh()
        this._snackBar.open(res.message, 'Splash', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
        });
      },
    })
  }
  onDeleteholiday(){
    let id = this.params.data._id;
    this.http.deleteHolidays(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.shared.refresh()
        this._snackBar.open(res.message, 'Splash', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
        });
      },
    })
  }

  onDeleteevent(){
    let id = this.params.data._id;
    this.http.deleteEvent(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.shared.refresh()
        this._snackBar.open(res.message, 'Splash', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
        });
      },
    })
  }
  
}
