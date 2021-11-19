import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import { ApiServiceService } from './api-service.service';

 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client-app';
  nextStep =  'Porer Dhap';
  messageSubscription: Subscription;
  imageFile: string;

  constructor(private api: ApiServiceService) {}

  ngOnInit() {
    // const messageUpdater = this.api.eventSource('http://localhost:3000/');
    // this.messageSubscription = messageUpdater.subscribe((data: string) => this.nextStep = data);
  }

  stop() {
    this.messageSubscription.unsubscribe();
  }

  fileChangeEvent(event: Event) {
    // const file: File = ((event.target as HTMLInputElement).files?.item(0) as File);
    const files: FileList = (event.target as HTMLInputElement).files as FileList;
    const formData = new FormData();

    for(let i = 0; i < files.length; i++) {
      formData.append('file' + i, files.item(i) as File)
    }

    /*const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = () => this.imageFile = reader.result as string;*/

    
    // formData.append('pic', file);
    // formData.append('name', '76.jpg');
    this.api.postFileAsForm('imagestream', formData).subscribe((res: any) => {
      console.log(res);
    });
  }

  send() {
    console.log('sending');
    this.api.postData('image', {image: this.imageFile}).subscribe((res: any) => {
      console.log(res);
    });
  }

}
