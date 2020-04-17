import { ArtistComponent } from './components/artist/artist.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { SpotifyService } from './services/spotify.service';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    resolve: {
      data: SpotifyService
    }
  },
  {
    path: 'artist/:id',
    component: ArtistComponent,
    resolve: {
      data: SpotifyService
    }
  },
  { path: 'search', component: SearchComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [SpotifyService]
})
export class AppRoutingModule { }
