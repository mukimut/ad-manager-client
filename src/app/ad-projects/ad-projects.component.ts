import { Component, OnInit } from '@angular/core';
import { ApiServiceService, CommonResponse } from '../api-service.service';

@Component({
  selector: 'app-ad-projects',
  templateUrl: './ad-projects.component.html',
  styleUrls: ['./ad-projects.component.css']
})
export class AdProjectsComponent implements OnInit {
  projects: string[];
  newProjectName: string;
  responseMessage: string;
  success: boolean;
  

  constructor(private api: ApiServiceService) {   }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.api.getData('filewrite/projects').subscribe((res: string[]) => this.projects = res);
  }

  addProject() {
    this.api.postData('filewrite/newProject', {name: this.newProjectName}).subscribe((res: CommonResponse) => {
      this.success = res.success;
      this.responseMessage = this.newProjectName + ' ' + res.message;
      if(res.success) {
        this.newProjectName = '';
        this.getProjects();
      }
    });
  }

  fileSelected(event: Event, projectName: string) {
    const formData = new FormData();
    const file: File = ((event.target as HTMLInputElement).files as FileList).item(0) as File;
    if(!file) return;
    formData.append('file', file);

    this.api.postData('filewrite/checkProject', {name: projectName}).subscribe((status: CheckProject) => {
      if(status.hasFiles) {
        console.log('Ad had existing file. Implement a check');
      }

      const link = 'filewrite/uploadzip/' + status.token;
      this.api.postFileAsForm(link, formData).subscribe((res) => {
        console.log(res);
      });
    });
  }

}

interface CheckProject {project: string, token: string, hasFiles: boolean}