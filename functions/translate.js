const superagent = require('superagent');
var apiurl="https://api.funtranslations.com/translate/irish.json"
exports.handler = function(context, event, callback) {
  const twiml = new Twilio.twiml.MessagingResponse();
  const message = twiml.message(); 
  const msgToTranslate = event.Body.toLowerCase().trim();
  superagent.get(`${apiurl}?text=${msgToTranslate}`) 
  //.set('X-Funtranslations-Api-Secret',context.FUNTRANSLATIONS_API_SECRET) // use this line to reference your API key from a paid Fun Translations plan if you have one
  .end((err, res) => {
    message.body(`"${msgToTranslate}" translates to "${res.body.contents.translated}" in Irish!🍀 Happy St. Patrick's Day!☘️`);
message.media("https://www.worldatlas.com/r/w1200/upload/b3/28/8f/happy-st-patricks-day-3946675-1920.png")
    callback(null, twiml);
  })
  };