const API_KEY = "PASTE_YOUR_API_KEY_HERE";

const API_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

const affirmation = document.getElementById("affirmation");
const refreshBtn = document.getElementById("refreshBtn");


async function getAffirmation() {

    affirmation.textContent = "Loading...";

    const prompt = `
        Give me one short positive affirmation.
        Use simple English.
        Give only one sentence.
    `;

    try {

        const response = await fetch(API_URL, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": API_KEY
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
        });


        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }


        const data = await response.json();


        const answer =
            data.candidates[0].content.parts[0].text;


        affirmation.textContent = answer;


    } catch (error) {

        console.error(error);

        affirmation.textContent =
            "Sorry, something went wrong. Please try again.";
    }
}


// Page load
window.addEventListener("DOMContentLoaded", () => {
    getAffirmation();
});


// Button click
refreshBtn.addEventListener("click", () => {
    getAffirmation();
});

