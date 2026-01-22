import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterList } from './components/character-list/character-list';
import { DashboardCharts } from './components/dashboard-charts/dashboard-charts';
import { LucideAngularModule } from 'lucide-angular';
import { RickMortyService } from './services/rick-morty'; 
import { Character } from './models/character.model';
import { Episode } from './models/episode.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CharacterList, DashboardCharts, LucideAngularModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  characters: Character[] = []; 
  episodes: Episode[] = [];
  activeTab: string = 'characters';
  isLoading: boolean = false;

  constructor(private service: RickMortyService) {}

  ngOnInit() {
    this.loadInitialData();
  }
  
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  loadInitialData() {
    this.isLoading = true;
    try {
     this.service.getAllCharacters().then((data: Character[]) => {
    this.characters = data;
   });

    //load episodes
    this.service.getEpisodes().then((data: Episode[]) => {
    this.episodes = data; 
  }).catch(error => {
    console.error('Erro ao carregar todos os episódios:', error);
  });
  }
  finally {
    this.isLoading = false;
  }
 }
}