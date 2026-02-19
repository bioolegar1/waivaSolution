import { Component, signal } from '@angular/core';
import {IComparisonCard} from "@core/comparison.model";

@Component({
  selector: 'app-waiva-comparison',
  standalone: true,
  imports: [],
  templateUrl: './waiva-comparison.html',
  styleUrl: './waiva-comparison.scss'
})
export class WaivaComparison {

  public readonly beforeData = signal<IComparisonCard>({
    title: 'Antes da Waiva',
    highlight: '61 leads',
    subHighlight: 'por dia, em média',
    theme: 'before',
    points: [
      { text: 'Atendimento totalmente dependente de time humano', isPositive: false },
      { text: 'Respostas lentas ou fora do horário comercial', isPositive: false },
      { text: 'Leads quentes se perdiam por falta de retorno', isPositive: false },
      { text: 'Escala limitada pelo número de pessoas disponíveis', isPositive: false }
    ]
  });

  public readonly afterData = signal<IComparisonCard>({
    title: 'Depois da Waiva',
    highlight: '500+ leads',
    subHighlight: 'processados por dia',
    theme: 'after',
    points: [
      { text: 'Automação no primeiro contato, triagem e organização', isPositive: true },
      { text: 'Atendimento contínuo, independente de horário ou volume', isPositive: true },
      { text: 'Crescimento sem contratar mais pessoas', isPositive: true },
      { text: 'Sem gargalos operacionais', isPositive: true }
    ]
  });
}