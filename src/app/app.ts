import { Component, signal } from '@angular/core';
import { Header } from '@shared/components/header/header';
import {Hero} from "@shared/components/hero/hero";
import {WaivaOperations} from "@features/public/waiva-operations/waiva-operations";
import {WaivaCapabilities} from "@features/public/waiva-capabilities/waiva-capabilities";
import {WaivaComparison} from "@features/public/waiva-comparison/waiva-comparison";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [Header, Hero, WaivaOperations, WaivaCapabilities, WaivaComparison],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class App {
    protected readonly title = signal('waiva-landing-page');
}
