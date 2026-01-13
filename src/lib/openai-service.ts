import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "dummy-key", // Prevent crash if key missing
    dangerouslyAllowBrowser: true // Only for dev demo, remove in prod
});

export async function generateAIContent(rawPolicy: string) {
    if (!process.env.OPENAI_API_KEY) {
        console.warn("⚠️ OpenAI Key missing. Using mock response.");
        return mockResponse;
    }

    try {
        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a professional financial blogger. Write a SEO-optimized blog post in Korean based on the government policy provided. Use markdown format. Include: Title, 3-line Summary, Eligibility, Benefits, Application Method."
                },
                { role: "user", content: `Policy Data to rewrite:\n${rawPolicy}` }
            ],
            model: "gpt-4-turbo",
        });

        return completion.choices[0].message.content;
    } catch (error) {
        console.error("❌ OpenAI Error:", error);
        return mockResponse;
    }
}

const mockResponse = `# (AI Key 필요) 자동 생성된 글 예시
이 내용은 OpenAI API 키가 설정되지 않았을 때 표시됩니다.
키를 설정하면 실제 공고문을 바탕으로 완벽한 글이 생성됩니다.
`;
