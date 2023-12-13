import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';

import { NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MenuController, Platform } from '@ionic/angular';
import {
  menuController,
  AnimationBuilder,
  createAnimation,
  MenuI,
  Animation,
} from '@ionic/core';
import { Observable, Subscription, filter } from 'rxjs';
import { DrawerScreen } from '../types/drawer';

/*
 took it from main code and added my animations
 "https://github.com/ionic-team/ionic-framework/blob/main/core/src/utils/menu-controller/animations/reveal.ts"
*/
export const revealAnimation: AnimationBuilder = (
  menu: MenuI,
  anims: Animation[]
) => {
  const openedX = menu.width * (menu.isEndSide ? -1 : 1) + 'px';
  const contentOpen = createAnimation()
    .addElement(menu.contentEl!)
    .fromTo('transform', 'translateX(0px)', `translateX(${openedX})`);

  return createAnimation()
    .duration(400)
    .addAnimation(contentOpen)
    .addAnimation(anims);
};

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.page.html',
  styleUrls: ['./drawer.page.scss'],
})
export class DrawerPage implements AfterViewInit {
  @ViewChild('userAvatar', { read: ElementRef })
  userAvatarRef?: ElementRef;
  @ViewChild('menuIcon', { read: ElementRef })
  menuIconRef?: ElementRef;
  @ViewChildren('drawerItemList', { read: ElementRef })
  drawerItemListRef?: QueryList<ElementRef>;

  appPages: DrawerScreen[] = [
    { name: 'Home', icon: 'home', url: '/menu/home' },
    {
      name: 'Reservation',
      icon: 'book',
      isAsset: true,
      url: '/menu/Reservation',
    },
    { name: 'Feedback', icon: 'help', url: '/menu/feedback' },
    //{ name: 'Invite Friend', icon: 'group', url: '/menu/invite-friend' },
    { name: 'arabsoft', icon: 'share', url: undefined },
    { name: 'A propos', icon: 'info', url: '/menu/a-propos' },
  ];
  drawerWidth: number = 280;
  rowWidth: number = this.drawerWidth - 64;
  activeTab = 'Home';
  isSplitPane = false; // hide menu button if split pane is enabled (desktop, pad etc.)
  routeChangeEvent?: Subscription;
  logout() {

    this.router.navigate(['']); // Navigate to the login page or any other desired page
  }
  ResidentApiUrl = '';
  constructor(
    private router: Router,
    public platform: Platform,
    private menu: MenuController,
    private http: HttpClient
  ) {



    this.ResidentApiUrl = 'http://192.168.3.8:3013/hotel/countRack';

  }
  userData = {
    imgHotel :'',
    nomhotel:''
  }
  ngOnInit() {
    this.readAPI(this.ResidentApiUrl)
      .subscribe((data) => {
        this.userData.imgHotel = data.imgHotel;
        this.userData.nomhotel = data.nomhotel;


      });
  }
  readAPI(URL: string) {
    return this.http.get<any>(URL);
  }

  ngAfterViewInit() {
    this.initDrawerAnimation();
  }

  ionViewDidEnter() {
    // Listen to screen changes and update 'activeTab', so that it's always in sync when we navigate on browser
    const routerEvent = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ) as Observable<NavigationEnd>;

    this.routeChangeEvent = routerEvent.subscribe((event) => {
      for (let i = 0; i < this.appPages.length; i++) {
        if (event.url === this.appPages[i].url) {
          this.activeTab = this.appPages[i].name;
        }
      }
    });
  }

  ionViewWillLeave() {
    this.routeChangeEvent?.unsubscribe();
  }



  initDrawerAnimation() {
    // Avatar animation
    const avatarAnim = createAnimation()
      .addElement(this.userAvatarRef?.nativeElement)
      // .easing('cubic-bezier(0.4, 0.0, 0.2, 1.0)')
      .fromTo('transform', 'rotate(36deg) scale(0.8)', 'rotate(0deg) scale(1)');

    // Drawer Items active background
    const drawerItems: Animation[] = [];
    const itemRefArray = this.drawerItemListRef?.toArray();
    for (const itemRef of itemRefArray!) {
      const element = itemRef.nativeElement;
      const drawerItemAnim = createAnimation()
        .addElement(element.querySelector('.drawerInnerItem'))
        .fromTo(
          'transform',
          `translateX(-${this.rowWidth}px)`,
          'translateX(0px)'
        );
      drawerItems.push(drawerItemAnim);
    }


    const menuElement = this.menuIconRef?.nativeElement;

    const iconAnim = createAnimation()
      .addElement(menuElement.querySelector('.menu__icon'))
      .fromTo(
        'transform',
        'translate(-50%, -50%)',
        'rotate(180.01deg) translate(50%, 50%)'
      );

    const line1Anim = createAnimation()
      .addElement(menuElement.querySelector('.menu__line--1'))
      .fromTo(
        'transform',
        'translate3d(0px, 0px, 0) rotate(0deg) scaleX(1.0)',
        'translate3d(6px, 2px, 0) rotate(45deg) scaleX(0.65)'
      );

    const line3Anim = createAnimation()
      .addElement(menuElement.querySelector('.menu__line--3'))
      .fromTo(
        'transform',
        'translate3d(0px, 0px, 0) rotate(0deg) scaleX(1.0)',
        'translate3d(6px, -2px, 0) rotate(-45deg) scaleX(0.65)'
      );
    const menuIconAnim = createAnimation()
      .addElement(menuElement)
      .fromTo(
        'transform',
        'translateX(0px)',
        `translateX(${this.drawerWidth}px)`
      )
      .addAnimation(iconAnim)
      .addAnimation(line1Anim)
      .addAnimation(line3Anim);

    menuController.registerAnimation('my-reveal', (menu: MenuI) =>
      revealAnimation(menu, [avatarAnim, ...drawerItems, menuIconAnim])
    );
  }

  onDrawerNavigate(page: DrawerScreen) {
    if (page.url) {
      this.activeTab = page.name;
    }
  }

  onMenuClick() {
    this.menu.toggle('main-menu');
  }
}
