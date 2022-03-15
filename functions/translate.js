const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
exports.handler = async function(context, event, callback) {
  const twiml = new Twilio.twiml.MessagingResponse();
  const message = twiml.message(); 
  const msgToTranslate = event.Body.toLowerCase().trim();
const languageTranslator = new LanguageTranslatorV3({
    version: '2018-05-01',
    authenticator: new IamAuthenticator({
      apikey: context.WATSON_KEY,
    }),
    serviceUrl: 'https://api.us-south.language-translator.watson.cloud.ibm.com/instances/b332e9a7-0fe7-41b2-ba6e-5bcabe16992c',
  });
  const translateParams = {
    text: msgToTranslate,
    modelId: 'en-ga',
  };
  
  languageTranslator.translate(translateParams)
    .then(translationResult => {
      message.body(`${msgToTranslate} to Gaelic is: ${translationResult.result.translations[0].translation}`);
      message.media("https://www.worldatlas.com/r/w1200/upload/b3/28/8f/happy-st-patricks-day-3946675-1920.png");
      callback(null, twiml);
    })
    .catch(err => {
      console.log('error:', err);
      message.body(err);
      callback(null, twiml);
    });
  };