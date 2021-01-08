import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CoreRoutingModule} from './core-routing.module';
import {ViewProfileComponent} from './components/view-profile/view-profile.component';
import {AngularFileUploaderModule} from 'angular-file-uploader';
import {ProfileTableComponent} from './components/view-profile/profile-table/profile-table.component';
import {ProfilePhotoCollectionComponent} from './components/view-profile/profile-photo-collection/profile-photo-collection.component';
import {SharedModule} from "../shared/shared.module";
import { PhotoOptionDirective } from './directives/photo-option.directive';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { ShowCommentsDirective } from './directives/show-comments.directive';
import {GaugeModule} from 'angular-gauge';
import {ViewFilesComponent} from "./components/view-files/view-files.component";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GroupsListComponent } from './components/dashboard/groups-list/groups-list.component';
import { LatestInfoComponent } from './components/dashboard/latest-info/latest-info.component';


@NgModule({
    declarations: [ViewProfileComponent, ProfileTableComponent, ProfilePhotoCollectionComponent, PhotoOptionDirective, ShowCommentsDirective, ViewFilesComponent, DashboardComponent, GroupsListComponent, LatestInfoComponent],
    imports: [
        CommonModule,
        CoreRoutingModule,
        AngularFileUploaderModule,
        SharedModule,
        InfiniteScrollModule,
        GaugeModule.forRoot(),
        FontAwesomeModule
    ]

})
export class CoreModule {
}
