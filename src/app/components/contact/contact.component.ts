import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { CvDataService } from '../../services/cv-data.service';

interface ContactItem {
  id: string;
  icon: string;
  title: string;
  value: string;
  link?: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  // Configuration EmailJS 
  private readonly emailjsConfig = {
    publicKey: 'jVK9VGY1cn3r1jSBs',        
    serviceId: 'service_bxh81pn',        
    templateId: 'template_evp2hcu'       
  };

  // Données du formulaire
  formData = {
    name: '',
    email: '',
    message: ''
  };

  // États du composant
  isSending = false;
  sendSuccess = false;
  sendError = false;
  errorMessage = '';

  // Informations de contact
  profile: any;
  contactItems: ContactItem[] = [];

  constructor(private cvDataService: CvDataService) {
    this.profile = this.cvDataService.getProfile();
    this.initContactItems();
    this.initEmailJS();
  }

  private initEmailJS(): void {
    try {
     
      if (this.emailjsConfig.publicKey === 'jVK9VGY1cn3r1jSBs') {
        console.warn('⚠️ EmailJS: Veuillez configurer votre vraie clé publique');
        return;
      }
      
      emailjs.init({
        publicKey: this.emailjsConfig.publicKey,
        // Options supplémentaires pour le debugging
        blockHeadless: true,
        blockList: {
          watchVariable: 'userAgent'
        },
        limitRate: {
          throttle: 10000 // 10 secondes entre les envois
        }
      });
      
      console.log('✅ EmailJS initialisé avec succès');
    } catch (error) {
      console.error('❌ Erreur lors de l\'initialisation EmailJS:', error);
    }
  }

  private initContactItems(): void {
    this.contactItems = [
      {
        id: 'phone',
        icon: 'fas fa-phone',
        title: 'Téléphone',
        value: this.profile?.phone || 'Non renseigné'
      },
      {
        id: 'email',
        icon: 'fas fa-envelope',
        title: 'Email',
        value: this.profile?.email || 'mohamedaymanelamhamdi@gmail.com'
      },
      {
        id: 'address',
        icon: 'fas fa-map-marker-alt',
        title: 'Adresse',
        value: this.profile?.address || 'Non renseigné'
      },
      {
        id: 'linkedin',
        icon: 'fab fa-linkedin',
        title: 'LinkedIn',
        value: 'Lamhamdi Mohamed Aymane',
        link: 'https://www.linkedin.com/in/mohamed-aymane-lamhamdi-443079316/'
      },
      {
        id: 'github',
        icon: 'fab fa-github',
        title: 'GitHub',
        value: this.profile?.links?.[0]?.github || 'lamhamdi-aymane',
        link: this.profile?.links?.[0]?.github 
          ? `https://github.com/${this.profile.links[0].github}` 
          : 'https://github.com/lamhamdi-aymane'
      }
    ].filter(item => item.value && item.value !== 'Non renseigné');
  }

  async submitForm(form: NgForm) {
    if (form.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires correctement';
      this.sendError = true;
      return;
    }

    // Vérification de la configuration EmailJS
    if (this.emailjsConfig.publicKey === '') {
      this.errorMessage = 'Configuration EmailJS manquante. Contactez l\'administrateur.';
      this.sendError = true;
      return;
    }

    this.isSending = true;
    this.sendSuccess = false;
    this.sendError = false;
    this.errorMessage = '';

    try {
      console.log(' Tentative d\'envoi email...');
      
      // Préparer les données du template
      const templateParams = {
        from_name: this.formData.name.trim(),
        from_email: this.formData.email.trim(),
        to_name: 'Mohamed Aymane Lamhamdi',
        to_email: 'mohamedaymanelamhamdi@gmail.com',
        message: this.formData.message.trim(),
        reply_to: this.formData.email.trim(),
        // Ajouter la date pour le suivi
        sent_date: new Date().toLocaleString('fr-FR')
      };

      console.log(' Paramètres du template:', templateParams);

      const response = await emailjs.send(
        this.emailjsConfig.serviceId,
        this.emailjsConfig.templateId,
        templateParams,
        {
          publicKey: this.emailjsConfig.publicKey
        }
      );

      console.log('✅ Email envoyé avec succès:', response);

      if (response.status === 200) {
        this.sendSuccess = true;
        form.resetForm();
        this.formData = { name: '', email: '', message: '' };
        
        // Masquer le message de succès après 5 secondes
        setTimeout(() => {
          this.sendSuccess = false;
        }, 5000);
      }

    } catch (error: any) {
      console.error('❌ Erreur complète:', error);
      this.sendError = true;
      
      // Gestion détaillée des erreurs
      if (error.status === 400) {
        this.errorMessage = 'Configuration incorrecte. Vérifiez vos identifiants EmailJS.';
        console.error('Erreur 400: Vérifiez Service ID, Template ID et Public Key');
      } else if (error.status === 401) {
        this.errorMessage = 'Clé publique invalide.';
        console.error('Erreur 401: Public Key invalide');
      } else if (error.status === 402) {
        this.errorMessage = 'Quota EmailJS dépassé.';
        console.error('Erreur 402: Quota dépassé');
      } else if (error.status === 429) {
        this.errorMessage = 'Trop de tentatives. Réessayez dans quelques minutes.';
        console.error('Erreur 429: Rate limit atteint');
      } else if (error.text) {
        this.errorMessage = `Erreur: ${error.text}`;
      } else {
        this.errorMessage = 'Erreur réseau. Vérifiez votre connexion internet.';
      }

    
      console.groupEnd();

    } finally {
      this.isSending = false;
    }
  }

  // Méthode de test pour vérifier la configuration
  testEmailJSConfig(): void {
    console.group('🔍 Test de configuration EmailJS:');
 
    console.groupEnd();
  }
}