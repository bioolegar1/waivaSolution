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
    highlight: 'Processos limitados \n pela operação',
    subHighlight: '...',
    theme: 'before',
    points: [
      { text: 'Cobranças manuais e desorganizadas', isPositive: false },
      { text: 'Planilhas descentralizadas e sem padrão', isPositive: false },
      { text: 'Falta de controle de métricas e resultados', isPositive: false },
      { text: 'Tempo perdido com tarefas repetitivas', isPositive: false },
      { text: 'Dificuldade para acompanhar inadimplência', isPositive: false }
    ]
  });

  public readonly afterData = signal<IComparisonCard>({
    title: 'Depois da Waiva',
    highlight: '+70%',
    subHighlight: 'processos organizados e executados automaticamente',
    theme: 'after',
    points: [
      { text: 'Fluxos inteligentes de cobrança e recuperação financeira', isPositive: true },
      { text: 'Planilhas, sistemas e relatórios integrados automaticamente', isPositive: true },
      { text: 'Dashboards com métricas claras e acompanhamento em tempo real', isPositive: true },
      { text: 'Organização de processos sem esforço operacional', isPositive: true },
      { text: 'Escala com controle, previsibilidade e eficiência', isPositive: true }
    ]
  });
}