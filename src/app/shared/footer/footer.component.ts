import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvDataService } from '../../services/cv-data.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  profile: any;
  currentYear: number = new Date().getFullYear();

  constructor(private cvDataService: CvDataService) {
    this.profile = this.cvDataService.getProfile();
  }
}