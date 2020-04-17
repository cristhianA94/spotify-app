import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

import { SpotifyService } from './../../services/spotify.service';

export interface Tracks {
  foto: string;
  album: string;
  cancion: string;
  vistaPrevia: string;
}

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styles: [
    `
    table {
      width: 100%;
    }

    .mat-form-field {
      font-size: 14px;
      width: 100%;
    }

    td, th {
      width: 25%;
    }
    `
  ]
})
export class ArtistComponent implements OnInit {

  displayedColumns: string[] = ['Foto', 'Álbum', 'Canción', 'Vista Previa'];

  dataSource = new MatTableDataSource<Tracks>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  artista: any = {};
  loadingArtista: boolean;


  constructor(private router: ActivatedRoute, private spotify: SpotifyService) {

    this.loadingArtista = true;
    // Recibe el parametro id
    this.router.params.subscribe((params: any) => {
      this.getArtista(params.id);
      this.getTopTracks(params.id);
      //console.log("Data resuelta");
      
    })
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getArtista(id: string) {
    this.loadingArtista = true;

    this.spotify.getArtista(id).subscribe(artista => {
      this.artista = artista;
      this.loadingArtista = false;
      console.log(artista);
    });
  }

  getTopTracks(id: string) {
    this.spotify.getArtistaTopTracks(id).subscribe((tracks: Tracks[]) => {
      // Asigna la data recibida a la tabla
      this.dataSource.data = tracks;
      //console.log(this.dataSource.data);
      ;
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onRowClicked(row: any) {
    console.log('Row clicked: ', row);
  }
}
