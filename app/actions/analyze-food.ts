"use server"

import { z } from "zod"
import { getUser } from "@/lib/db/queries"
import { createMeal } from "@/lib/db/queries"

const AnalysisSchema = z.object({
  name: z.string(),
  calories: z.number().nullable(),
  macros: z.object({
    protein: z.number().nullable(),
    carbs: z.number().nullable(),
    fat: z.number().nullable(),
  }),
})

export async function analyzeFoodImage(formData: FormData) {
  try {
    const user = await getUser()
    if (!user) {
      throw new Error("User not authenticated")
    }

    const file = formData.get("image") as Blob
    if (!file) {
      throw new Error("No image file provided")
    }

    const bytes = await file.arrayBuffer()
    const base64 = Buffer.from(bytes).toString("base64")

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: 'You are a food analysis expert. Analyze this food image and provide nutritional information. Return ONLY a JSON object in this exact format, with no additional text: { "name": "food name", "calories": number, "macros": { "protein": number, "carbs": number, "fat": number } }',
            },
            {
              inline_data: {
                mime_type: file.type,
                data: base64,
              },
            },
          ],
        },
      ],
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      },
    )

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`)
    }

    const result = await response.json()

    if (!result.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error("Invalid response format from API")
    }

    const text = result.candidates[0].content.parts[0].text.trim()
    const jsonMatch = text.match(/\{.*\}/s)
    if (!jsonMatch) {
      throw new Error("API response does not contain a valid JSON object")
    }

    const jsonText = jsonMatch[0]
    const parsedData = JSON.parse(jsonText)
    const validatedData = AnalysisSchema.parse(parsedData)

    // Create meal in database
    const [meal] = await createMeal(user.id, {
      name: validatedData.name,
      calories: validatedData.calories,
      protein: validatedData.macros.protein,
      carbs: validatedData.macros.carbs,
      fat: validatedData.macros.fat,
    })

    return {
      success: true,
      data: {
        name: meal.name,
        calories: meal.calories ?? "N/A",
        macros: {
          protein: meal.protein ?? "N/A",
          carbs: meal.carbs ?? "N/A",
          fat: meal.fat ?? "N/A",
        },
      },
    }
  } catch (error) {
    console.error("Error analyzing food:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred",
    }
  }
}
