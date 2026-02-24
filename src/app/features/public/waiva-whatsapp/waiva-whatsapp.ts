import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-waiva-whatsapp',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './waiva-whatsapp.html',
  styleUrls: ['./waiva-whatsapp.scss']
})
export class WaivaWhatsapp {

  private countryCode = '55';
  private areaCode = '71';
  private numberPart1 = '99649';
  private numberPart2 = '1586';
  // LÓGICA: Insira o número com o código do país (55) e DDD, sem traços ou espaços.
  public openWhatsAppSecurely(event: Event): void {
    // Evita qualquer comportamento padrão do navegador
    event.preventDefault();

    // Remonta o número apenas no milissegundo em que o usuário real clica
    const fullNumber = `${this.countryCode}${this.areaCode}${this.numberPart1}${this.numberPart2}`;
    const message = 'Olá! Gostaria de falar com um especialista da Waiva.';

    // Constrói a URL final
    const url = `https://wa.me/${fullNumber}?text=${encodeURIComponent(message)}`;

    // window.open atua como o target="_blank" e o 'noopener,noreferrer' garante a segurança da aba
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}