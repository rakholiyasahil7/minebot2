const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const MineBotToggler = document.querySelector(".MineBot-toggler");
const MineBotCloseBtn = document.querySelector(".close-btn");


let userMessage;
const API_KEY ="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";


const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;

    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
    }

    const generateResponse = (incomingChatLi) => {
        const API_URL = "https://api.openai.com/v1/chat/completions";
        const messageElement = incomingChatLi.querySelector("p");
        // Define the properties and message for the API request
        const requestOptions = {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: userMessage}]
        })
    }
        fetch(API_URL, requestOptions).then(res => res.json()).then(data =>{
            messageElement.textContent = data.choices[0].message.content;
            }).catch((error) => {  
                messageElement.classList.add("error");
            messageElement.textContent = "Oops! Something went wrong. Please try again.";
            }).finally(() =>  chatbox.scrollTo(0, chatbox.scrollHeight));
    }
    const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;
    chatInput.value = "";

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi (userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    setTimeout(() => {
        // Display "Thinking..." message while waiting for the response
        const incomingChatLi = createChatLi("Thinking...", "incoming")
        chatbox.appendChild(incomingChatLi); 
         generateResponse(incomingChatLi);
    }, 600);
    }

   
    sendChatBtn.addEventListener("click", handleChat);
    MineBotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-Minebot"));
    MineBotToggler.addEventListener("click", () => document.body.classList.toggle("show-Minebot"));





