"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import { analyzeFoodImage } from "@/app/actions/analyze-food"
import { Flame, Beef, Wheat, Droplet, Upload } from "lucide-react"

const calculateMacroPercentages = (macros: { protein: number, carbs: number, fat: number }, totalCalories: number) => {
  const proteinCals = macros.protein * 4;
  const carbsCals = macros.carbs * 4;
  const fatCals = macros.fat * 9;

  return {
    protein: Math.round((proteinCals / totalCalories) * 100),
    carbs: Math.round((carbsCals / totalCalories) * 100),
    fat: Math.round((fatCals / totalCalories) * 100),
  };
};

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
            <div className="relative">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="image"
                className="flex items-center justify-center gap-2 w-full min-h-[40px] px-4 py-2 bg-gray-50 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <Upload className="w-5 h-5 text-gray-500" />
                <span className="text-gray-600">
                  {imageFile ? imageFile.name : "Click to upload image"}
                </span>
              </label>
              {imageFile && (
                <div className="mt-2 bg-gray-200 rounded-md overflow-hidden">
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
      <CardFooter className="flex flex-col items-start w-full">
        {error && <p className="text-red-500">{error}</p>}
        {analysis && (
          <div className="w-full">
            <h3 className="font-bold text-lg mb-4">{analysis.name}</h3>
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-blue-600" />
                  <div className="text-blue-600 font-semibold text-sm">Calories</div>
                </div>
                <div className="text-2xl font-bold text-blue-800">{analysis.calories}</div>
                <div className="text-blue-600 text-xs">kcal</div>
              </div>
              {analysis.calories && analysis.macros && (
                <>
                  {(() => {
                    const percentages = calculateMacroPercentages(analysis.macros, analysis.calories);
                    return (
                      <>
                        <div className="bg-green-100 p-4 rounded-lg shadow-sm">
                          <div className="flex items-center gap-2">
                            <Beef className="w-5 h-5 text-green-600" />
                            <div className="text-green-600 font-semibold text-sm">Protein</div>
                          </div>
                          <div className="text-2xl font-bold text-green-800">{analysis.macros.protein}g</div>
                          <div className="flex justify-between items-center">
                            <div className="text-green-600 text-xs">grams</div>
                            <div className="text-green-700 text-sm font-medium">{percentages.protein}%</div>
                          </div>
                          <div className="w-full bg-green-200 rounded-full h-1.5 mt-1">
                            <div 
                              className="bg-green-600 h-1.5 rounded-full" 
                              style={{ width: `${percentages.protein}%` }}
                            />
                          </div>
                        </div>
                        <div className="bg-yellow-100 p-4 rounded-lg shadow-sm">
                          <div className="flex items-center gap-2">
                            <Wheat className="w-5 h-5 text-yellow-600" />
                            <div className="text-yellow-600 font-semibold text-sm">Carbs</div>
                          </div>
                          <div className="text-2xl font-bold text-yellow-800">{analysis.macros.carbs}g</div>
                          <div className="flex justify-between items-center">
                            <div className="text-yellow-600 text-xs">grams</div>
                            <div className="text-yellow-700 text-sm font-medium">{percentages.carbs}%</div>
                          </div>
                          <div className="w-full bg-yellow-200 rounded-full h-1.5 mt-1">
                            <div 
                              className="bg-yellow-600 h-1.5 rounded-full" 
                              style={{ width: `${percentages.carbs}%` }}
                            />
                          </div>
                        </div>
                        <div className="bg-red-100 p-4 rounded-lg shadow-sm">
                          <div className="flex items-center gap-2">
                            <Droplet className="w-5 h-5 text-red-600" />
                            <div className="text-red-600 font-semibold text-sm">Fat</div>
                          </div>
                          <div className="text-2xl font-bold text-red-800">{analysis.macros.fat}g</div>
                          <div className="flex justify-between items-center">
                            <div className="text-red-600 text-xs">grams</div>
                            <div className="text-red-700 text-sm font-medium">{percentages.fat}%</div>
                          </div>
                          <div className="w-full bg-red-200 rounded-full h-1.5 mt-1">
                            <div 
                              className="bg-red-600 h-1.5 rounded-full" 
                              style={{ width: `${percentages.fat}%` }}
                            />
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </>
              )}
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
