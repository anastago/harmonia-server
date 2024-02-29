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
            "Identify negative biases based on Cognitive Behavioral Therapy principles. Start with guidance and inspiration to overcome these biases. If the input contains only positive sentiments, offer positive and motivational feedback.",
        },
        {
          role: "user",
          content: noteText,
        },
      ],
      model: "gpt-3.5-turbo",
      temperature: 2,
      max_tokens: 700,
      top_p: 0.7,
      frequency_penalty: 0.5,
      presence_penalty: 0.6,
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
