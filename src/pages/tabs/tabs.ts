import { Component } from '@angular/core';


import { ProfilePage } from '../profile/profile';
import { Top3Page } from '../top3/top3';
import { ListPage } from '../list/list';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ListPage;
  tab2Root = Top3Page;
  tab3Root = ProfilePage;

  constructor() {
    
  }

}
