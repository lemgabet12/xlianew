import { Component, OnInit,NgZone  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../api.service';
import { Observable } from 'rxjs';
import * as Highcharts from 'highcharts';

import { ShowagenceService } from './showagence.service';
@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {
  private apiUrl = 'http://192.168.3.8:3013/hotel/countagence';
  datanomagence : any[] = [];
  datanbr : any[] = [];
  agences: any[] = [];
  data : any;
  currentDate: Date = new Date();
  constructor(private httpclient : HttpClient , private ngZone: NgZone , private http: HttpClient ,private apiService: ApiService,private showagenceservice : ShowagenceService) { }
  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  ionViewDidEnter() {
    this.showagenceservice.showdata().subscribe(res =>{
      this.data = res;
      console.log(this.data)
      let filteredData = this.data.filter( (nbr: String) => this.data.nbr > 0);




         for(let i =0; i < this.data.length; i++)
         {
         if(this.data[i].nbr !== null && this.data[i].nbr !== 0)
         {

            this.datanomagence.push(this.data[i].nom_agence);
            this.datanbr.push(this.data[i].nbr);
//console.log(this.datanomagence ,this.datanbr);

        }
      }
      this.plotSimpleBarChart(this.datanomagence , this.datanbr);

    }

    );
  }
  plotSimpleBarChart(datanomagence :any , datanbr :any) {

    this.currentDate.setDate(this.currentDate.getDate() );
    const monthNames: string[] = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre'
    ];
    const monthName: string = monthNames[this.currentDate.getMonth()];


    // @ts-ignore
    var chart = Highcharts.chart('container', {
      chart: {
        type: 'bar'
      },
      title: {
        text: "Nombres des arrives par agence"
      },
      xAxis: {

        categories: datanomagence,
        stack: 'Stack 1'

      },
      options: {
        aspectRatio:0.5
      },

      yAxis: {
        title: {
          text: ''
        }
      },
      series: [
        {
          name: monthName,
          type: undefined,
          data: datanbr,
          backgroundColor: "rgba(99,132,255,0.2",

        },
      ]

    });

  }
  ngOnInit() {
    //this.setupPageReload();
  }





 /* private setupPageReload() {
    setTimeout(() => {
      this.ngZone.run(() => {
        // Reload the current page
        window.location.reload();
      });
    }, 10000); // 10 seconds
  }*/

}
