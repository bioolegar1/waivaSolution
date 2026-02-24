import {Component, HostListener, signal} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-header',
    standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

    //signal para controlar o menu mobile
    mobileMenuOpen = signal(false);

    isScrolled = signal(false);

    menuItems = [
        {label: 'Home', link: '#home'},
        {label: 'Como Funciona', link: '#como-funciona'},
        {label: 'Diferenciais', link: '#diferenciais'},
        {label: 'FAQ', link: '#faq'}
    ];

    //Detecta scroll para dicionar a classe no header
    @HostListener('window:scroll', [])
    onWindowScroll() {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        this.isScrolled.set(scrollPosition > 50);
    }

    //Toggle menu mobile
    toggleMobileMenu(){
        this.mobileMenuOpen.update(value => !value);

        //Previne scroll do body menu está aberto
        if(this.mobileMenuOpen()){
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }

    closeMobileMenu(){
        this.mobileMenuOpen.set(false);
        document.body.classList.remove('no-scroll');
    }

    scrollToSection(event: Event, link: string){
        event.preventDefault();

        const element = document.querySelector(link);
        if(element){
            const headerHeight = 80; //altura do header
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerHeight;

            window.scrollTo({top: offsetPosition, behavior: 'smooth'});
        }
        this.closeMobileMenu();
    }

    // LÓGICA DE OFUSCAÇÃO:
    // Dividimos o número em partes para que bots que procuram sequências de 11 a 13 dígitos
    // não consigam encontrar o número no código final compilado.
    private countryCode = '55';
    private areaCode = '71';
    private numberPart1 = '99649';
    private numberPart2 = '1586';

    public openWhatsAppSecurely(event: Event): void {
        // Evita qualquer comportamento padrão do navegador
        event.preventDefault();

        // Remonta o número apenas no milissegundo em que o usuário real clica
        const fullNumber = `${this.countryCode}${this.areaCode}${this.numberPart1}${this.numberPart2}`;
        const message = 'Olá! Gostaria de falar com um especialista da Waiva.';

        // Constrói a URL final
        const url = `https://wa.me/${fullNumber}?text=${encodeURIComponent(message)}`;

        // window.open atua como o target="_blank" e o 'noopener,noreferrer' garante a segurança da aba
        window.open(url, '_blank', 'noopener,noreferrer');
    }
}
