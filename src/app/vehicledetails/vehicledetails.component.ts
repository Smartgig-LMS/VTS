import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CellValueChangedEvent, ColDef, GridApi, RowValueChangedEvent } from 'ag-grid-community';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ShowDetailsComponent } from './show-details/show-details.component';
import { MatDialog } from '@angular/material/dialog';
import { DisplayVehiclesComponent } from './display-vehicles/display-vehicles.component';

@Component({
  selector: 'app-vehicledetails',
  templateUrl: './vehicledetails.component.html',
  styleUrl: './vehicledetails.component.css'
})
export class VehicledetailsComponent implements OnInit{

  rowData: any = [];
  columnDefs: ColDef[] = [];
  private gridApi!: GridApi;
  public editType: 'fullRow' = 'fullRow';
  public rowSelection: 'single' | 'multiple' = 'multiple';
  showadd: boolean = true;
  csvdata:any

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  public paginationPageSize = 10;
  public paginationPageSizeSelector: number[] | boolean = [10, 20, 50, 100];

  constructor(private http:DataService, public dialog: MatDialog){}

  selectedState: any;
  selectedDistrict: any;
  selectedRegion: any;
  selectedArea: any;
  
  states = [
    { id: 1, name: 'Uttar Pradesh' },
    { id: 2, name: 'Maharashtra' },
    { id: 3, name: 'Bihar' },
    { id: 4, name: 'West Bengal' },
    { id: 5, name: 'Madhya Pradesh' },
    { id: 6, name: 'Tamil Nadu' },
    { id: 7, name: 'Rajasthan' },
    { id: 8, name: 'Karnataka' },
    { id: 9, name: 'Gujarat' },
    { id: 10, name: 'Andhra Pradesh' },
    { id: 11, name: 'Odisha' },
    { id: 12, name: 'Telangana' },
    { id: 13, name: 'Kerala' },
    { id: 14, name: 'Jharkhand' },
    { id: 15, name: 'Assam' }
  ];
  
  districts = [
    // Uttar Pradesh
    { id: 1, name: 'Lucknow' },
    { id: 2, name: 'Varanasi' },
    { id: 3, name: 'Agra' },
    // Maharashtra
    { id: 4, name: 'Mumbai' },
    { id: 5, name: 'Pune' },
    { id: 6, name: 'Nagpur' },
    // Tamil Nadu
    { id: 7, name: 'Chennai' },
    { id: 8, name: 'Coimbatore' },
    { id: 9, name: 'Madurai' },
    // West Bengal
    { id: 10, name: 'Kolkata' },
    { id: 11, name: 'Darjeeling' },
    { id: 12, name: 'Howrah' },
    // Karnataka
    { id: 13, name: 'Bengaluru' },
    { id: 14, name: 'Mysuru' },
    { id: 15, name: 'Mangaluru' }
  ];
  
  regions = [
    // Sample regions (hypothetical or broad areas within states)
    { id: 1, name: 'Region A1' },
    { id: 2, name: 'Region A2' },
    { id: 3, name: 'Region B1' },
    { id: 4, name: 'Region B2' },
    { id: 5, name: 'Region C1' },
    { id: 6, name: 'Region C2' },
    { id: 7, name: 'Region D1' },
    { id: 8, name: 'Region D2' },
    { id: 9, name: 'Region E1' },
    { id: 10, name: 'Region E2' },
    { id: 11, name: 'Region F1' },
    { id: 12, name: 'Region F2' },
    { id: 13, name: 'Region G1' },
    { id: 14, name: 'Region G2' },
    { id: 15, name: 'Region H1' }
  ];
  
  areas = [
    // Sample areas (could be municipalities, localities, etc.)
    { id: 1, name: 'Area X1' },
    { id: 2, name: 'Area X2' },
    { id: 3, name: 'Area Y1' },
    { id: 4, name: 'Area Y2' },
    { id: 5, name: 'Area Z1' },
    { id: 6, name: 'Area Z2' },
    { id: 7, name: 'Area W1' },
    { id: 8, name: 'Area W2' },
    { id: 9, name: 'Area V1' },
    { id: 10, name: 'Area V2' },
    { id: 11, name: 'Area U1' },
    { id: 12, name: 'Area U2' },
    { id: 13, name: 'Area T1' },
    { id: 14, name: 'Area T2' },
    { id: 15, name: 'Area S1' }
  ];
  

  carNumbers = [
    "ABC123", "XYZ456", "123ABC", "456XYZ", "DEF789",
    "GHI012", "JKL345", "MNO678", "PQR901", "STU234",
    "VWX567", "YZA890", "BCD123", "EFG456", "HIJ789",
    "KLM012", "NOP345", "QRS678", "TUV901", "WXY234"
  ];

  invalidNumbers = [
    "123ABC", "456XYZ", "JKL345", "MNO678", "PQR901",
    "STU234", "VWX567", "YZA890", "KLM012"
  ];

