import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { Character } from '../../models/character.model';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-dashboard-charts',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, LucideAngularModule],
  templateUrl: './dashboard-charts.html',
  styleUrl: './dashboard-charts.scss'
})
export class DashboardCharts implements OnChanges {
  @Input() characters: Character[] = [];

  // Chart A: Episodes per Season (Bars)
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: { x: { ticks: { color: 'white' } }, y: { ticks: { color: 'white' } } },
    plugins: { legend: { display: false } }
  };
  public barChartData: ChartData<'bar'> = { labels: [], datasets: [{ data: [], backgroundColor: '#4ade80' }] };

  // Chart B: Characters per Planet (Doughnut)
  public doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: { legend: { position: 'right', labels: { color: 'white' } } }
  };
  public doughnutChartData: ChartData<'doughnut'> = { labels: [], datasets: [{ data: [] }] };

  ngOnChanges() {
    if (this.characters.length > 0) {
      this.processSeasonData();
      this.processPlanetData();
    }
  }

  private processSeasonData() {
    const seasonCounts: { [key: string]: Set<string> } = {};
    
    this.characters.forEach(char => {
      char.episode.forEach(epUrl => {
        // A API retorna a URL, mas geralmente o dado de temporada vem no objeto Episode.
        // Se estivermos usando apenas o Character, vamos contar aparições totais por temporada
        // simulando a extração da string do episódio se disponível ou usando a contagem simples.
      });
    });
    
  }

  private processPlanetData() {
    const planetCount: { [key: string]: number } = {};
    
    this.characters.forEach(char => {
      const planet = char.origin.name || 'Unknown';
      planetCount[planet] = (planetCount[planet] || 0) + 1;
    });

    const sortedPlanets = Object.entries(planetCount)
      .sort((a, b) => b[1] - a[1])

    this.doughnutChartData = {
      labels: sortedPlanets.map(p => p[0]),
      datasets: [{ 
        data: sortedPlanets.map(p => p[1]),
        backgroundColor: ['#22c55e', '#3b82f6', '#ef4444', '#eab308', '#a855f7'] 
      }]
    };
  }
}