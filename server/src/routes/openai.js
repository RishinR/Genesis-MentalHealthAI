const axios = require("axios");
var express = require("express");
var router = express.Router();
const User = require(__dirname + '/../models/User');
const Psychologists = require(__dirname+'/../models/Psychologists');
const generateAIResponse = require("../utils/getOpenAi")

var condition;
var condRes;
var chatResponse;

// Define your OpenAI API endpoint and key
const openaiEndpoint = "https://ust-d3-2023-codered.openai.azure.com/";
const openaiApiKey = "0ec934c3a21249b48a23276a4c9b3c4c";
const url = "https://ust-d3-2023-codered.openai.azure.com/openai/deployments/UST-D3-2023-codered/chat/completions?api-version=2023-07-01-preview";
//`${openaiEndpoint}/v1/engines/UST-D3-2023-codered/completions`
// Define a route to handle the OpenAI request
router.post('/chat', async (req, res) => {
  const {email,message,city} = req.body;
  //const email = "harivhari2020@gmail.com"
  //const city = "Trivandrum"


  // connect to http://127.0.0.1:5000/findSentiment --> to know the statement status
  const sent_url = "http://127.0.0.1:5000/findSentiment"
  const cond_url = "http://127.0.0.1:5000/findCondition"
  //const message = "i have suicidal tendancy";
  let status;
  //let statRes;
  try {
    status = await axios.post(sent_url, {
      "message": message,
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    //console.log(status.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
  console.log(status.data);

  if (status.data == "True") {
    try {
      // connect to http://127.0.0.1:5000/findCondition --> to know the persons mental conditon
      condition = await axios.post(cond_url, {
        "message": message,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      //console.log(status.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    }
    condRes=condition.data.response;
    console.log(condRes);

    const user = await User.findOne({ email: email });
    if (!user) {
      console.log("User not found");
      res.status(404).json({ error: "User not found" });
      return;
    }

      const suicideChatCount = user.chat.filter(chatObj => chatObj.condition === condRes).length;
      console.log(suicideChatCount)

      if(suicideChatCount > 5) {
        const responseContent = await generateAIResponse(message, condRes, openaiApiKey, url);
        const psychologistsInCity= await Psychologists.find({ address: city });
        let resConcat = responseContent + " You can approach the following psychologists:\n";
    
        psychologistsInCity.forEach((psychologist) => {
          // Add psychologist's name, phone number, and email to the result string
          resConcat += `Name: ${psychologist.name}, Phone: ${psychologist.phno}, Email: ${psychologist.email}\n`;
        });
        chatResponse=resConcat
        //res.json(resConcat);
      }
      else{
        const responseContent = await generateAIResponse(message, condRes, openaiApiKey, url);
        chatResponse=responseContent
        //res.json(responseContent)
      }
  }
  else {
    condRes = "Normal"
    //const messagedef= message + `.if  ${message} doesn't contain any message related to mental health issue respond with 'you can only chat me as virtual companion.'.Do not answer the question if any there`
    const responseContent = await generateAIResponse(message, condRes, openaiApiKey, url);
    //const preventOther = "if "+ message + "doesn't contain any message related to mental health issue respond with 'you can only chat me as virtual companion'"
    chatResponse=responseContent;
  }
  console.log(chatResponse)
  const newChatMessage = {
    message: message,
    condition: condRes,
    response: chatResponse,
  };
  const user = await User.findOne({ email: email });
  if (!user) {
    console.log("User not found");
    res.status(404).json({ error: "User not found" });
    return;
  }
  user.chat.push(newChatMessage);
  await user.save();

  return res.json(chatResponse)
  
});

module.exports = router;

// const message1 = "i am addicted to drugs . i am alcoholic"
  // const condition1 = "addiction"

  // const concatenatedMessage = message1 + "and have the condition of" + condition1 + ". Response with me as friend. Do not reply with as an AI";

  // try {
  //   const response = await axios.post(
  //     url,
  //     {
  //       "messages": [
  //         {
  //           "role": "system",
  //           "content": concatenatedMessage
  //         }
  //       ],      
  //       "temperature": 0.7,      
  //       "top_p": 0.95,     
  //       "frequency_penalty": 0,      
  //       "presence_penalty": 0,      
  //       "max_tokens": 800,      
  //       "stop": null      
  //     },
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         "api-key": `${openaiApiKey}`,
  //       },
  //     }
  //   );

  //   const res_data=response.data
  //   //console.log(res_data['choices'][0]['message']['content'])

  //   res.json(res_data['choices'][0]['message']['content']);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ error: "An error occurred" });
  // }



    // const message1 = "i am addicted to drugs . i am alcoholic";
  // const condition1 = "addiction";

  // try {
  //   const responseContent = await generateAIResponse(message1, condition1, openaiApiKey, url);
  //   console.log(responseContent)
  //   res.json(responseContent);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ error: "An error occurred" });
  // }