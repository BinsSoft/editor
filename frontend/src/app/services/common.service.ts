import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  needLogin:EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  public generateTempEditorId(length=20) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  createTempEditorContentInStorage(itemId:string) {
    if (!this.getTempEditorContent(itemId)) {
      sessionStorage.setItem("_i", JSON.stringify({id: itemId, content: ""}));
    }
  }

  updateTempEditorContentInStorage(itemId:string, value: string) {
    sessionStorage.setItem("_i", JSON.stringify({id:itemId, content:value}));
  }
  getTempEditorContent(itemId:string) {
     var item = sessionStorage.getItem("_i");
     if (item) {
       return JSON.parse(item);
     }
     return null;
  }

  removeTempEditorContent() {
    sessionStorage.removeItem("_i");
  }
}
