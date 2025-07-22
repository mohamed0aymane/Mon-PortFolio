import { Component, inject } from '@angular/core';
import { CvDataService } from '../../services/cv-data.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { trigger, transition, style, animate, state } from '@angular/animations';



interface NavItem {
  path: string;
  title: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
animations: [
  trigger('slideInOut', [
    state('true', style({
      opacity: 0,
      transform: 'translateY(-20px)'
    })),
    state('false', style({
      opacity: 1,
      transform: 'translateY(0)'
    })),
    transition('true <=> false', [
      animate('0.4s cubic-bezier(0.645, 0.045, 0.355, 1)')
    ])
  ]),
  trigger('rotateToggler', [
    state('true', style({
      transform: 'rotate(0deg)'
    })),
    state('false', style({
      transform: 'rotate(180deg)'
    })),
    transition('true <=> false', [
      animate('0.4s ease')
    ])
  ])
]
})
export class NavbarComponent {
  private readonly cvDataService = inject(CvDataService);
  
  isCollapsed = true;
  profile = this.cvDataService.getProfile();

  readonly navItems: NavItem[] = [
    { path: '/education', title: 'Formations' },
    { path: '/experience', title: 'Expériences' },
    { path: '/skills', title: 'Compétences' },
    { path: '/contact', title: 'Contacts' }
  ];

  toggleMenu(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  closeMenu(): void {
    this.isCollapsed = true;
  }
}