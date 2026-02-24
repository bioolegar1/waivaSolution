import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Definimos a interface para tipar rigidamente os nossos dados.
// Isso evita erros de digitação e ajuda a IDE a sugerir as propriedades corretas.
export interface FaqItem {
  id: string;
  question: string;
  paragraphsTop: string[];
  checkList?: string[]; // Opcional: Algumas perguntas não têm lista
  paragraphsBottom?: string[]; // Opcional: Texto após a lista
  hasCta?: boolean; // Opcional: Apenas a última pergunta tem o botão
  isOpen: boolean; // Controla o estado aberto/fechado de cada item independentemente
}

@Component({
  selector: 'app-waiva-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './waiva-faq.html',
  styleUrls: ['./waiva-faq.scss'],
})
export class WaivaFaqComponent {
  // Matriz de dados contendo todas as perguntas e respostas
  public faqs: FaqItem[] = [
    {
      id: '01',
      question: 'O que exatamente a Waiva Solutions faz?',
      paragraphsTop: [
        'Criamos soluções inteligentes para organizar processos, automatizar fluxos de cobrança, estruturar planilhas, gerar relatórios e acompanhar métricas financeiras.',
        'Nosso foco é reduzir inadimplência, recuperar valores e dar previsibilidade ao seu caixa.'
      ],
      isOpen: false
    },
    {
      id: '02',
      question: 'Vocês fazem atendimento automático também?',
      paragraphsTop: [
        'Sim, quando necessário. Podemos criar fluxos de atendimento personalizados, mas nosso principal foco é automação de processos operacionais e financeiros, onde geramos maior impacto em produtividade e recuperação de receita.'
      ],
      isOpen: false
    },
    {
      id: '03',
      question: 'Como funciona a automação de cobrança?',
      paragraphsTop: [
        'Mapeamos sua operação e criamos fluxos inteligentes que:'
      ],
      checkList: [
        'Identificam boletos atrasados',
        'Enviam cobranças no momento certo',
        'Organizam respostas e negociações',
        'Atualizam planilhas e sistemas automaticamente',
        'Geram relatórios e acompanhamento diário'
      ],
      paragraphsBottom: [
        'Tudo sem depender de controle manual.'
      ],
      isOpen: false
    },
    {
      id: '04',
      question: 'Preciso trocar meu sistema atual?',
      paragraphsTop: [
        'Não. Integramos com seus sistemas, planilhas ou CRM sempre que possível. Nosso objetivo é organizar e potencializar o que você já usa, sem complicar sua operação.'
      ],
      isOpen: false
    },
    {
      id: '05',
      question: 'Em quanto tempo vejo resultados?',
      paragraphsTop: [
        'A maioria dos clientes começa a ver melhoria em organização e recuperação financeira nas primeiras semanas, principalmente na redução de tarefas manuais e no controle da inadimplência.'
      ],
      isOpen: false
    },
    {
      id: '06',
      question: 'Para que tipo de empresa é indicado?',
      paragraphsTop: [
        'Atendemos empresas que têm faturamento recorrente ou controle financeiro com boletos e parcelas, como:'
      ],
      checkList: [
        'Clínicas',
        'Escolas',
        'Empresas de serviços',
        'Imobiliárias',
        'Negócios com vendas parceladas'
      ],
      paragraphsBottom: [
        'Se você tem valores atrasados ou processos desorganizados, podemos ajudar.'
      ],
      isOpen: false
    },
    {
      id: '07',
      question: 'Quanto custa?',
      paragraphsTop: [
        'Nossas soluções começam a partir de R$ 699/mês, variando conforme o tamanho da operação e complexidade dos fluxos.'
      ],
      isOpen: false
    },
    {
      id: '08',
      question: 'Preciso de equipe técnica para usar?',
      paragraphsTop: [
        'Não. Entregamos tudo configurado, com treinamento e acompanhamento. Sua equipe só acompanha os resultados e toma decisões estratégicas.'
      ],
      isOpen: false
    },
    {
      id: '09',
      question: 'Os dados da minha empresa ficam seguros?',
      paragraphsTop: [
        'Sim. Trabalhamos com boas práticas de segurança e acesso controlado, garantindo confidencialidade das informações financeiras e operacionais.'
      ],
      isOpen: false
    },
    {
      id: '10',
      question: 'Como começar?',
      paragraphsTop: [
        'Agendamos um diagnóstico rápido da sua operação, identificamos gargalos e mostramos exatamente onde a automação pode gerar mais resultado.'
      ],
      hasCta: true,
      isOpen: false
    }
  ];

  // A lógica agora é puramente manipulação de estado (State Management).
  // Quando o usuário clica em um botão, chamamos esta função passando o item específico.
  public toggleAccordion(clickedItem: FaqItem): void {
    // Salvamos o estado atual do item clicado antes de fecharmos todos
    const wasOpen = clickedItem.isOpen;

    // Fechamos todos os itens iterando sobre a matriz
    this.faqs.forEach(item => item.isOpen = false);

    // Se o item que foi clicado estava fechado, nós o abrimos
    // O Angular detecta essa mudança na variável e reflete no HTML automaticamente
    if (!wasOpen) {
      clickedItem.isOpen = true;
    }
  }

  // A função recebe o evento de clique vindo do HTML
  protected currentYear: string | undefined;
  public scrollToTop(event: Event): void {
    // 1. Interrompe a ação padrão do link (evita saltos secos ou mudanças na URL)
    event.preventDefault();

    // 2. Comanda o navegador a rolar a tela até a posição 0 (topo) com animação suave
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}