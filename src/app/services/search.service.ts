import { Injectable } from '@angular/core';
import { DATA_2016_2017 } from '../data/data_2016-2017';

@Injectable()
export class SearchService {

  dates: string[] = [];
  teams: string[] = [];
  areas: string[] = [];
  locations: string[] = [];
  locationsWithArea: string[] = [];
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

    this.result = DATA_2016_2017.games.filter(game => {
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
    location.href = this._pathToTicketPage(game);
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
    let keys = Object.keys(this.selectedLocation);
    let locations = keys.map(location => {
      if (this.selectedLocation[location]) {
        return location;
      }
    });
    this.search(this.selectedTeam, locations);
  }

  private _pathToTicketPage(game) {
    return DATA_2016_2017.ticketBaseUrl + DATA_2016_2017.shortNames[game.home] + '/' + game.date;
  }

  private _parseAll() {
    this.teams = Object.keys(DATA_2016_2017.shortNames);

    let areaHash = {};
    let locationHash = {};
    let locationsWithAreaHash = {};
    let dateHash = {};
    for (let game of DATA_2016_2017.games) {
      areaHash[game.date] = true;
      locationHash[game.location] = true;
      locationsWithAreaHash[game.location + '（' + game.area + '）'] = true
      dateHash[game.date] = true;
    }

    this.areas = Object.keys(areaHash);
    this.locations = Object.keys(locationHash);
    this.locationsWithArea = Object.keys(locationsWithAreaHash).sort();
    this.dates = Object.keys(dateHash);
  }

}
