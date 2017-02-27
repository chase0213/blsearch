import { Component } from '@angular/core';
import { SearchService } from './services/search.service';
import "sanitize.css/sanitize.css";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ SearchService ],
})
export class AppComponent {

  constructor(public search: SearchService) {
  }

}
