import { Component, OnInit } from '@angular/core';
import { SpotifyService } from './../../services/spotify.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
    .example-card {
    max-width: 400px;
    }
    .example-header-image {
      background-image: url('https://material.angular.io/assets/img/examples/shiba1.jpg');
      background-size: cover;
    }
    mat-chip {
      max-width: 200px;
    }
    `
  ]
})
export class HomeComponent implements OnInit {

  nuevasCanciones: any[] = [];
  loading: boolean;

  constructor(private spotyService: SpotifyService) {

    this.loading = true;

    this.spotyService.getNewReleases().subscribe(data => {
      //console.log(data);
      this.nuevasCanciones = data;
      this.loading = false;
    });
  }

  ngOnInit(): void {
  }


}
