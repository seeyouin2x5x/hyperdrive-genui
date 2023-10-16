import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";
import { PineconeClient } from "@pinecone-database/pinecone";
import { VectorDBQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
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



function extractJSXCodeBlocks(inputString) {
  const regex = /```jsx([\s\S]*?)```/g;
  const matches = inputString.match(regex);
  const extractedCodeBlocks = [];

  if (matches) {
    for (const match of matches) {
      const extractedCode = match.replace("```jsx", "").replace("```", "");
      extractedCodeBlocks.push(extractedCode);
    }
  }

  return extractedCodeBlocks;
}


export const  makingSnacks =  (completion) => {
  const extractedCodeBlocks = extractJSXCodeBlocks(completion);
  for (const codeBlock of extractedCodeBlocks) {
    // console.log("Extracted Code:");
    // console.log(codeBlock);
  }
  const content = extractedCodeBlocks.toString()
  // console.log(content);
  // Create Snack

  const files = {
    "App.js": {
      type: "CODE",
      contents: `
${content}
`,
    },
  }
  const url = `https://snack.expo.dev?files=${encodeURIComponent(JSON.stringify(files))}&dependencies=react-native-paper%405.10.3,react-native-safe-area-context%40*,@expo/vector-icons%40*`;
  return  url

};

export const saveCompletionToDatabase = ({completion,messages,snackUrl})=>{

  // User is signed out
  // ...
  push(child(ref(db, 'promptsxxMcKnapp_17'),"dontknow"), {
    completion,
    snackUrl,
    messages
  });

}


export const authenticate = ()=>{
return onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    return uid
    // ...
  } else {
    // User is signed out
    // ...
  return   signInAnonymously(auth)
.then(() => {
  const userID = auth.currentUser?.uid
  return userID
  // Signed in..
})
  }
});
}

