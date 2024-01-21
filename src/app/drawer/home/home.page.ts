
import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,

} from '@angular/core';
import { OnInit,NgZone  } from '@angular/core';
import {Chart} from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { ResidentService } from '../../Service/listofresident';
import { Observable } from 'rxjs';
import { OccupationPrev } from 'src/app/models/OccupationPrev';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit   {
  public chart: any;
  ResidentApiUrl = '';
  ResidentDataAsArray: any[] = []
  PropieteArray : any[] = []
  Propiete = {
    chbclima : '',
    chbtelephone :'',
    chbminibar :'',
    chbpascoffre :'',
    chbVM :'',
    rch2 :'',
    ch3 :'',
  }
  RockData = {
    nomhotel:'',
    toto: '',
    totd: '',
    sum: '',
    totlpresent: '',
    totr: '',
    depart: '',
    lib: '',
    totrr: '',
    arrive: '',
    choccup:'',
    s: '',
    arrT :'',
    depT : '',
    arrFd : '',
    arrSd : '',
    arrThd : '',
    depFd : '',
    depSd : '',
    depThd : '',
    totlpTT :'',
    totlpTFd : '',
    totlpSd : '',
    totlpThd : '',
    choccuptomorrow : '',
    choccupFirstDay :'',
    choccupSecondDay :'',
    choccupthirdDay : '',
    offT : '',
    offFd :'',
    offSd : '',
    offThd :'',
    forday :'',
    fifday: '',
  };

  ShowMore: boolean = false;
  visible: boolean = true;
  expanded: any;
  firstday: Date = new Date();
  secondday : Date = new Date();
  thirdday : Date = new Date();
  tomorrow: Date = new Date();
  ElementRef: any;
  @ViewChild('lineCanvas')
  private lineCanvas!: ElementRef;
  lineChart: Date = new Date();
  fifthday: Date = new Date();
  sixday: Date = new Date();
  sevenday: Date = new Date();
  dayOfMonth: any;
  day: any;
  monthName: any;
  currantday: any;

  residents: any[] =[];
lineChartOptions: any;
  lineChartData: any;
  DataOccupation: any[] =[];
  DataOccupationPrev: OccupationPrev[] = []
  data: any;
  datanomagence: any;

  tauxnbr:  any[] = [];



  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }
  currentDate: Date = new Date();
  ionViewDidEnter() {
  /*  this.setupPageReload();*/
  }
  /*private setupPageReload() {
    setTimeout(() => {
      this.ngZone.run(() => {
        // Reload the current page
        window.location.reload();
      });
    }, 10000); // 10 seconds
  }*/
  private adrese:string ="http://196.234.125.66"
  private port:string = "3084"
  private maapping:string ="hotel"
  getDetailsOccupation(): Observable<any> {
   // console.log("entred service getDetailsOccupation");

    return this.http.get(`${this.adrese}:${this.port}/${this.maapping}/getOccupationDetails`);


  }
  getOccupationDetailsPrev(): Observable<any> {
    for(let i =0; i < this.data; i++)
    {



       this.tauxnbr.push(this.data[i].taux_chb);
       console.log(this.tauxnbr)
//console.log(this.datanomagence ,this.datanbr);



 }
 this.createChart(this.tauxnbr);
    //console.log("entred service getOccupationDetailsPrev ");

    return this.http.get(`${this.adrese}:${this.port}/${this.maapping}/getOccupationDetailsPrev`);


  }
  ngOnInit() {
    this.getDetailsOccupation().subscribe(

      (data: any[]) => {
      //  console.log("data from subscribed service", data);

        this.DataOccupation = data
      }
    )
    this.getOccupationDetailsPrev().subscribe(
      (data: OccupationPrev[]) => {

        // Format taux_chb for each item in the array
        this.DataOccupationPrev = data.map((item: OccupationPrev) => ({
          ...item,
          taux_chb: parseFloat(item.taux_chb.toFixed(2))
        }));


      }
    );
    this.residentService.getStudents().subscribe((data: any[]) => {
      this.residents = data;
    });
    this.readAPI(this.ResidentApiUrl)
      .subscribe((data) => {
        this.RockData.nomhotel = data.nomhotel;
        this.RockData.toto = data.toto;
        this.RockData.totlpresent = data.totlpresent;
        this.RockData.arrive = data.arrive;
        this.RockData.depart = data.depart;
        this.RockData.s = data.s;
        this.RockData.choccup = data.choccup;
        this.RockData.sum = data.sum;
        this.RockData.arrT = data.arrT;
        this.RockData.depT = data.depT;
        this.RockData.arrFd = data.arrFd;
        this.RockData.arrSd = data.arrSd;
        this.RockData.arrThd = data.arrThd;
        this.RockData.depFd = data.depFd;
        this.RockData.depSd = data.depSd;
        this.RockData.depThd = data.depThd;
        this.RockData.totlpTT = data.totlpTT;
        this.RockData.totlpTFd = data.totlpTFd;
        this.RockData.totlpSd = data.totlpSd;
        this.RockData.totlpThd = data.totlpThd;
        this.RockData.choccuptomorrow =data.choccuptomorrow;
        this.RockData.choccupFirstDay = data.choccupFirstDay;
        this.RockData.choccupSecondDay = data.choccupSecondDay;
        this.RockData.choccupthirdDay = data.choccupthirdDay;
        this.RockData.offT = data.offT;
        this.RockData.offFd = data.offFd;
        this.RockData.offSd = data.offSd;
        this.RockData.offThd = data.offThd;
        this.RockData.forday = data.forday;
        this.RockData.fifday= data.fifday;
        this.Propiete.chbclima = data.chbclima;
        this.Propiete.chbpascoffre = data.chbpascoffre;
        this.Propiete.chbtelephone = data.chbtelephone;
        this.Propiete.chbminibar = data.chbminibar;
        this.Propiete.rch2 = data.rch2;
        this.Propiete.ch3 = data.ch3;
        this.Propiete.chbVM = data.chbVM;










      });

    this.currentDate.setDate(this.currentDate.getDate() );
    this.tomorrow .setDate(this.currentDate.getDate() + 1);
    this.firstday.setDate(this.currentDate.getDate() + 2);
    this.secondday.setDate(this.currentDate.getDate() +3);
    this.thirdday.setDate(this.currentDate.getDate() + 4);
    this.fifthday.setDate(this.currentDate.getDate() + 5);
    this.sixday.setDate(this.currentDate.getDate() + 6);
    this.sevenday.setDate(this.currentDate.getDate() + 7);

    /*const dayName = this.getDayName(this.currentDate);
  console.log('this is the name :'+dayName);*/
  }

 /* getDayName(date: Date): string  {
    let options = { weekday: 'long' };
    return date.toLocaleDateString('fr-FR'+options);
  }*/
  students: any[] = [];

    renderDoughnutChart(Propiete: any) {
      this.PropieteArray.push(Propiete.chbclima);

      this.PropieteArray.push(Propiete.chbtelephone);

      this.PropieteArray.push(Propiete.chbpascoffre);
      this.PropieteArray.push(Propiete.chbminibar);
      this.PropieteArray.push(Propiete.chbVM);
      this.PropieteArray.push(Propiete.rch2);
      this.PropieteArray.push(Propiete.ch3);
    const ctx = document.getElementById('doughnutChart') as HTMLCanvasElement;
    const doughnutChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['climat', ' Telephone', 'Coffre','Mini Bar','Vue Mér','Lits à 2','Lits à 3'],
        datasets: [{
          data: this.PropieteArray,
          backgroundColor: ['#FF6384', '#36A2EB', '#999999', '#008080','#000080',	'#228B22'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#999999','#008080','#000080','#228B22'],
        }],
      },
    });
  }
  constructor(private http: HttpClient, private navCtrl: NavController, private residentService: ResidentService,private ngZone: NgZone) {
    this.ResidentApiUrl = 'http://192.168.3.8:3013/hotel/countRack';
  }
