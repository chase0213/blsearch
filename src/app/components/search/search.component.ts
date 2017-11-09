import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../services/search.service';
import "sanitize.css/sanitize.css";

@Component({
  selector: 'bls-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [ SearchService ],
})
export class SearchComponent implements OnInit {

  constructor(
    public search: SearchService,
    private _route: ActivatedRoute,
  ) {
    this._route.params.subscribe(params => {
      const team = params['id'];
      const _loc = params['l'];
      let locations = [];
      if (_loc) {
        locations = _loc.split(',');
      }

      console.log(team, locations, params);
    });
  }

  ngOnInit() {
  }

}
