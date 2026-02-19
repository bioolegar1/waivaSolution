import { Component, signal } from '@angular/core';
import {ICapabilityBlock} from "@core/capability.model";


@Component({
  selector: 'app-waiva-capabilities',
  standalone: true,
  imports: [], // Não precisa de CommonModule no Angular 21 para @for
  templateUrl: './waiva-capabilities.html',
  styleUrl: './waiva-capabilities.scss'
})
export class WaivaCapabilities {

  public readonly capabilities = signal<ICapabilityBlock[]>([
    {
      title: 'Converse com inteligência e contexto real',
      description: 'Respostas consultivas, alinhadas ao seu produto, tom de voz e estratégia de vendas.',
      imageAlt: 'Robot holding phone',
      imageGradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
    },
    {
      title: 'Interpreta mídias como um ser humano',
      description: 'Compreende áudios, vídeos e até figurinhas - e responde com naturalidade humana, sem delírios.',
      imageAlt: 'Chat interface showing audio messages',
      imageGradient: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)'
    },
    {
      title: 'Agentes moldados para sua operação',
      description: 'Você define como qualificar, quando escalar e qual o perfil ideal. Ele executa com precisão e conhecimento da metodologia.',
      imageAlt: 'Robot hand touching interface',
      imageGradient: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)'
    }
  ]);
}