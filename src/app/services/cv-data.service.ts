import { Injectable } from '@angular/core';
import {cv} from '../../assets/data/database';
@Injectable({
  providedIn: 'root'
})
export class CvDataService {
  getProfile() {
    return cv.profile;
  }

  getEducation() {
    return cv.education;
  }

  getSkills() {
    return cv.technologySkills;
  }

  getExperiences() {
    return cv.experiences;
  }

  getProfessionalExperiences() {
    return cv.professionalExperiences;
  }

  getSoftSkills() {
    return cv.softSkills;
  }

  getLanguages() {
    return cv.languages;
  }

  getInterests() {
    return cv.interests;
  }
}