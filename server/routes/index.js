var express = require('express');
var router = express.Router();
const AssistantV2 = require('ibm-watson/assistant/v2');
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3')
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const { IamAuthenticator } = require('ibm-watson/auth');


/********* Creating Watson Assistant Object ********** */
const assistant = new AssistantV2({
    version: '2020-02-05',
    authenticator: new IamAuthenticator({
      apikey: 'SORjAzVcZWhgOjQsg5EXHOPNn8QZk3UImpWyKa66HN0d',
    }),
    url: 'https://api.eu-gb.assistant.watson.cloud.ibm.com',
});


/********* Creating Tone Analyzer Object ************** */
const toneAnalyzer = new ToneAnalyzerV3({
  version: '2017-09-21',
  authenticator: new IamAuthenticator({
    apikey: 'kCTcGCAjVQ3spAxhhT0Eo2Ok020QLY_KUUtVBst7YFjC',
  }),
  url: 'https://api.eu-gb.tone-analyzer.watson.cloud.ibm.com',
});

/********* Creating Speech to Text Object ************** */
const speechToText = new SpeechToTextV1({
    authenticator: new IamAuthenticator({
      apikey: 'wpc7pMrUD5wiQlu0_d_cEZqDoklEiJS7l32UQ6LIskMu',
    }),
    url: 'https://api.eu-gb.assistant.watson.cloud.ibm.com/instances/50dcd796-c4a3-4ca9-93a5-76181c02fd2c',
  });


  router.post('/CreateSession', (req, resp, next)=>{

    //console.log(req.body);
    assistant.createSession({
        //assistantId: 'b4e71061-5863-485b-ab88-bf0358627cfa'
        assistantId: req.body.assistant_id
      })
        .then(res => {
          console.log(JSON.stringify(res, null, 2));
          resp.send(res);
        })
        .catch(err => {
          console.log(err);
        });
});

router.post('/AskWatson', (req, resp, next)=>{
    console.log("Send chat and post called with Input:" , req.body);
    assistant.message({
        assistantId: req.body.assistant_id,
        sessionId: req.body.session_id,
        input: {
          'message_type': 'text',
          'text': req.body.question
          }
        })
        .then(res => {
          //console.log(JSON.stringify(res, null, 2));
          resp.send(res)
        })
        .catch(err => {
          console.log(err);
        });
});

router.post('/AnalyzeTone',(req, res, next)=>{
  console.log({utterances:req.body});
  toneAnalyzer.toneChat({utterances:req.body})
  .then(utteranceAnalyses => {
    res.send(utteranceAnalyses)
  })
  .catch(err => {
    console.log('error:', err);
  });
});

router.post('/SpeechToText',(req, res, next)=>{
  console.log("Watson is listening...You can talk now")
const params = {
  audio: fs.createReadStream('./src/app/assets/audio/female.wav'),
  contentType: 'audio/wav; rate=44100',
  speech_detector_sensitivity: '0.6',
  background_audio_suppression: '0.5',
  // TransferEncoding: 'chuncked',
  // headers: {
  //   'Transfer-Encoding-': 'chuncked'
  // },
  inactivity_timeout:'30'
}
speechToText.recognize(params)
  .then(response => {
        res.send(response);
  })
  .catch(err => {
    console.log(err);
  }); 
// or streaming
// fs.createReadStream('./resources/speech.wav')
//   .pipe(speechToText.recognizeUsingWebSocket({ contentType: 'audio/l16; rate=44100' }))
//   .pipe(fs.createWriteStream('./transcription.txt'));
});

module.exports = router;