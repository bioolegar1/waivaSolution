import { Component, signal } from '@angular/core';
import { IOperationBlock } from "@core/operation.model";

@Component({
  selector: 'app-waiva-operations',
  standalone: true,
  templateUrl: './waiva-operations.html',
  styleUrl: './waiva-operations.scss'
})
export class WaivaOperations {
  // Este é o nome que o HTML deve referenciar
  public readonly operationBlocks = signal<IOperationBlock[]>([
    {
      title: 'Mapeamento e Processos',
      description: 'Antes de aplicar qualquer tecnologia, a Waiva mapeia e redesenha os processos internos da operação.',
      subDescription: 'Identificamos gargalos, retrabalho e dependência excessiva de pessoas.',
      icon: 'bi bi-diagram-3-fill'
    },
    {
      title: 'Atendimento e Vendas',
      description: 'A Waiva implementa agentes de IA que assumem o primeiro contato com clientes e leads.',
      subDescription: 'Eles respondem imediatamente e fazem a triagem para vendas ou cobrança.',
      icon: 'bi bi-robot'
    },
    {
      title: 'Tempo Real 24/7',
      description: 'Opera sem parar, abordando leads no exato momento em que eles aparecem.',
      icon: 'bi bi-clock-history'
    },
    {
      title: 'Sem Riscos Trabalhistas',
      description: 'Sem contratos CLT, sem encargos, sem dor de cabeça com gestão de equipe.',
      icon: 'bi bi-shield-fill-check'
    }
  ]);
}