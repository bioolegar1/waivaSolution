import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LeadService {
    private http = inject(HttpClient);

    // Certifique-se de que esta URL é a da ÚLTIMA implementação (Versão mais recente)
    private readonly GOOGLE_URL = 'https://script.google.com/macros/s/AKfycbwJqu00u0YSFDxROV9YM6_Ixcdsho0qgTIhoV_1iov_L8ZvHQ9txiuwMAu-38M18VGA/exec';

    sendLead(data: any) {
        // O Content-Type 'text/plain' é essencial para evitar bloqueios de CORS no Apps Script
        const headers = new HttpHeaders({ 'Content-Type': 'text/plain;charset=utf-8' });

        return this.http.post(this.GOOGLE_URL, JSON.stringify(data), {
            headers,
            responseType: 'text'
        });
    }
}