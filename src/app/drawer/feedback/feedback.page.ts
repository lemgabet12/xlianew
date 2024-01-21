import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  private apiUrl = 'https://your-api-endpoint.com/data';

  currentDate: Date | undefined;
  constructor() {
    this.currentDate = new Date();
   }

  ngOnInit() {
  }


}
