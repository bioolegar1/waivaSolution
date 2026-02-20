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

    nameInput = viewChild<ElementRef>('nameInput');

    phrases = ['aumentar eficiência.', 'evitar perdas.', 'dar previsibilidade.', 'ganhar escala.'];
    activePhraseIndex = signal(0);
    private rotationInterval: any;

    isSubmitting = signal(false);
    submissionSuccess = signal(false);
    uploadProgress = signal(0);
    private progressInterval: any;

    // Definição do tempo de Rate Limit no Frontend (5 minutos em milissegundos)
    private readonly RATE_LIMIT_MS = 5 * 60 * 1000;

    leadForm = this.fb.group({
        nome: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        contato: ['', [Validators.required, Validators.minLength(14)]]
    });

    ngOnInit() {
        this.rotationInterval = setInterval(() => {
            this.activePhraseIndex.update(i => (i + 1) % this.phrases.length);
        }, 3000);

        setTimeout(() => {
            this.nameInput()?.nativeElement.focus();
        }, 500);
    }

    ngOnDestroy() {
        if (this.rotationInterval) clearInterval(this.rotationInterval);
        if (this.progressInterval) clearInterval(this.progressInterval);
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

    // Função que verifica o bloqueio no navegador
    private checkRateLimit(): boolean {
        const lastSubmission = localStorage.getItem('waiva_last_submission');
        if (lastSubmission) {
            const timePassed = Date.now() - parseInt(lastSubmission, 10);
            if (timePassed < this.RATE_LIMIT_MS) {
                const minutesLeft = Math.ceil((this.RATE_LIMIT_MS - timePassed) / 60000);
                alert(`Por favor, aguarde ${minutesLeft} minuto(s) antes de enviar uma nova solicitação.`);
                return false;
            }
        }
        return true;
    }

    onSubmit() {
        // Antes de processar, verifica a trava do frontend
        if (!this.checkRateLimit()) {
            return;
        }

        if (this.leadForm.valid && !this.isSubmitting()) {

            this.isSubmitting.set(true);
            this.leadForm.disable();
            this.uploadProgress.set(0);

            this.progressInterval = setInterval(() => {
                this.uploadProgress.update(val => {
                    if (val >= 90) {
                        clearInterval(this.progressInterval);
                        return 90;
                    }
                    return val + 5;
                });
            }, 100);

            const rawData = {...this.leadForm.value};
            rawData.contato = rawData.contato?.replace(/\D/g, '');

            this.leadService.sendLead(rawData).subscribe({
                next: (response: any) => {
                    clearInterval(this.progressInterval);
                    this.uploadProgress.set(100);

                    // Verifica se o Apps Script barrou a requisição pelo backend
                    if (response && response.includes('"rateLimited":true')) {
                        setTimeout(() => {
                            this.isSubmitting.set(false);
                            this.leadForm.enable();
                            this.uploadProgress.set(0);
                            alert('Limite de envios atingido para este e-mail. Tente novamente mais tarde.');
                        }, 400);
                        return;
                    }

                    // Se foi sucesso total, registra a hora no localStorage
                    localStorage.setItem('waiva_last_submission', Date.now().toString());

                    setTimeout(() => {
                        this.isSubmitting.set(false);
                        this.submissionSuccess.set(true);
                    }, 400);
                },
                error: (err) => {
                    console.error('Erro:', err);
                    clearInterval(this.progressInterval);
                    this.uploadProgress.set(0);
                    this.isSubmitting.set(false);
                    this.leadForm.enable();
                }
            });
        }
    }

    resetFormState() {
        this.leadForm.reset();
        this.leadForm.enable();
        this.submissionSuccess.set(false);
        this.uploadProgress.set(0);

        setTimeout(() => {
            this.nameInput()?.nativeElement.focus();
        }, 100);
    }
}