import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CodeModel} from "@ngstack/code-editor";
import {ActivatedRoute} from "@angular/router";
import {CommonService} from "../services/common.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {
  @ViewChild("frame") frame:ElementRef = new ElementRef<any>("");
  theme = 'vs-dark';
  editorId:string = '';
  editorValue:string ="";
  loggedInUser: any = null;
  codeModel : CodeModel = {
    language: 'html',
    uri: 'main.html',
    value: '<!DOCTYPE html>\n' +
      '<html>\n' +
      '<head>\n' +
      '<!-- add css if required -->\n' +
      '\n' +
      '<style></style>\n' +
      '\n' +
      '<!-- add script if required -->\n' +
      '\n' +
      '<script></script>\n' +
      '\n' +
      '</head>\n' +
      '<body>\n' +
      '\n' +
      '</body>\n' +
      '</html>\n',
  };
  options = {
    contextmenu: true,
    minimap: {
      enabled: false
    },
    automaticLayout: true
  };
  showSave:any = null;
  showExport: any = null;
  exportForm: FormGroup;
  constructor(private ar: ActivatedRoute, private commonService: CommonService, private fb:FormBuilder) {
    this.loggedInUser = this.commonService.getAuthUser();
    this.ar.params.subscribe((data:any)=>{
      this.editorId = data.tempId;
      this.commonService.createTempEditorContentInStorage(this.editorId);

      const sessionData = this.commonService.getTempEditorContent(this.editorId);
      if (sessionData && sessionData.content) {
        this.codeModel.value = sessionData.content;
        setTimeout(()=>{
          this.action('run');
        },500);

      }
    })
    this.exportForm = this.fb.group({
      "name": ["", [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  // onCodeChanged(value:any) {
  //   console.log(value);
  //   this.editorValue = value;
  // }


  action(type: string) {
    switch (type) {
      case "run":
        const codeFrame = this.frame.nativeElement.contentWindow.document;
        codeFrame.open();
        codeFrame.write(this.codeModel.value);
        codeFrame.close();
        this.commonService.updateTempEditorContentInStorage(this.editorId, this.codeModel.value)
        break;
      case "save":
        if (this.commonService.getAuthUser()){
          this.loggedInUser = this.commonService.getAuthUser();
          this.toggleSave();
        } else {
          this.commonService.needLogin.emit(true);
        }
        break;
      case "export":
        this.toggleExport();
        break;
    }
  }

  ngOnDestroy(): void {
    this.commonService.removeTempEditorContent();
  }

  toggleSave() {
    this.showSave = (!this.showSave);
  }

  download() {
    if (this.codeModel.value && this.exportForm.valid) {

      var textToWrite = this.codeModel.value; //Your text input;
      var textFileAsBlob = new Blob([textToWrite], {type:'html'});
      var fileNameToSaveAs = this.exportForm.value.name+".html";

      var downloadLink = document.createElement("a");
      downloadLink.download = fileNameToSaveAs;
      downloadLink.innerHTML = "Download File";
      if (window['webkitURL'] != null)
      {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window['webkitURL'].createObjectURL(textFileAsBlob);
      }
      else
      {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        // downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
      }
      downloadLink.click();
    }
  }

  toggleExport() {
    this.showExport = (!this.showExport);
  }
}
