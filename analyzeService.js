const OpenAI = require("openai")

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
})

async function analyzeResponseAI(noteText) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Analyze the input text to identify any negative cognitive biases based on Cognitive Behavioral Therapy principles. Provide guidance and inspiration to overcome these biases. If the input contains only positive sentiments, offer positive and motivational feedback.",
        },
        {
          role: "user",
          content: noteText,
        },
      ],
      model: "gpt-3.5-turbo",
    })
    return completion.choices[0].message.content
  } catch (error) {
    console.error("Error analyzing note:", error)
    throw new Error("AI analysis failed")
  }
}

module.exports = {
  analyzeResponseAI,
}
