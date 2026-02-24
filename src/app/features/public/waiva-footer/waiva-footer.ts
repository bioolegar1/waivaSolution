import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-waiva-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './waiva-footer.html',
  styleUrls: ['./waiva-footer.scss']
})
export class WaivaFooter {
  // LÓGICA: Instanciamos a data atual e pegamos apenas o ano.
  // O Angular vai injetar isso no HTML através de interpolação {{ currentYear }}.
  public currentYear: number = new Date().getFullYear();}