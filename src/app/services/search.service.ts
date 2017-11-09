import { Injectable } from '@angular/core';
import { DATA_2016_2017 } from '../data/data_2016-2017';
import { DATA_2017_2018 } from '../data/data_2017-2018';

@Injectable()
export class SearchService {

  areas: string[] = [];
  dates: string[] = [];
  teams: string[] = [];
  locations: string[] = [];
  locationsByArea: any = {};
  dayOfWeeks: string[] = ["月", "火", "水", "木", "金", "土", "日"];

  result: any = [];
  selectedTeam: string;
  selectedLocation: any = {};
  showLocationFilter: boolean = false;

  constructor() {
    this._parseAll();
  }

  search(team: string, locations: string[], date?: string) {
    let bareLocations = locations.map(location => {
      if (location) {
        return location.split('（')[0];
      }
    });

    let year = (new Date()).getFullYear();
    let month = ((new Date()).getMonth() + 1);
    let day = (new Date()).getDate();

    this.result = DATA_2017_2018.games.filter(game => {
      let dateArray = game.date.split("/");
      let gameYear = +dateArray[0];
      let gameMonth = +dateArray[1];
      let gameDay = +dateArray[2];

      return (
        (!team || (game.home === team || game.away === team)) &&
        (!this.showLocationFilter || bareLocations.length === 0 || bareLocations.indexOf(game.location) >= 0) &&
        (
          (gameYear > year) ||
          (gameYear === year && gameMonth > month) ||
          (gameYear === year && gameMonth === month && gameDay >= day)
        )
      );
    });
  }

  onClickBuyTicket(game) {
    const href = this._pathToTicketPage(game);
    console.info('visit: ' + href);
    location.href = href;
  }

  onChangeFilter(event) {
    let keys = Object.keys(this.selectedLocation);
    let locations = keys.map(location => {
      if (this.selectedLocation[location]) {
        return location;
      }
    });
    this.search(this.selectedTeam, locations);
  }

  onChangeLocation(event) {
    let keys = Object.keys(this.selectedLocation);
    let locations = keys.map(location => {
      if (this.selectedLocation[location]) {
        return location;
      }
    });
    this.search(this.selectedTeam, locations);
  }

  onSelectTeam(event) {
    console.log(event);
    let keys = Object.keys(this.selectedLocation);
    let locations = keys.map(location => {
      if (this.selectedLocation[location]) {
        return location;
      }
    });
    this.search(this.selectedTeam, locations);
  }

  private _pathToTicketPage(game) {
    let date = game.date.split('/').join('');
    const url = DATA_2017_2018.ticketBaseUrl + DATA_2017_2018.shortNames[game.home] + '/' + date;
    return  url;
  }

  private _parseAll() {
    this.teams = Object.keys(DATA_2017_2018.shortNames);

    let locationHash = {};
    let locationsByAreaHash = {};
    let dateHash = {};
    for (let game of DATA_2017_2018.games) {
      locationHash[game.location] = true;
      locationsByAreaHash[game.area] = locationsByAreaHash[game.area] || {};
      locationsByAreaHash[game.area][game.location] = true;
      dateHash[game.date] = true;
    }

    this.areas = DATA_2017_2018.prefectures;
    this.locations = Object.keys(locationHash);
    for (let area of this.areas) {
      // 会場が無い都道府県もあるので
      let locations = [];
      if (locationsByAreaHash[area]) {
        locations = Object.keys(locationsByAreaHash[area]);
      }

      this.locationsByArea[area] = locations;
    }
    this.dates = Object.keys(dateHash);
  }

}
