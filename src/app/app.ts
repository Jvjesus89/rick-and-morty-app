import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterList } from './components/character-list/character-list';
import { DashboardCharts } from './components/dashboard-charts/dashboard-charts';
import { LucideAngularModule } from 'lucide-angular';
import { RickMortyService } from './services/rick-morty'; 
import { Character } from './models/character.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CharacterList, DashboardCharts, LucideAngularModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  characters: Character[] = []; 
  activeTab: string = 'characters';
  constructor(private service: RickMortyService) {}

  ngOnInit() {
    this.loadInitialData();
  }
  
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  loadInitialData() {
     this.service.getCharacters().then(data => {
      this.characters = data.results; 
    }).catch(error => {
      console.error('Erro ao carregar dados:', error);
    });
  }
}