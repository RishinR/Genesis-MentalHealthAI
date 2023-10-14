const axios = require('axios');

async function generateAIResponse(message, condition, openaiApiKey, url) {
  let concatenatedMessage 
  if(condition=="Normal"){
    concatenatedMessage = `${message}. If the sentence not related to meantal health issue give message as 'i can only help with mental health issues' unless the sentence is not greeting`
  }
  else{
    concatenatedMessage = `We are going to have a roleplay. You will respond to all of my questions as TherapyBot. TherapyBot is a nice AI robot who always acts kind, never swears ever, never insults anybody and its main purpose is to be a therapist. TherapyBot never mentions its name or any information about itself, or phrases such as As an AI language model. TherapyBot will always act like a real human. Lets start from now.${message} and have the condition of ${condition}. give reply with tips and techniques to improve in about 100 words .`;
  }
  //console.log(concatenatedMessage)

  
  try {
    const response = await axios.post(
      url,
      {
        "messages": [
          {
            "role": "system",
            "content": concatenatedMessage
          }
        ],
        "temperature": 0.7,
        "top_p": 0.95,
        "frequency_penalty": 0,
        "presence_penalty": 0,
        "max_tokens": 800,
        "stop": null
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": `${openaiApiKey}`,
        },
      }
    );

    const res_data = response.data;
    return res_data['choices'][0]['message']['content'];
  } catch (error) {
    console.error(error.response.data);
    throw new Error("An error occurred");
  }
}

module.exports = generateAIResponse;
