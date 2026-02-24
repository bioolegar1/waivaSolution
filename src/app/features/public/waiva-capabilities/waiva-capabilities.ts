import { Component, signal } from '@angular/core';
import { ICapabilityBlock } from "@core/capability.model";

@Component({
  selector: 'app-waiva-capabilities',
  standalone: true,
  imports: [],
  templateUrl: './waiva-capabilities.html',
  styleUrl: './waiva-capabilities.scss'
})
export class WaivaCapabilities {

  public readonly capabilities = signal<ICapabilityBlock[]>([
    {
      title: 'Converse com inteligência e contexto real',
      description: 'Respostas consultivas, alinhadas ao seu produto, tom de voz e estratégia de vendas.',
      imageAlt: 'Representação de inteligência artificial conversando com contexto real',
      imageUrl: 'assets/img/001.webp' // LÓGICA: Caminho relativo que o Angular compila nativamente
    },
    {
      title: 'Interpreta mídias como um ser humano',
      description: 'Compreende áudios, vídeos e até figurinhas - e responde com naturalidade humana, sem delírios.',
      imageAlt: 'Representação de IA analisando áudios e vídeos',
      imageUrl: 'assets/img/002.webp'
    },
    {
      title: 'Agentes moldados para sua operação',
      description: 'Você define como qualificar, quando escalar e qual o perfil ideal. Ele executa com precisão e conhecimento da metodologia.',
      imageAlt: 'Painel ilustrativo de agentes de IA configuráveis',
      imageUrl: 'assets/img/003.webp'
    }
  ]);
}