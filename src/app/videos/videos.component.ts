import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../shared/services/firebase.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {

  video_items: Array<any>;


  constructor(public firebaseService: FirebaseService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {

    //changed to above so that the site doesn't have live data. you have to
    //refresh the page to get new Global scores. Live data was cause
    //recent videos list to reload everytime globabl score changes
    this.firebaseService.getLatestBattles()
    .subscribe(result => {
      this.video_items = result;
    });
  }

// Blog Carousel Options
public blogCarousel: any = {
    loop: true,
    margin: 30,
    nav: false,
    items: 3,
    dots: false,
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        },
        1024: {
            items: 2
        },
        1200: {
            items: 3
        }
    }
};

}
