import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export interface RecipeFormData {
  preference: string;
  allergies: string;
  goal: string;
  cuisine: string;
  ingredients: string;
}

interface RecipeFormProps {
  onGenerate: (data: RecipeFormData) => void;
  isLoading: boolean;
}

const RecipeForm = ({ onGenerate, isLoading }: RecipeFormProps) => {
  const [preference, setPreference] = useState("");
  const [allergies, setAllergies] = useState("");
  const [goal, setGoal] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [ingredients, setIngredients] = useState("");

  return (
    <Card className="shadow-[var(--card-shadow)] border-border">
      <CardHeader>
        <CardTitle className="font-display text-2xl text-foreground">
          What are you craving?
        </CardTitle>
        <p className="text-muted-foreground text-sm">
          Tell us your preferences and we'll craft the perfect recipe.
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="preference">Food Preference</Label>
            <Select value={preference} onValueChange={setPreference}>
              <SelectTrigger id="preference">
                <SelectValue placeholder="Select preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vegetarian">Vegetarian</SelectItem>
                <SelectItem value="vegan">Vegan</SelectItem>
                <SelectItem value="keto">Keto</SelectItem>
                <SelectItem value="paleo">Paleo</SelectItem>
                <SelectItem value="omnivore">Omnivore</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="allergies">Allergies</Label>
            <Input
              id="allergies"
              placeholder="e.g. nuts, dairy, gluten"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal">Health Goal</Label>
            <Select value={goal} onValueChange={setGoal}>
              <SelectTrigger id="goal">
                <SelectValue placeholder="Select goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weight-loss">Weight Loss</SelectItem>
                <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                <SelectItem value="energy">More Energy</SelectItem>
                <SelectItem value="heart-health">Heart Health</SelectItem>
                <SelectItem value="general">General Wellness</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cuisine">Cuisine</Label>
            <Select value={cuisine} onValueChange={setCuisine}>
              <SelectTrigger id="cuisine">
                <SelectValue placeholder="Select cuisine" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mediterranean">Mediterranean</SelectItem>
                <SelectItem value="asian">Asian</SelectItem>
                <SelectItem value="mexican">Mexican</SelectItem>
                <SelectItem value="indian">Indian</SelectItem>
                <SelectItem value="american">American</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ingredients">Available Ingredients (optional)</Label>
          <Input
            id="ingredients"
            placeholder="e.g. chicken, spinach, tomatoes"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </div>

        <Button
          onClick={() => onGenerate({ preference, allergies, goal, cuisine, ingredients })}
          disabled={isLoading}
          className="w-full gap-2 text-base font-semibold h-12"
          style={{ background: "var(--hero-gradient)" }}
        >
          <Sparkles className="h-4 w-4" />
          {isLoading ? "Generating..." : "Generate Recipe"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecipeForm;
