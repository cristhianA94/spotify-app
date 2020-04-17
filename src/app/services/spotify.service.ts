import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService implements Resolve<any>{

  public onReleasesChanged: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    console.log("Spotify service listo");
    this.onReleasesChanged = new BehaviorSubject([]);
  }

  // Permite cargar los datos de la api antes de cargar el componente
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getNewReleases()
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;

    // Cambiar Authorization en Postman: https://accounts.spotify.com/api/token
    // body{ grant_type, client_id, client_secret
    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQAuS9uEckWuyfcsfGR0tefAnuYlfORjEEZdRMExcdNLIlxIhfKezlR-jhRlpbK8a-uTTxcbzbpCl6mnHaM'
    });

    return this.http.get(url, { headers });
  }

  // Retorna las novedades
  getNewReleases() {
    // Forma abreviada del map cuando solo hay 1 linea
    return this.getQuery('browse/new-releases?limit=20')
      .pipe(map(data => data['albums'].items
      ));
  }

  // Retorna los artistas buscados
  getArtistas(termino: string) {
    // Forma extensa del map cuando hay mas de 1 linea
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
      .pipe(map(data => {
        return data['artists'].items
      }));
  }

  // Retorna el artista buscado
  getArtista(id: string) {
    return this.getQuery(`artists/${id}`);
  }

  // Retorna el artista buscado
  getArtistaTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=US`)
      .pipe(map(data => {
        return data['tracks']
      }));
  }
}
