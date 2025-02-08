import { getMealsForUser } from "@/lib/db/queries";
import {auth} from "../../../../lib/auth/getses";
import { redirect } from "next/navigation";

export default async function MealHistory() {
    const session = await auth();
    
    if (!session?.user) {
        redirect("/login");
    }


    const userId = parseInt(session.user.id);
    const mealHistory = await getMealsForUser(userId);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Meal History</h1>
            <div className="space-y-4">
                {mealHistory.map((meal) => (
                    <div 
                        key={meal.id} 
                        className="border rounded-lg p-4 shadow-sm"
                    >
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold">{meal.name}</h2>
                            <span className="text-gray-500">
                                {new Date(meal.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <p className="text-gray-600">Calories: {meal.calories}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}