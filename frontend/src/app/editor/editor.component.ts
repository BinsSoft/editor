import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CodeModel} from "@ngstack/code-editor";
import {ActivatedRoute} from "@angular/router";
import {CommonService} from "../services/common.service";

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
  constructor(private ar: ActivatedRoute, private commonService: CommonService) {
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
        this.toggleSave();
        // this.commonService.needLogin.emit(true);
        break;
    }
  }

  ngOnDestroy(): void {
    this.commonService.removeTempEditorContent();
  }

  toggleSave() {
    this.showSave = (!this.showSave);
  }
}
