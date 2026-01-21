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
  displayCharacters: Character[] = [];
  loading: boolean = false;
  currentPage: number = 1;
  totalPages: number = 1;

  async ngOnInit() {
    await this.loadData();
  }

  async loadData(page: number = 1) {
    try {
      this.loading = true;
      this.currentPage = page;
      
      const res = await this.rickMortyService.getCharacters(
        page,
        this.localName, 
        this.filters.gender,
        this.filters.status,
        this.filters.species
      );

      this.characters = res.results;
      this.totalPages = res.info.pages;
      this.displayCharacters = this.characters.slice(0, 18);
    } catch (error) {
      console.error('Erro na busca:', error);
      this.displayCharacters = [];
    } finally {
      this.loading = false;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.loadData(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.loadData(this.currentPage - 1);
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