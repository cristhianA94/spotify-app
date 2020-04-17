import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styles: [
  ]
})
export class TarjetasComponent implements OnInit {

  // Para reutilziar el <app-tarjetas>
  @Input() items: any[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  verArtista(item: any) {
    let artistaId: any;

    if (item.type === 'artist') {
      artistaId = item.id;
    } else {
      artistaId = item.artists[0].id;
    }
    this.router.navigate(['/artist', artistaId]);
  }
}
