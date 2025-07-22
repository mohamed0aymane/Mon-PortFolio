import { Component } from '@angular/core';
import { CvDataService } from '../../services/cv-data.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  techSkills: any[];

  constructor(private cvDataService: CvDataService) {
    this.techSkills = this.cvDataService.getSkills();
  }

  trackBySkill(index: number, skill: any): string {
    return skill.skill + index;
  }
}