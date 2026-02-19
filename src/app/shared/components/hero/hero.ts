import { Component, inject, signal, OnInit, OnDestroy, viewChild, ElementRef } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { LeadService } from "@core/services/lead.service";

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, FormsModule],
    templateUrl: './hero.html',
    styleUrl: './hero.scss',
})
export class Hero implements OnInit, OnDestroy {
    private fb = inject(FormBuilder);
    private leadService = inject(LeadService);

    // Referência reativa para o primeiro input do formulário
    nameInput = viewChild<ElementRef>('nameInput');

    phrases = ['aumentar eficiência.', 'evitar perdas.', 'dar previsibilidade.', 'ganhar escala.'];
    activePhraseIndex = signal(0);
    private rotationInterval: any;

    leadForm = this.fb.group({
        nome: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        contato: ['', [Validators.required, Validators.minLength(14)]]
    });

    ngOnInit() {
        // Inicia a rotação do texto lateral
        this.rotationInterval = setInterval(() => {
            this.activePhraseIndex.update(i => (i + 1) % this.phrases.length);
        }, 3000);

        // Aplica o foco automático após a renderização inicial
        setTimeout(() => {
            this.nameInput()?.nativeElement.focus();
        }, 500);
    }

    ngOnDestroy() {
        if (this.rotationInterval) clearInterval(this.rotationInterval);
    }

    onPhoneInput(event: any) {
        const input = event.target;
        let value = input.value.replace(/\D/g, '');
        if (value.length > 11) value = value.substring(0, 11);

        if (value.length > 0) value = '(' + value;
        if (value.length > 3) value = value.substring(0, 3) + ') ' + value.substring(3);
        if (value.length > 10) value = value.substring(0, 10) + '-' + value.substring(10);

        this.leadForm.patchValue({contato: value});
    }

    onSubmit() {
        if (this.leadForm.valid) {
            const rawData = {...this.leadForm.value};
            rawData.contato = rawData.contato?.replace(/\D/g, '');

            // ADICIONE ESTA LINHA PARA TESTE [cite: 2025-12-08]
            console.log('Dados saindo do Angular:', rawData);

            this.leadService.sendLead(rawData).subscribe({
                next: () => {
                    alert('Enviado!');
                    this.leadForm.reset();
                },
                error: (err) => console.error('Erro:', err)
            });
        }
    }
}