refreshPage() {
  // Use window.location.reload() to refresh the page
  window.location.reload();
}


  readAPI(URL: string) {
    return this.http.get<any>(URL);
  }
  onclick() {

    this.ShowMore = !this.ShowMore;
    this.visible = !this.visible
  }


  createChart(tauxnbr: any) {



   // this.lineChart = new Chart(this.lineCanvas.nativeElement,
   const day: number = this.tomorrow.getDate();
   const monthNames: string[] = [
     'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
     'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre'
   ];
   const monthName: string = monthNames[this.tomorrow.getMonth()];
   //console.log(day , monthName);
    const currantday = day + monthName;

    //console.log(currantday);
    /*----------------------------*/
    const day1: number = this.tomorrow.getDate();
    const monthName1: string = monthNames[this.tomorrow.getMonth()];
    const tomorrowday = day1 +" "+ monthName1;
    console.log('day is =' +day1 , 'month is = '+ monthName1);
    /*------------------------------------*/
    const day2: number = this.firstday.getDate();
    const monthName2: string = monthNames[this.firstday.getMonth()];
    const tomorrowday1 = day2 +" "+ monthName2;
    /*-------------------------------------------------- */
    const day3: number = this.secondday.getDate();
    const monthName3: string = monthNames[this.secondday.getMonth()];
    const tomorrowday3 = day3 +" "+ monthName3;
    /*-------------------------------------------------- */
    const day4: number = this.thirdday.getDate();
    const monthName4: string = monthNames[this.thirdday.getMonth()];
    const tomorrowday4 = day4 +" "+ monthName4;
     /*-------------------------------------------------- */
     const day5: number = this.fifthday.getDate();
     const monthName5: string = monthNames[this.fifthday.getMonth()];
     const tomorrowday5 = day5 +" "+ monthName5;
       /*-------------------------------------------------- */
       const day6: number = this.sixday.getDate();
       const monthName6: string = monthNames[this.sixday.getMonth()];
       const tomorrowday6 = day6 +" "+ monthName6;
       this.chart = new Chart("MyChart", {
        type: 'line', //this denotes tha type of chart

        data: {// values on X-Axis
          labels: [tomorrowday, tomorrowday1, tomorrowday3,tomorrowday4,
            tomorrowday5, tomorrowday6 ],
           datasets: [
            {
              label: "Chambre",
              data :['1.53','5.66','3.85','3.2','3.2','3.2'],
              backgroundColor: 'red'
            },

          ]
        },
        options: {
          aspectRatio:2.5
        }

      });
    }
}

