const API_KEY = "AQ.Ab8RN6Kc5E7r0Dy6PZ6mpmqGRbxhlkO6Lnn58C3KbgYVdg1hqA";
const API_URL =
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${API_KEY}`;

let selectedFeature = "ask";

// Select feature
const selectFeature = (feature) => {

    selectedFeature = feature;

    const input = document.getElementById("userInput");

    if (feature === "ask") {
        input.placeholder = "Ask me anything...";
    }

    if (feature === "summary") {
        input.placeholder = "summary";
    }

    if (feature === "ideas") {
        input.placeholder = "ideas";
    }

    if (feature === "definition") {
        input.placeholder = "definition";
    }
};

const featureButtons = [...document.querySelectorAll("[data-feature]")];
const generateButton = document.getElementById("generateButton");
const loading = document.getElementById("loading");

featureButtons.forEach((button) => {
    button.addEventListener("click", () => selectFeature(button.dataset.feature));
});

const buildPrompt = (instruction, userText) => `${instruction} ${userText}`;


// Generate AI content
const generateContent = async () => {

    const input = document.getElementById("userInput");
    const result = document.getElementById("result");

    const userText = input.value.trim();

    if (userText === "") {
        result.innerText = "Please enter something first.";
        return;
    }

    let prompt = "";

    // Create prompt
    if (selectedFeature === "ask") {
        prompt = buildPrompt("Answer this question simply:", userText);
    }

    if (selectedFeature === "summary") {
        prompt = buildPrompt("Summarize this text in simple words:", userText);
    }

    if (selectedFeature === "ideas") {
        prompt = buildPrompt("Give me 5 creative ideas about:", userText);
    }

    if (selectedFeature === "definition") {
        prompt = buildPrompt("Give a simple definition and example of:", userText);
    }

    generateButton.disabled = true;
    loading.hidden = false;
    result.innerText = "";

    try {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        };
        const response = await fetch(API_URL, {
            ...requestOptions,
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

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || "API Error");
        }

        const { candidates = [] } = data;
        const responseTexts = candidates
            .map(({ content: { parts = [] } = {} }) =>
                parts
                    .map(({ text = "" }) => text.trim())
                    .filter(Boolean)
                    .join("\n")
            )
            .filter(Boolean);
        const answer = responseTexts[0] || "No response was returned.";

        result.innerHTML = `<p>${answer}</p>`;

    } catch (error) {

        result.innerText =
            "Error: " + error.message;

        console.error(error);
    } finally {
        generateButton.disabled = false;
        loading.hidden = true;
    }
};

generateButton.addEventListener("click", generateContent);























































