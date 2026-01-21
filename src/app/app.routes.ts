import { Routes } from '@angular/router';
import { CharacterList } from './components/character-list/character-list';
import { DashboardCharts } from './components/dashboard-charts/dashboard-charts';

export const routes: Routes = [
    {path:'',component:CharacterList},
    {path:'characters',component:CharacterList},
    {path:'dashboard',component:DashboardCharts}
];
