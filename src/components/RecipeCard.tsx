import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, UtensilsCrossed, Bookmark } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export interface Recipe {
  title: string;
  cookingTime: string;
  ingredients: string[];
  steps: string[];
  tags: string[];
}

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    setSaving(true);
    const { error } = await supabase.from("saved_recipes").insert({
      user_id: user.id,
      title: recipe.title,
      cooking_time: recipe.cookingTime,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      tags: recipe.tags,
    });
    setSaving(false);
    if (error) {
      toast({ title: "Failed to save", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Recipe saved!", description: "Check your Saved Recipes." });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card className="shadow-[var(--card-shadow)] border-border overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <CardTitle className="font-display text-2xl text-foreground">
              {recipe.title}
            </CardTitle>
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">{recipe.cookingTime}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={handleSave}
                disabled={saving}
              >
                <Bookmark className="h-4 w-4" />
                {saving ? "Saving…" : "Save"}
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {recipe.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs font-medium">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h3 className="flex items-center gap-2 font-semibold text-foreground mb-3">
              <UtensilsCrossed className="h-4 w-4 text-primary" />
              Ingredients
            </h3>
            <ul className="grid gap-1.5 sm:grid-cols-2">
              {recipe.ingredients.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Steps</h3>
            <ol className="space-y-3">
              {recipe.steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    {i + 1}
                  </span>
                  <span className="text-foreground pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RecipeCard;
