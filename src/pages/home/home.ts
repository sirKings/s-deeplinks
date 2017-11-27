import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModelProvider } from '../../providers/model/model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  received_deeplink_payload: string;

  deeplink_url: string;

  branchUniversalObj = null;

  properties = {
      canonicalIdentifier: '',
      canonicalUrl: 'alexapp.app.link',
      
  }
  form: FormGroup;


  constructor(public navCtrl: NavController, private fB: FormBuilder, private model: ModelProvider) {
    //get the recieved payload
    this.model.recievedLink.subscribe(res => {
      this.received_deeplink_payload = res;
      console.log(this.received_deeplink_payload)
    })

    this.form = fB.group({
      deeplink_payload_to_share: ['', Validators.compose([Validators.required])],
    })
           
  }

  share() {
    console.log("# Deeplink payload to share: " + this.form.value.deeplink_payload_to_share) 

   // optional fields
    var analytics = {
      channel: 'facebook',
      feature: 'onboarding',
      campaign: 'content 123 launch',
      stage: 'new user',
      tags: ['one', 'two', 'three']
    }

    // optional fields
    var properties = {
      $desktop_url: 'http://www.example.com/desktop',
      custom_string: 'data',
      $deeplink_path: this.form.value.deeplink_payload_to_share,
      custom_integer: Date.now(),
      custom_boolean: true,
      custom_array: [1, 2, 3, 4, 5],
      custom_object: { 'random': 'dictionary' }
    }

    var message = 'Check out this link';

    this.make_deeplink_url(this.form.value.deeplink_payload_to_share).then(res => {
        console.log("# Deeplink URL: " + this.deeplink_url);
        this.branchUniversalObj.showShareSheet(analytics, properties, message)
    })
      
  }

  make_deeplink_url(payload: string) {
    /// XXX full implementation is expected to produce proper URL
    this.properties.canonicalIdentifier = payload;
    // create a branchUniversalObj variable to reference with other Branch methods
    return this.createUniversalObj().then(res =>{
      this.generateUrl(res, payload).then(res => {
        this.deeplink_url = res;
        return res
      })
    })
    
  }

 
  createUniversalObj(){
    const Branch = window['Branch'];

    return Branch.createBranchUniversalObject(this.properties).then( (res) => {
      this.branchUniversalObj = res;
      return res
    }).catch(function (err) {
      console.log(err)
    })
  }

  generateUrl(res, payload){
    //optional fields
    var analytics = {
      channel: 'facebook',
      feature: 'onboarding',
      campaign: 'content 123 launch',
      stage: 'new user',
      tags: ['one', 'two', 'three']
    }

    // optional fields, properties you desire to find on the link
    var branchproperties = {
      $desktop_url: 'http://www.example.com/desktop',
      $android_url: 'http://www.example.com/android',
      $ios_url: 'http://www.example.com/ios',
      $ipad_url: 'http://www.example.com/ipad',
      $deeplink_path: payload,
      $match_duration: 2000,
      custom_string: 'data',
      custom_integer: Date.now(),
      custom_boolean: true,
      custom_array: [1, 2, 3, 4, 5],
      custom_object: { 'random': 'dictionary' }
    }

    return res.generateShortUrl(analytics, branchproperties).then(function (res) {
      //alert('Response: ' + JSON.stringify(res.url))
      return res.url;
    }).catch(function (err) {
      //alert('Error: ' + JSON.stringify(err))
      return err
    })
  }
}
