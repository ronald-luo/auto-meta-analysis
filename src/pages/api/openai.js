const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const messages = async (req, res) => {
    messages = [
    {
        role: "system",
        content: "you are now a meta analysis expert",
    }, 
    {
        role: "user",
        content: "i would like help with my meta analysis",
    },
    {
        role: "assistant",
        content: "I would love to help you",
    },     
    {
        role: "user",
        content: "what can you do?",
    },]
    
    const { messages } = req.body;

    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        messages,
    });

    console.log(completion.data.choices[0].text);

    res.status(200).json({ message: completion.data.choices[0].text});
};

