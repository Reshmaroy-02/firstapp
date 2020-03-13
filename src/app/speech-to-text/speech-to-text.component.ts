import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import recognizeMicrophone from 'watson-speech/speech-to-text/recognize-microphone';
@Component({
  selector: 'app-speech-to-text',
  templateUrl: './speech-to-text.component.html',
  styleUrls: ['./speech-to-text.component.css']
})
export class SpeechToTextComponent implements OnInit {
  
  sshow:boolean;
  constructor(private chatService: ChatService) { 
    this.sshow = false;
  }

  ngOnInit(): void {
  }
  convertToText()
  {
    this.chatService.TextConverter().subscribe(res=>{
       console.log(JSON.parse(JSON.stringify(res, null, 2)));
       
    this.sshow=true;
    });
  }

}
