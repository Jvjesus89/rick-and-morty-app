import { Component, OnInit, inject } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { CharacterCard } from '../character-card/character-card';
import { RickMortyService } from '../../services/rick-morty';
import { Character } from '../../models/character.model'; 

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, CharacterCard],
  templateUrl: './character-list.html',
  styleUrl: './character-list.scss'
})
export class CharacterList implements OnInit {
  private rickMortyService = inject(RickMortyService);

  localName: string = '';
  filters = {
    status: '',
    species: '',
    gender: ''
  };

  characters: Character[] = [];
  loading: boolean = false;

  async ngOnInit() {
    await this.loadData();
  }

  //loadData com parâmetros de busca
  async loadData() {
    try {
      this.characters = await this.rickMortyService.getCharacters(
        this.localName, 
        this.filters.gender,
        this.filters.status,
        this.filters.species
      );
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      this.characters = [];
    }
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    this.loadData(); 
  }

  onFilterChange() {
    this.loadData(); 
  }
}