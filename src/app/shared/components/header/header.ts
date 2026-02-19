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
}
