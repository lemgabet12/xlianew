import { Color } from './../../../../node_modules/colors/index.d';
import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,

} from '@angular/core';
import { OnInit } from '@angular/core';
import {Chart} from 'chart.js';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit   {
  public chart: any;
  ResidentApiUrl = '';
  ResidentDataAsArray: any[] = []
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


  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }
  currentDate: Date = new Date();

  ngOnInit() {
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




        this.createChart(this.RockData);






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

  constructor(private http: HttpClient) {
    this.ResidentApiUrl = 'http://192.168.3.8:3013/hotel/countRack';
  }



  readAPI(URL: string) {
    return this.http.get<any>(URL);
  }
  onclick() {

    this.ShowMore = !this.ShowMore;
    this.visible = !this.visible
  }


  createChart(Resident: any) {
    this.ResidentDataAsArray.push(Resident.totd);

    this.ResidentDataAsArray.push(Resident.totl);

    this.ResidentDataAsArray.push(Resident.totr);
   // this.lineChart = new Chart(this.lineCanvas.nativeElement,

   this.chart = new Chart(this.lineCanvas.nativeElement, {
    type: 'line', //this denotes tha type of chart

    data: {// values on X-Axis
      labels: ['Mercredi', 'Jeudi', 'Vendredi','Samedi',
               'Dimanche', 'Lundi', 'Mardi'],
       datasets: [
        {
          label: "Chambre",
          data: ['467','576', '572', '79', '92',
               '574', '573', '576'],
               borderWidth: 1,
               borderColor: 'green',
        },
        
        {
          label: "Pax",
          data: ['542', '542', '536', '327', '17',
                 '0.00', '538', '541'],
                 borderWidth: 1,
                 borderColor: 'red'
        }
      ]
    },
    options: {
      aspectRatio:2.5
    }

  });

}
}

