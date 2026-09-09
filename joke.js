// async function getJoke(){
//  try{
//     document.getElementById("joke").innerText = "Loading joke...";
//     let res = await fetch("https://official-joke-api.appspot.com/random_joke");
//     let data = await res.json();

//     document.getElementById("joke").innerHTML =   `<strong>${data.setup}</strong><br><br> ${data.punchline}`;


//  } catch (error) {
//     joke.innerHTML = `
//         <div class="error">
//             ⚠️ Failed to generate joke. Please try again.
//         </div>
//     `;

//     console.error("Error:", error);
//  }
// }











const API_KEY = "YOUR_ACTUAL_API_KEY";

const API_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";


const jokeBox = document.getElementById("joke");

const topicInput = document.getElementById("topic");

const featureButtons = document.getElementById("featureButtons");



const features = ["joke", "story", "quiz"];


const [firstFeature, ...otherFeatures] = features;




const allFeatures = [firstFeature, ...otherFeatures];




featureButtons.innerHTML = allFeatures
    .map((feature) => {
        const buttonText = {
            joke: "😂 Generate Joke",
            story: "📖 Generate Story",
            quiz: "🧠 Generate Quiz"
        };

        return `
            <button data-feature="${feature}">
                ${buttonText[feature]}
            </button>
        `;
    })
    .join("");


const getPrompt = (feature, topic) => {

    if (feature === "joke") {
        return `Tell me a funny and clean joke about ${topic}.`;
    }

    if (feature === "story") {
        return `Write a short and interesting story about ${topic}.`;
    }

    return `Create a simple quiz about ${topic} with 3 questions and answers.`;
};



const generateAIContent = async (feature) => {

    const topic = topicInput.value.trim();

    if (!topic) {
        jokeBox.innerHTML = `
            <div class="error">
                ⚠️ Please enter a topic first.
            </div>
        `;

        return;
    }


    

    jokeBox.innerHTML = `
        <div class="loading">
            ⏳ Generating AI content...
        </div>
    `;


    try {

        

        const prompt = getPrompt(feature, topic);


        

        const response = await fetch(
            `${API_URL}?key=${API_KEY}`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: prompt
                                }
                            ]
                        }
                    ]
                })
            }
        );


        

        if (!response.ok) {
            throw new Error(
                `API request failed: ${response.status}`
            );
        }


        const data = await response.json();


        

        const {
            candidates = []
        } = data;


        const [
            {
                content: {
                    parts = []
                } = {}
            } = {}
        ] = candidates;


        const [
            {
                text = "No content generated."
            } = {}
        ] = parts;


        

        jokeBox.innerHTML = `
            <strong>AI Result:</strong>
            <br><br>
            ${text.replace(/\n/g, "<br>")}
        `;


    } catch (error) {

        console.error("Error:", error);

        jokeBox.innerHTML = `
            <div class="error">
                ⚠️ Failed to generate content.
                <br>
                Please check your API key and try again.
            </div>
        `;

    } finally {

        console.log("AI request completed.");

    }
};



featureButtons.addEventListener("click", async (event) => {

    const button = event.target.closest("button");

    if (!button) {
        return;
    }

    const feature = button.dataset.feature;

    await generateAIContent(feature);

});















