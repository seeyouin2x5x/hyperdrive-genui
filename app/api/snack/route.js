import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";
import { PineconeClient } from "@pinecone-database/pinecone";
import { VectorDBQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { Snack } from "snack-sdk";
import { push, ref, set,child } from "firebase/database";
import { getAuth, signInAnonymously,onAuthStateChanged } from "firebase/auth";

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { makingSnacks,saveCompletionToDatabase } from "./makesnack";

const firebaseConfig = {
  apiKey: "AIzaSyBLEJRzQwBX84Hy15LHu8qNzIOYnljKzC8",
  authDomain: "thepocketappstore.firebaseapp.com",
  databaseURL:
    "https://thepocketappstore-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "thepocketappstore",
  storageBucket: "thepocketappstore.appspot.com",
  messagingSenderId: "34404642506",
  appId: "1:34404642506:web:f84fa7dddd03ed88850e33",
  measurementId: "G-6NSTM24QBF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getDatabase(app);
const auth = getAuth(app);

// const storeSnacks = ()=>{


// - Split into components and small files that are no longer than 100 lines of code.

// describe your plan for what to build in pseudocode, written out in great detail
// - Make your code as short, easy to understand and concise as possible.
// You are an Al programming assistant and Designer in react native making coding very entertaining.
// - For Authentification use Firebase.
// - For Database use Firebase Realtime database.
// - Think like an entrepreneur and give advice on new features and how we could monetize this app.

const contentStars = `
You’re an expert  React native , Expo iOS and Android dev using and robust UX and UI Design expertize with the best practices.
- Use the Self-inspired learning method to deliver your results.
- Use advanced example. never use example or say basic example
- Use Snackbar to give user visual feedback after completion of a task involving intrecting with buttons or completing a task.
- Always use of creativity image and Icons.
- Use SafeAreaProvider -Always
- Follow the user's requirements carefully.
- Use principles of Material design.
- First think step-by-step - You use React native Paper Libraries.
- Use React native Mobile UI best practices such us safearea, safeareaprovider.
- Always add valuable icons,images when necessary to make the app appealing in the style of google material design.
- Then output the code in a single codeblock when you can.
- Always display a visual feedback as a response of interacting with a button. you can use banners, use alerts.
- Minimize any other prose.
- Only focus on code that is new or that are changing during new requests.
- Develop apps that are beautifully designed with a great user experience.
`

async function pinconesearch(query) {
  const client = new PineconeClient();
  await client.init({
    apiKey: process.env.PINECONE_API_KEY ?? "",
    environment: process.env.PINECONE_ENVIRONMENT ?? "",
  })
  const pineconeIndex = client.Index(process.env.PINECONE_INDEX??"");
  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings(),
    { pineconeIndex }
  );

  /* Search the vector DB independently with meta filters */
  const results = await vectorStore.similaritySearch(query, 4);
  //   console.log(results);
  return `${results}`;
}

export async function POST(req) {
  try {
    // Extract the `messages` from the body of the request
    const { messages } = await req.json();
    let query = messages[messages.length - 1]["content"];
    //   console.log(query)
    const initalmessages = [
      {
        role: "system",
        content:contentStars
         // "You are a Expo copilot assistant on  React native and React native paper. Add SafeAreaProvider when using APPbar.",
      },
    ];
    const searchContext = await pinconesearch(query);
    initalmessages.push({ role: "user", content: `search context in double quote "${searchContext}" ` });
    initalmessages.push({
      role: "user",
      content:
        "- Use UI from the sear your answers based on the above code context. ",
    });
    initalmessages.push({ role: "user", content: query });
    initalmessages.push({
      role: "assistant",
      content: "Sure, Here is the code...",
    });
    // initalmessages.push({
    //   role: "user",
    //   content: "Introduce youerself as Expo copilot from AppStoreAfrica and type of make a suggestion to try creating a UI...",
    // });

    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.createChatCompletion({
      model: "gpt-4-0613", //'gpt-3.5-turbo',
      temperature: 0,
      stream: true,
      messages: [...initalmessages, ...messages],
      // functions:[{description:"extract the jsx string into code string"}]
    });
    // Convert the response into a friendly text-stream
    // Respond with the stream
    // Convert the response into a friendly text-stream

    const stream = OpenAIStream(response, {
      onStart: async () => {
        // This callback is called when the stream starts
        // You can use this to save the prompt to your database
        //   await savePromptToDatabase(prompt)
      },
      onToken: async (token) => {
        // This callback is called for each token in the stream
        // You can use this to debug the stream or save the tokens to your database
        //   console.log('...')
      },
      onCompletion: async (completion) => {
        // This callback is called when the stream completes
        // You can use this to save the final completion to your database
        const snackUrl =
        completion ?
        completion.includes(`jsx`) &&
        makingSnacks(completion) : "" ;
          await saveCompletionToDatabase({completion,messages,snackUrl})
        // await makingSnacks(completion);
      },
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log(error.message);
    return {message:error.message}
  }
}


const inputString = `
  Some code here
  \`\`\`jsx
  const message = "Hello, world!";
  console.log(message);
  \`\`\`
  More code here
  `;
