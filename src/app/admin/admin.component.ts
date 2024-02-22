import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from './Users/users.service';
import { CellEditorSelectorResult, CellValueChangedEvent, ColDef, GridApi, ICellEditorParams, RowValueChangedEvent } from 'ag-grid-community';
import { ActionsComponent } from './actions/actions.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition  } from '@angular/material/snack-bar';
import { MatDialog,} from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { SharedService } from '../service/shared.service';
import { AgChartOptions } from 'ag-charts-community';
import { AgChartsAngular } from 'ag-charts-angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  public paginationPageSize = 10;
  public paginationPageSizeSelector: number[] | boolean = [10, 20, 50, 100];
  public chartOptions: AgChartOptions;
  public options:AgChartOptions
  public agCharts!: AgChartsAngular;
  originalData:any[]=[]
  
  piedata:any[]=[]
  constructor(private http:UsersService,private _snackBar: MatSnackBar,public dialog: MatDialog,private shared:SharedService){
    this.shared.ReloadGrid.subscribe(()=>{
      this.getusers()
    })
    this.chartOptions = {
      data: [
        { month: 'Jan', avgTemp: 2.3, iceCreamSales: 162000 },
        { month: 'Mar', avgTemp: 6.3, iceCreamSales: 302000 },
        { month: 'May', avgTemp: 16.2, iceCreamSales: 800000 },
        { month: 'Jul', avgTemp: 22.8, iceCreamSales: 1254000 },
        { month: 'Sep', avgTemp: 14.5, iceCreamSales: 950000 },
        { month: 'Nov', avgTemp: 8.9, iceCreamSales: 200000 },
      ],
      // Series: Defines which chart type and data to use
      series: [{ type: 'bar', xKey: 'month', yKey: 'iceCreamSales' }]
    };
    this.options = {
      title: {
        text: 'Portfolio Composition',
      },
      series: [
        {
          type: 'pie',
          angleKey: 'count',
          legendItemKey: 'isLogin',
        },
      ],
    };
  }
  
  rowData:any[]=[]
  columnDefs:ColDef[]=[]
  private gridApi!: GridApi;
  public editType: 'fullRow' = 'fullRow';
  public rowSelection: 'single' | 'multiple' = 'multiple';

  ngOnInit(): void {
    this.getusers()
  }
  getusers(){
    this.http.getUsers().subscribe({
      next:(res:any)=>{
        let data = res.response.map((x: any) => ({ 'isLogin': x.isLogin, 'role': x.role }));
        this.originalData = data;

        const lengths = this.originalData.reduce((acc: any, item: any) => {
          const key = item.isLogin;
          acc[key] = (acc[key] || 0) + 1;
          return acc;
        }, {});

        // Convert the lengths object into an array of objects suitable for AG-Grid charts
        const lengthData = Object.entries(lengths).map(([isLogin, count]) => ({ isLogin, count }));

        // Update your options
        this.options = {
          ...this.options,
          data: lengthData,
        };
        
      //  console.log(res.response);
        let headers:any = Object.keys(res.response[0]).filter((x:any)=> x!=='__v' && x!=='password')
        this.columnDefs = headers.map((header:any)=>({
          initialWidth:150,
          headerName:this.toTitleCase(header),
          field:header,
          editable:['_id','createdAt','updatedAt','lastLogin','isLogin','lastLogout'].includes(header)?false:true,
          filter:['lastLogin','createdAt','updatedAt','lastLogout'].includes(header)?'agDateColumnFilter':'agTextColumnFilter',
          tooltipField:header,
          flex:1,
          pinned:['lastLogin','role','status','isLogin','lastLogout'].includes(header)?'right':undefined,
          width:['role','status','isLogin','lastLogout'].includes(header)?100:150,
          valueFormatter:['lastLogin','createdAt','updatedAt','lastLogout'].includes(header)?this.formatDate.bind(this):undefined,
          // cellEditor: ['status'].includes(header) ? 'agSelectCellEditor' : undefined,
          // cellEditorParams: ['status'].includes(header) ? {
          //   values: ['active','inactive'],
          // } : undefined,
          cellEditor: ['role', 'status'].includes(header) ? 'agSelectCellEditor' : undefined,
          cellEditorParams: ['role', 'status'].includes(header) ? {
            values: header === 'role' ? ['Admin', 'User'] : ['Active', 'Inactive'],
          } : undefined,
          headerCheckboxSelection: ['_id'].includes(header)?true:false,
          checkboxSelection: ['_id'].includes(header)?true:false,
          showDisabledCheckboxes: ['_id'].includes(header)?true:false,
          cellStyle: (params: any) => {
            
            if (['isLogin'].includes(header)) {
              // return params.value === 'yes' ? { color: 'green' } : { color: 'red' };
              return {
                color: params.value === 'yes' ? 'green' : 'red',
                textAlign: 'center', 
              };
            }
            return undefined; 
          },
        }))
        this.columnDefs.push({
          headerName: 'Actions',
          sortable:false,
          editable: false,
          colId: 'action',
          cellRenderer:ActionsComponent,
          flex: 1,
          pinned: 'right',
          width: 75,
        });
  
        this.rowData = res.response.map((row: any) => ({
          ...row,
        }));
      }
    })
  }
  
  toTitleCase(str: string): string {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }
  formatDate(params: any) {
    const date = new Date(params.value);
  
    const options:any = {
      // weekday: 'short', // Use 'short' to get the three-letter abbreviation of the day
      // month: 'short',   // Use 'short' to get the three-letter abbreviation of the month
      month: '2-digit',  
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
  
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  userdata:any
  showdata(data:any){
    this.userdata= data.data
    console.log(data.data);
  }
  
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }
  onCellValueChanged(event: CellValueChangedEvent) {
    console.log('onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue);
  }
  onRowValueChanged(event: RowValueChangedEvent) {
    console.log('onRowValueChanged: ' + event.data.userName+',' +event.data.email +','+event.data.password+','+event.data.role+','+event.data.status) ;
    this.UpdateUser()
  }

  addUser(data:boolean){
    const dialogRef = this.dialog.open(LoginComponent, { minWidth: '75vw', height: '1000px',data:data });
    dialogRef.afterClosed().subscribe(() => {
      this.getusers();
    });
  }
 
  UpdateUser(){
    this.http.updateUser(this.userdata).subscribe({
      next:(res:any)=>{
        console.log(res);
        this._snackBar.open(res.message, 'Splash', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
        });
      }
    })
  }
  // search
  onQuickFilterChanged() {
    this.gridApi.setGridOption(
      'quickFilterText',
      (document.getElementById('quickFilter') as HTMLInputElement).value
    );
  }

  onSelectionChanged(event: any): void {
    const selectedRows = this.gridApi.getSelectedRows();
    console.log('Selected Rows:', selectedRows);
  }
}
