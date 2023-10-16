"use client";
import React from "react";
import { useChat } from "ai/react";
import { authenticate, makingSnacks } from "./api/snack/makesnack";

export default function Chat() {
  const [snackUrl, setSnackUrl] = React.useState("");
  const [snackUrls, setSnackUrls] = React.useState([]);
  const [mgs, setMessages] = React.useState([]);

  const [history, setHistory] = React.useState([]);

  React.useEffect(() => {
    function history() {
      setHistory((prev) => {
        return [
          prev,
          ...messages.filter((item, index) => item.role === "user"),
        ];
      });
    }
    history();
  }, [history]);

  React.useEffect(() => {
    function firstAuth() {
      authenticate();
    }
    firstAuth();
  }, []);

  function replaceCodeBlocks(inputParagraph, replacement) {
    const regex = /```js([\s\S]*?)```/g;
    const replacedParagraph = inputParagraph.replace(regex, replacement);
    return replacedParagraph;
  }
  function cleartextArea() {
    // #TODO
    return null;
  }

  const { messages, input, handleInputChange, handleSubmit,setInput } = useChat({
    api: "api/snack/",
    initialMessages: [
      {
        role: "assistant",
        content: `Shipt! Same day Delivery apps for mobile and web using Generative UI and React Native for devs, hackathons and prototypes.        
         How can I assist you with UX/UI Design today?`,

        //"Welcome, Describe how would like your app compnents to look and feel and RAD. will turn them into components for IOS, Android and Web using react native.",
        //  compenents for  react native components and   where React Native coding becomes a breeze as (AI) crafts and output code from your prompts, liberating your creativity.",
        id: "1",
      },
    ],
    onFinish(message) {
      // console.log(message);
      const completion = message.role === "assistant" ? message.content : null;
      const snackUrl =
        message.role === "assistant" &&
        completion &&
        completion.includes(`jsx`) &&
        makingSnacks(completion);
      setSnackUrls((prev) => [...prev, { url: snackUrl }]);
      // setMessages([...messages.reverse()])
    },
  });
  // handleSubmit(()=>{

  // })
  // bg-indigo-300
  return (
    <div className="backdrop-blur-2xl lightblue min-h-screen bg-gradient-to-br ">
      <div className="sm:container sm:mx-auto">
        <div className="grid grid-cols-4 grid-flow-col-dense gap-3 h-screen bg-gradient-to-br ">
          <div className="overflow-y-auto col-span-3 py-12 ">
            {messages.length > 0
              ? [messages[messages.length - 1]].map((m) => {
                  const aicontent = replaceCodeBlocks(m.content, "");
                  const snackUrl =
                    m.role === "assistant" && m.content.includes(`jsx`)
                      ? makingSnacks(m.content)
                      : null;
                  return (
                    <div
                      key={m.id}
                      className="w-full px-10 py-8 my-1.5 mx-auto bg-white rounded-lg shadow-xl shadow-md rounded-lg overflow-hidden relative"
                    >
                      <p className="mb-4 text-lg font-light text-gray-800  flex h-2 w-20 items-center justify-center rounded bg-gray-200 p-3 text-xs text-white">
                        {m.role === "user" ? "User: " : "Response: "}
                      </p>
                      <p className="mb-4 text-lg font-light text-black-500 dark:text-gray-900">
                        {m.role === "user" ? m.content : aicontent}
                      </p>
                      {snackUrl ? (
                        <iframe
                          className="w-full"
                          style={{ height: "600px" }}
                          src={snackUrl}
                          allow="geolocation; camera; microphone"
                        />
                      ) : null}
                    </div>
                  );
                })
              : null}
          </div>
          <section className="py-9 ">
            <form onSubmit={handleSubmit}>
              <div className="col-span-full ">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-400"
                >
                  <br />
                </label>
                {/* <p className="mb-4 text-lg font-light text-gray-500  flex h-2 w-20 items-center justify-center rounded bg-gray-900 p-3 text-xs text-white">
                  Generative AI for React Native
                </p> */}
                <div className="mt-2">
                  <textarea
                    autoFocus={true}
                    placeholder="What are you going to make today?"
                    rows={5}
                    className="block w-full rounded-md border-0 py-1 text-black-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white-600 text-base sm:leading-6"
                    value={input}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                {/* <a
                  onClick={cleartextArea}
                  href="#"
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Clear
                </a> */}
                {/* <button

                  type="submit"
                  className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                >
                  Submit
                </button> */}
              </div>
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start"></div>
              <img />
            </form>
            {/* <a
                target="_blank"
                  href="https://twitter.com/seeyouin2050"
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                                    <br />
                Assistance and Questions @Seeyouin2050
                </a> */}
            <button className="bg-green-900 px-4 py-2 font-semibold text-white inline-flex items-center space-x-2 rounded">
              <a href="https://solana.com/hyperdrive">
                <svg
                  className="w-5 h-5 fill-current"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
                <span>Join Solana Hyperdrive hackathon</span>
              </a>
            </button>
            <span className="px-4 mg-9 font-semibold text-white inline">
              hello{" "}
            </span>

            {/* <button className="bg-blue-300 px-4 mg-9 font-semibold text-white inline-flex items-center space-x-2 rounded">
              <a href="https://twitter.com/seeyouin2050">
                <svg
                  className="w-5 h-5 fill-current"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
                <span>Assistance and Questions @Seeyouin2050</span>
              </a>
            </button> */}
<div class="overflow-auto  h-32">
            {history.reverse().map((m, index) => {
              return (
                <button onClick={()=>{
                  {m.role === "user" && setInput(m.content)}

                }}>


             
                <div className="w-full px-10 py-8 my-1.5 mx-auto bg-white rounded-lg shadow-xl shadow-md rounded-lg overflow-hidden relative">
                  <p className="mb-4 text-lg font-light text-gray-500  flex h-2 w-20 items-center justify-center rounded bg-gray-200 p-3 text-xs text-white">
                    {m.role === "user" && "Me: "}
                  </p>
                  <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                    {m.role === "user" && m.content}
                  </p>
                </div>
                </button>
              );
            })}
            </div>
          </section>
        </div>
      </div>
      <div className="flex flex-col max-w-md mx-auto stretch">
        <form onSubmit={handleSubmit}>
          <input
            className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-blue-500 rounded shadow-xl"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
        </form>
      </div>
    </div>
  );
}

