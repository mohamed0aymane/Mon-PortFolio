import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvDataService } from '../../services/cv-data.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  experiences: any[] = [];
  professionalExperiences: any[] = [];

  constructor(private cvDataService: CvDataService) {}

  ngOnInit(): void {
    this.loadExperienceData();
  }

  private loadExperienceData(): void {
    this.experiences = this.cvDataService.getExperiences();
    this.professionalExperiences = this.cvDataService.getProfessionalExperiences();
  }
}