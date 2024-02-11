import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
})

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Analyze the thoughts and based on Cognitive Behavioral Therapy principles find cognitive biases and help to overcome them.",
      },
    ],
    model: "gpt-3.5-turbo",
  })

  console.log(completion.choices[0].message.content)
}

main()
