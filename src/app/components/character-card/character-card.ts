import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './character-card.html',
  styleUrl: './character-card.scss'
})
export class CharacterCard {
  @Input({ required: true }) character!: any;

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'Alive': 'status-alive',
      'Dead': 'status-dead',
      'unknown': 'status-unknown'
    };
    return colors[status] || colors['unknown'];
  }

  getStatusText(status: string): string {
    const texts: { [key: string]: string } = {
      'Alive': 'Vivo',
      'Dead': 'Morto',
      'unknown': 'Desconhecido'
    };
    return texts[status] || status;
  }

  getGenderText(gender: string): string {
    const texts: { [key: string]: string } = {
      'Male': 'Masculino',
      'Female': 'Feminino',
      'Genderless': 'Sem Gênero',
      'unknown': 'Desconhecido'
    };
    return texts[gender] || gender;
  }
}