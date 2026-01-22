import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { Character } from '../../models/character.model';
import { LucideAngularModule } from 'lucide-angular';

interface Episode {
  id: number;
  name: string;
  episode: string; 
}
@Component({
  selector: 'app-dashboard-charts',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, LucideAngularModule],
  templateUrl: './dashboard-charts.html',
  styleUrl: './dashboard-charts.scss'
})
export class DashboardCharts implements OnChanges {
  @Input() characters: Character[] = [];
  @Input() episodes: Episode[] = [];
  // Chart A: Episodes per Season (Bars)
public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: { 
      x: { ticks: { color: 'white' } }, 
      y: { ticks: { color: 'white' }, beginAtZero: true } 
    },
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
  const seasons = { 'T1': 0, 'T2': 0, 'T3': 0, 'T4': 0, 'T5': 0 };

  this.episodes.forEach(ep => {
    const seasonNumber = parseInt(ep.episode.substring(1, 3));
    const key = `T${seasonNumber}`;
    
    if (seasons.hasOwnProperty(key)) {
      seasons[key as keyof typeof seasons]++;
    }
  });

  this.barChartData = {
    labels: Object.keys(seasons),
    datasets: [{
      data: Object.values(seasons),
      label: 'Quantidade de Episódios',
      backgroundColor: '#4ade80'
    }]
  };
}

public planetChartOptions: ChartConfiguration['options'] = {
  indexAxis: 'y', 
  responsive: true,
  maintainAspectRatio: false, 
  datasets: {
    bar: {
      barPercentage: 3,      
      categoryPercentage: 0.5
    }
  },
  scales: {
    x: { ticks: { color: 'white' }, grid: { color: 'rgba(255,255,255,0.1)' } },
    y: { ticks: { color: 'white' }, grid: { display: false } }
  },
  plugins: {
    legend: { display: false }
  }
};

public planetChartData: ChartData<'bar'> = { 
  labels: [], 
  datasets: [{ 
    data: [], 
    backgroundColor: '#3b82f6' 
  }] };

private processPlanetData() {
  const planetCounts = this.characters.reduce((acc, char) => {
    const planet = char.origin.name === 'unknown' ? 'Desconhecido' : char.origin.name;
    acc[planet] = (acc[planet] || 0) + 1;
    return acc;
  }, {} as {[key: string]: number});

  const sorted = Object.entries(planetCounts).sort((a, b) => b[1] - a[1]);

  this.planetChartData = {
    labels: sorted.map(p => p[0]),
    datasets: [{ 
      data: sorted.map(p => p[1]), 
      label: 'Personagens',
      backgroundColor: '#3b82f6' 
    }]
  };
}
}