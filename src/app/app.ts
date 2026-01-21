import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterList } from './components/character-list/character-list';
import { DashboardCharts } from './components/dashboard-charts/dashboard-charts';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CharacterList, DashboardCharts, LucideAngularModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  activeTab: 'characters' | 'charts' = 'characters';

  setActiveTab(tab: 'characters' | 'charts'): void {
    this.activeTab = tab;
  }
}