function InputBox(params) {
  return (
    <>
      <form>
        <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
            <label for="comment" class="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows="4"
              class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>
          <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            <button
              type="submit"
              class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              Post comment
            </button>
            <div class="flex pl-0 space-x-1 sm:pl-2">
              <button
                type="button"
                class="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 12 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
                  />
                </svg>
                <span class="sr-only">Attach file</span>
              </button>
              <button
                type="button"
                class="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 20"
                >
                  <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                </svg>
                <span class="sr-only">Set location</span>
              </button>
              <button
                type="button"
                class="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
                <span class="sr-only">Upload image</span>
              </button>
            </div>
          </div>
        </div>
      </form>
      <p class="ml-auto text-xs text-gray-500 dark:text-gray-400">
        Remember, contributions to this topic should follow our{" "}
        <a href="#" class="text-blue-600 dark:text-blue-500 hover:underline">
          Community Guidelines
        </a>
        .
      </p>
    </>
  );
}

function HelloSocial() {
  return (
    <div className="flex flex-col h-screen bg-center bg-cover bg-no-repeat">
      <div className=" place-items-center mx-auto p-20 sm:my-auto bg-white rounded-3xl">
        <h1 className="text-5xl font-semibold text-blue-500">
          Social Media Buttons
        </h1>
        <div className="flex items-center justify-center space-x-3">
          <button className="bg-blue-500 px-4 py-2 font-semibold text-white inline-flex items-center space-x-2 rounded">
            <svg
              className="w-5 h-5 fill-current"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span>Facebook</span>
          </button>

          <button className="bg-red-500 px-4 py-2 font-semibold text-white inline-flex items-center space-x-2 rounded">
            <svg
              className="w-5 h-5 fill-current"
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
            </svg>
            <span>Reddit</span>
          </button>
          <button className="bg-pink-600 px-4 py-2 font-semibold text-white inline-flex items-center space-x-2 rounded">
            <svg
              className="w-5 h-5 fill-current"
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Pinterest icon</title>
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
            </svg>
            <span>Pinterest</span>
          </button>
        </div>
      </div>
    </div>
  );
}
