import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvDataService } from '../../services/cv-data.service';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent {
  education: any[]; 

  constructor(private cvDataService: CvDataService) {
    this.education = this.cvDataService.getEducation(); 
  }
}