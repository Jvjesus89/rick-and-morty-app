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
  if (!this.characters.length) return;

  const seasons = { 'T1': 0, 'T2': 0, 'T3': 0, 'T4': 0, 'T5': 0 };
  this.characters.forEach(char => {
    char.episode.forEach(url => {
      const id = parseInt(url.split('/').pop() || '0');
      if (id <= 11) seasons['T1']++;
      else if (id <= 21) seasons['T2']++;
      else if (id <= 31) seasons['T3']++;
      else if (id <= 41) seasons['T4']++;
      else if (id <= 51) seasons['T5']++;
    });
  });

  this.barChartData = {
    labels: Object.keys(seasons),
    datasets: [{ data: Object.values(seasons), label: 'Frequência', backgroundColor: '#4ade80' }]
  };
}

private processPlanetData() {
  const planetCounts = this.characters.reduce((acc, char) => {
    const planet = char.origin.name === 'unknown' ? 'Desconhecido' : char.origin.name;
    acc[planet] = (acc[planet] || 0) + 1;
    return acc;
  }, {} as {[key: string]: number});

  const sorted = Object.entries(planetCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);

  this.doughnutChartData = {
    labels: sorted.map(p => p[0]),
    datasets: [{ 
      data: sorted.map(p => p[1]), 
      backgroundColor: ['#22c55e', '#3b82f6', '#ef4444', '#eab308', '#a855f7'] 
    }]
  };
  }
}