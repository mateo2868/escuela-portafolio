import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Book, BoxIcon, DollarSignIcon, House, LayoutDashboardIcon, LayoutPanelTop, LucideAngularModule, LucideIconData, PanelBottomDashed, StoreIcon, TagIcon, UserIcon } from 'lucide-angular';
import { filter } from 'rxjs';
import { User } from '../../services/auth.service';

export interface NavbarOption {
  label: string;
  route: string;
  icon?: LucideIconData;
  isActive?: boolean;
}

interface SidebarItem {
  id: string;
  label: string;
  icon: LucideIconData;
}

@Component({
  selector: 'app-nav.component',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, LucideAngularModule ],

  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  showDropdown = false;
  navbarOptions: NavbarOption[] = [];
  activeSection: string = 'panel';
  LayoutDashboardIcon = LayoutDashboardIcon
  isCollapsed = false;
  user: User = { uid: "", nombre: '', email: '', rol: '' };
  currentUrl: string = '';

  NAVBAR_OPTIONS: Record<string, NavbarOption[]> = {
    estudiante: [
      { label: 'Ver perfil', route: '/nav/perfil', icon: UserIcon, isActive: false },
      { label: 'Cursos', route: '/nav/curso', icon: House, isActive: false },
    ],
    profesor: [
      { label: 'Ver perfil', route: '/nav/perfil', icon: PanelBottomDashed },
      { label: 'Cursos', route: '/nav/curso', icon: BoxIcon},
      { label: 'Estudiantes', route: '/nav/estudiantes', icon: DollarSignIcon},
    ],
    admin: [
      // { label: 'Dashboard', route: '/nav/admin', icon: LayoutPanelTop , isActive: false },
      // { label: 'Usuarios', route: '/admin/usuarios', icon: UserIcon , isActive: false },
      // { label: 'Comercios', route: '/admin/comercios', icon: StoreIcon , isActive: false },
      // { label: 'Tipos de producto', route: '/admin/tipos-producto', icon:  TagIcon, isActive: false  }
    ]
  };
  router = inject(Router);

  constructor() {
    this.setNavbarOptionsByRole();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        console.log('NavigationEnd event detected');
        this.updateActiveOption();
      });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }


  updateActiveOption() {
    this.currentUrl = this.router.url;
    this.navbarOptions = this.navbarOptions.map(opt => ({
      ...opt,
      isActive: this.currentUrl.startsWith(opt.route) // ✅ marca como activo
    }));
  }

  currrentURL(current: string) {
    return current.split('/')[2] || 'inicio';
  }


  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  irAPerfil() {
    this.router.navigate(['/panel/perfil']);
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);

  }
  setNavbarOptionsByRole() {
    const authData = localStorage.getItem('user');
    console.log('Auth Data from localStorage:', authData);
    if (authData) {
      try {
        this.user = authData ? JSON.parse(authData) : null;
        const parsed = JSON.parse(authData);
        let rol = parsed.rol;
        this.navbarOptions = this.NAVBAR_OPTIONS[rol] || [];
      } catch (e) {
        this.navbarOptions = [];
      }
    }
  }

}
