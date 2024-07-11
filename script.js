// const chatbotToggler=document.querySelector(".chatbot-toggler");
// const closeBtn=document.querySelector(".close-btn");
const chatbox=document.querySelector(".chatbox");
const chatInput=document.querySelector(".chat-input textarea");
const sendChatBtn=document.querySelector(".chat-input span");

let userMessage;

const createChatLi = (message,className) => {
    const chatLi=document.createElement("li");
    chatLi.classList.add("chat",className);
    let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML=chatContent;
    return chatLi;
}

const generateResponse=(chatElement) => {
    const API_URL="https://api.openai.com/v1/chat/completions";

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

    fetch(API_URL, requestOptions).then(res=>res.json()).then(data=>{
        console.log(data);
    }).catch((error)=>{
        console.log(error);
    })
}

const handleChat = () =>{
    userMessage=chatInput.value.trim();
    if(!userMessage) return;

    chatbox.appendChild(createChatLi(userMessage,"outgoing"));
    
    setTimeout(() => {
        chatbox.appendChild(createChatLi("Thinking...", "incoming"));
    //     const incomingChatLi = createChatLi("Thinking...", "incoming");
    //     chatbox.appendChild(incomingChatLi);
    //     chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse();
    }, 600);
}

// chatInput.addEventListener("input",() =>{
//     chatInput.style.height=`${inputInitHeight}px`;
//     chatInput.style.height=`${chatInput.scrollHeight}px`
// });

// chatInput.addEventListener("keydown", (e) => {
//     // If Enter key is pressed without Shift key and the window 
//     // width is greater than 800px, handle the chat
//     if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
//         e.preventDefault();
//         handleChat();
//     }
// });

sendChatBtn.addEventListener("click", handleChat);
// closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
// chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));