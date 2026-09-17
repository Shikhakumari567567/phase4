// const API_KEY = "YOUR_API_KEY";

// async function generateQuiz() {

//     // Get topic from input
//     let topic = document.getElementById("topicInput").value;

//     // Check empty input
//     if (topic === "") {
//         alert("Please enter a topic");
//         return;
//     }

//     // Create prompt using template literal
//     let prompt = `
//         Give me one simple quiz question and its answer
//         about ${topic}.

//         Return the answer in this format:

//         Question: ...
//         Answer: ...
//     `;

//     // Show loading message
//     document.getElementById("result").innerHTML = "Loading...";

//     try {

//         // Send request to Gemini
//         const response = await fetch(
//             "YOUR_GEMINI_API_ENDPOINT",
//             {
//                 method: "POST",

//                 headers: {
//                     "Content-Type": "application/json"
//                 },

//                 body: JSON.stringify({
//                     contents: [
//                         {
//                             parts: [
//                                 {
//                                     text: prompt
//                                 }
//                             ]
//                         }
//                     ]
//                 })
//             }
//         );

//         // Convert response to JavaScript object
//         const data = await response.json();

//         // Get Gemini's text
//         const answer =
//             data.candidates[0].content.parts[0].text;

//         // Display result
//         document.getElementById("result").innerHTML =
//             `<p>${answer}</p>`;

//     } catch (error) {

//         console.log(error);

//         document.getElementById("result").innerHTML =
//             "Something went wrong. Please try again.";
//     }
// }



















const API_KEY = "YOUR_GEMINI_API_KEY";

async function generateQuiz() {

    const topic = document.getElementById("topicInput").value;
    const result = document.getElementById("result");

    // Check input
    if (topic.trim() === "") {
        result.innerHTML = "Please enter a topic.";
        return;
    }

    // Prompt
    const prompt = `
        Create one simple quiz question about ${topic}.

        Give the answer also.

        Use exactly this format:

        Question: your question
        Answer: your answer
    `;

    result.innerHTML = "Generating quiz...";

    try {

        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
            {
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
            }
        );

        const data = await response.json();

        // Check API error
        if (!response.ok) {
            console.log(data);
            throw new Error("API request failed");
        }

        // Get Gemini response
        const text =
            data.candidates[0].content.parts[0].text;

        // Show result
        result.innerHTML = `
            <h3>Quiz</h3>
            <p>${text}</p>
        `;

    } catch (error) {

        console.log(error);

        result.innerHTML = `
            <p>Something went wrong.</p>
            <p>Check your API key and Gemini model.</p>
        `;
    }
}

