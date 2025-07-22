import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { CvDataService } from '../../services/cv-data.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgFor, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  profile: any;
  languages: any[];
  softSkills: any[];

  constructor(private cvDataService: CvDataService) {
    this.profile = this.cvDataService.getProfile();
    this.languages = this.cvDataService.getLanguages();
    this.softSkills = this.cvDataService.getSoftSkills(); 
  }

  getAge(birthday: { year: number; month: number; day: number }): number {
  const today = new Date();
  const birthDate = new Date(birthday.year, birthday.month - 1, birthday.day); 

  let age = today.getFullYear() - birthDate.getFullYear();
  const hasHadBirthdayThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

  if (hasHadBirthdayThisYear) {
    age++;
  }

  return age;
}


  trackBySoftSkill(index: number, skill: any): string {
    return skill.name;
  }
}