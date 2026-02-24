import { Component, signal } from '@angular/core';
import { Header } from '@shared/components/header/header';
import {Hero} from "@shared/components/hero/hero";
import {WaivaOperations} from "@features/public/waiva-operations/waiva-operations";
import {WaivaCapabilities} from "@features/public/waiva-capabilities/waiva-capabilities";
import {WaivaComparison} from "@features/public/waiva-comparison/waiva-comparison";
import {WaivaPrice} from "@features/public/waiva-price/waiva-price";
import {WaivaFaqComponent} from "@features/public/waiva-faq/waiva-faq";
import {WaivaFooter} from "@features/public/waiva-footer/waiva-footer";
import {RouterOutlet} from "@angular/router";
import {WaivaWhatsapp} from "@features/public/waiva-whatsapp/waiva-whatsapp";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [Header, Hero, WaivaOperations, WaivaCapabilities, WaivaComparison, WaivaPrice, WaivaFaqComponent, WaivaFooter, RouterOutlet, WaivaWhatsapp],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class App {
    protected readonly title = signal('waiva-landing-page');
}
