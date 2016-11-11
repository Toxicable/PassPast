import { Component, ElementRef, Input } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'file-upload',
    template: '<input type="file" [attr.multiple]="multiple ? true : null" (change)="upload()" >'
})
export class FileUploadComponent {
    constructor(private http: Http,
                private el: ElementRef
    ) {}

    @Input() multiple: boolean = false;

    upload() {
        let inputEl = this.el.nativeElement.firstElementChild;
        if (inputEl.files.length == 0) return;

        let files :FileList = inputEl.files;
        const formData = new FormData();
        for(var i = 0; i < files.length; i++){
            formData.append(files[i].name, files[i]);
        }

        this.http
            .post('/api/test/fileupload', formData)
            .subscribe();

    }
}