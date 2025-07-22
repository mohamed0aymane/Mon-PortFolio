import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EducationComponent } from './components/education/education.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ContactComponent } from './components/contact/contact.component';

export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent, 
    title: 'Accueil',
    pathMatch: 'full' 
  },
  { 
    path: 'education', 
    component: EducationComponent, 
    title: 'Formation' 
  },
  { 
    path: 'experience', 
    component: ExperienceComponent, 
    title: 'Expérience' 
  },
  { 
    path: 'skills', 
    component: SkillsComponent, 
    title: 'Compétences' 
  },
  { 
    path: 'contact', 
    component: ContactComponent, 
    title: 'Contact' 
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];