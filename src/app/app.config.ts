import { ApplicationConfig,importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { LucideAngularModule, Tv, Users, Activity, MapPin,Search,User,Globe,ChevronLeft,ChevronRight } from 'lucide-angular';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    importProvidersFrom(LucideAngularModule.pick({ Tv, Users, Activity, MapPin,Search,User,Globe,ChevronLeft,ChevronRight })),
    provideHttpClient(withFetch()),
    provideCharts(withDefaultRegisterables())
  ]
};
