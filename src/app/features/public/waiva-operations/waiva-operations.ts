import { Component, signal, AfterViewInit, OnDestroy, viewChildren, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from "@angular/common";

export interface OperationBlock {
  icon: string;
  title: string;
  description: string;
  subDescription?: string;
}

@Component({
  selector: 'app-waiva-operations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './waiva-operations.html',
  styleUrl: './waiva-operations.scss'
})
export class WaivaOperations implements AfterViewInit, OnDestroy {
  // Pega a referência de todos os elementos com a variável de template #cardRef no HTML
  cardElements = viewChildren<ElementRef>('cardRef');
  private observer: IntersectionObserver | null = null;

  operationBlocks = signal<OperationBlock[]>([
    {
      icon: 'bi bi-cpu',
      title: 'Automação Inteligente de Processos (RPA/IA)',
      description: 'Eliminamos tarefas repetitivas com robôs que trabalham 24/7.',
      subDescription: 'Desde triagem de e-mails até preenchimento de sistemas legados.'
    },
    {
      icon: 'bi bi-diagram-3',
      title: 'Integração Total de Sistemas (APIs)',
      description: 'Conectamos seu CRM, ERP e planilhas para que falem a mesma língua.',
      subDescription: 'Adeus, cópia e cola. Seus dados fluem automaticamente.'
    },
    {
      icon: 'bi bi-bar-chart-steps',
      title: 'Workflows e Dashboards Preditivos',
      description: 'Tenha visão em tempo real da sua operação e antecipe gargalos.',
      subDescription: 'Tomada de decisão baseada em dados, não em "feeling".'
    },
    {
      icon: 'bi bi-robot',
      title: 'Atendimento Híbrido (IA + Humano)',
      description: 'Sua equipe só entra em ação quando é realmente necessária.',
      subDescription: 'A IA resolve 80% das demandas simples instantaneamente.'
    }
  ]);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    // Verifica se está rodando no navegador (para evitar erros em SSR/Universal)
    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();
    }
  }

  ngOnDestroy() {
    // Limpa o observador quando o componente é destruído para evitar vazamento de memória
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver() {
    const options = {
      root: null, // Usa a viewport do navegador como referência
      rootMargin: '0px',
      threshold: 0.2 // Ativa quando 20% do card estiver visível
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Adiciona a classe que dispara os efeitos visuais
          entry.target.classList.add('is-visible');
          // Opcional: Parar de observar após a primeira vez para economizar recursos
          // this.observer?.unobserve(entry.target);
        } else {
          // Opcional: Remover a classe se sair da tela (efeito "vai e volta")
          // entry.target.classList.remove('is-visible');
        }
      });
    }, options);

    // Começa a observar cada elemento de card encontrado
    this.cardElements().forEach(card => {
      this.observer?.observe(card.nativeElement);
    });
  }
}