import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  received_deeplink_payload: string;
  deeplink_payload_to_share: string;
  deeplink_url: string;

  constructor(public navCtrl: NavController) {
    this.received_deeplink_payload = this.get_deeplink_payload();
    console.log("# Received Deeplink payload: " + this.received_deeplink_payload)        
  }

  share() {
    console.log("# Deeplink payload to share: " + this.deeplink_payload_to_share)    
    this.deeplink_url = this.make_deeplink_url(this.deeplink_payload_to_share);
    console.log("# Deeplink URL: " + this.deeplink_url);  
  }

  make_deeplink_url(payload: string) {
    /// XXX full implementation is expected to produce proper URL
    return "https://dummy/?payload=" + payload;
  }

  get_deeplink_payload() {
    // XXX full implementation is expected to retrieve deeplink payload and return it
    return "dummy payload";
  }
}
