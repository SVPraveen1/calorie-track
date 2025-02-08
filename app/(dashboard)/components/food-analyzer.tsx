"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { analyzeFoodImage } from "@/app/actions/analyze-food"

export function FoodAnalyzer({ imageSrc }: { imageSrc: string | null }) {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [analysis, setAnalysis] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (imageSrc) {
      setImageFile(new File([imageSrc], "foodImage"))
    }
  }, [imageSrc])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0])
      setAnalysis(null)
      setError(null)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!imageFile) {
      setError("Please select an image file")
      return
    }

    setIsLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append("image", imageFile)

    try {
      const result = await analyzeFoodImage(formData)
      if (result.success) {
        setAnalysis(result.data)
      } else {
        setError(result.error || "An error occurred during analysis")
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Food Analyzer</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="image">Upload Food Image</Label>
              <Input id="image" type="file" accept="image/*" onChange={handleFileChange} />
              {imageFile && (
                <div className="mt-2 bg-gray-200">
                  <img src={URL.createObjectURL(imageFile)} alt="Uploaded Image" className="w-full h-auto" />
                </div>
              )}
            </div>
            <Button type="submit" disabled={!imageFile || isLoading} className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
              {isLoading ? "Analyzing..." : "Analyze Food"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        {error && <p className="text-red-500">{error}</p>}
        {analysis && (
          <div className="mt-4">
            <h3 className="font-bold">{analysis.name}</h3>
            <p>Calories: {analysis.calories}</p>
            <p>Protein: {analysis.macros.protein}g</p>
            <p>Carbs: {analysis.macros.carbs}g</p>
            <p>Fat: {analysis.macros.fat}g</p>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