  reviewNumbers = [
    "GHI012", "JKL345", "MNO678", "PQR901", "STU234",
  ];
  
  ngOnInit(): void {
    this.getvehical_Details()
    this.updateCarNumbers();
    setInterval(() => this.updateCarNumbers(), 2000);
  }

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; 
    }
  }

  updateCarNumbers() {
    this.shuffleArray(this.carNumbers);
    this.shuffleArray(this.invalidNumbers);
    this.shuffleArray(this.reviewNumbers);
  }

  showdetails(data:any){
    // console.log(data);
    let dialogRef = this.dialog.open(DisplayVehiclesComponent, {
      width: '90%',
      height: '90%',
      data: data,
    });
  }

  getvehical_Details() {
    this.http.getvehicleDetails().subscribe({
      next: (res: any) => {
        this.csvdata = res.response
        console.log(res);
        let headers: any = Object.keys(res.response[0]).filter(
          (x: any) => x !== '__v' && x !== 'createdAt' && x !== 'updatedAt' && x !== 'deleteEvent'
        );
        this.columnDefs = headers.map((header: any) => ({
          initialWidth: 150,
          headerName: this.toTitleCase(header),
          field: header,
          editable: ['_id'].includes(header) ? false : true,
          filter: ['registrationDate'].includes(header)? 'agDateColumnFilter': 'agTextColumnFilter',
          tooltipField: header,
          flex: 1,
          pinned: ['registrationDate','vehicleModel','RCStatus'].includes(header)? 'right': undefined,
          width: ['registrationDate'].includes(header) ? 120 : undefined,
          valueFormatter: ['registrationDate'].includes(header)? this.formatDate.bind(this): undefined,
          // cellEditor: ['status'].includes(header) ? 'agSelectCellEditor' : undefined,
          // cellEditorParams: ['status'].includes(header) ? {
          //   values: ['active','inactive'],
          // } : undefined,
          cellEditor: ['RCStatus'].includes(header)? 'agSelectCellEditor': undefined,
          cellEditorPopup: ['eventDescription'].includes(header)?true:false,
          cellEditorParams: ['RCStatus'].includes(header)? {values: header === 'RCStatus' ? ['Active','Inactive'] : ['Yes', 'No'],}: undefined,
          // cellEditorParams: ['eventDescription'].includes(header)? { maxLength: 100}: undefined,
          headerCheckboxSelection: ['_id'].includes(header) ? true : false,
          checkboxSelection: ['_id'].includes(header) ? true : false,
          showDisabledCheckboxes: ['_id'].includes(header) ? true : false,
          cellStyle: (params: any) => {
            if (['RCStatus', ].includes(header)) {
              // return params.value === 'yes' ? { color: 'green' } : { color: 'red' };
              return {
                color: params.value === 'Active' ? 'green' : 'red',
                // textAlign: 'center',
              };
            }
            return undefined;
          },
        }));
        // this.columnDefs.push({
        //   headerName: 'Actions',
        //   sortable: false,
        //   editable: false,
        //   colId: 'action',
        //   cellRenderer: ActionsComponent,
        //   flex: 1,
        //   pinned: 'right',
        //   width: 100,
        // });

        this.rowData = res.response.map((row: any) => ({
          ...row,
        }));
      },
    });
  }

  toTitleCase(str: string): string {
    return str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  }

  formatDate(params: any) {
    const date = new Date(params.value);
    const options: any = {
      weekday: 'short', // Use 'short' to get the three-letter abbreviation of the day
      month: 'short', // Use 'short' to get the three-letter abbreviation of the month
      // month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
  eventdata:any
  showdata(data: any) {
    this.eventdata = data.data
    console.log(data.data);
    const dialogRef = this.dialog.open(ShowDetailsComponent, { minWidth: '75vw', height: '800px',data:this.eventdata });
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  onCellValueChanged(event: CellValueChangedEvent) {
    console.log(
      'onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue
    );
  }
  onRowValueChanged(event: RowValueChangedEvent) {
    console.log('onRowValueChanged: ' +event.data.userName +',' +event.data.email + ',' +event.data.password +',' +event.data.role +',' +event.data.status);
   
  }
  onSelectionChanged(event: any): void {
    const selectedRows = this.gridApi.getSelectedRows();
    console.log('Selected Rows:', selectedRows);
  }
  // search
  onQuickFilterChanged() {
    this.gridApi.setGridOption(
      'quickFilterText',
      (document.getElementById('quickFilter') as HTMLInputElement).value
    );
  }

  getCSV() {
    const name = 'Vehical_details';
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
  
    const fileName = `${name}_${formattedDate}.csv`;
  
    this.gridApi.exportDataAsCsv({
      fileName: fileName,
      columnSeparator: ',',
      suppressQuotes: true,
      allColumns: true,
      onlySelected: false,
    });
  }

  logSelectedId(type: string, id: any) {
    console.log(`${type} selected:`, id);
  }
  

}
