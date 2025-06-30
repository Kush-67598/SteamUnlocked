import Groq from "groq-sdk";

export default async function handler(req, res) {
  const groq = new Groq({ apiKey: process.env.GROQ_KEY });
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { slug } = req.body;
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Give only 5 PC game titles related to "${slug}" .
Only output the names,Dont include ${slug} and give only one sequel or prequel of this games,one per line, with no introduction, no bullet points, and no numbering.
`,
        },
      ],
      model: "llama3-70b-8192",
    });

    res.status(200).json({
      reply: completion.choices[0].message.content || "",
    });
  } catch (err) {
    console.error("Groq API error:", err);
    res.status(500).json({ error: err.message });
  }
}
