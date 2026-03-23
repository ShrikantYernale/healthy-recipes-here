import { useState, useCallback } from "react";
import Header from "@/components/Header";
import RecipeForm from "@/components/RecipeForm";
import type { RecipeFormData } from "@/components/RecipeForm";
import RecipeCard from "@/components/RecipeCard";
import VideoEmbed from "@/components/VideoEmbed";
import type { Recipe } from "@/components/RecipeCard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = useCallback(async (formData: RecipeFormData) => {
    setIsLoading(true);
    setRecipe(null);
    try {
      const { data, error } = await supabase.functions.invoke("generate-recipe", {
        body: formData,
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setRecipe(data.recipe);
    } catch (e: any) {
      toast({
        title: "Generation failed",
        description: e.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />

      <main className="container mx-auto max-w-3xl px-4 py-10 space-y-8">
        {/* Hero text */}
        <div className="text-center space-y-2">
          <h1 className="font-display text-4xl sm:text-5xl text-foreground">
            Eat well, feel&nbsp;great.
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Generate personalised healthy recipes tailored to your diet, goals, and
            what's in your kitchen.
          </p>
        </div>

        <RecipeForm onGenerate={handleGenerate} isLoading={isLoading} />

        {isLoading && (
          <div className="flex flex-col items-center gap-3 py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-sm text-muted-foreground">Crafting your recipe…</p>
          </div>
        )}

        {recipe && !isLoading && (
          <>
            <RecipeCard recipe={recipe} />
            <VideoEmbed />
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
