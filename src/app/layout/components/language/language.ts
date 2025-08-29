import { Component, inject, OnInit, signal } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language',
  imports: [MatRadioModule, TranslatePipe],
  templateUrl: './language.html',
  styleUrl: './language.scss'
})
export class Language implements OnInit {

  currentLanguage = signal<string | undefined>(undefined);
  translateService = inject(TranslateService)

  ngOnInit() {
    this.currentLanguage.set(this.translateService.getCurrentLang());
  }

  changeLanguage(language: string) {
    this.translateService.use(language);
    this.currentLanguage.set(language);
  }
}
