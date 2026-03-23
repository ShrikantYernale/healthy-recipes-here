import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SavedRecipe {
  id: string;
  title: string;
  cooking_time: string;
  ingredients: string[];
  steps: string[];
  tags: string[];
}

const SavedRecipes = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [recipes, setRecipes] = useState<SavedRecipe[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) navigate("/auth", { replace: true });
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      const { data } = await supabase
        .from("saved_recipes")
        .select("*")
        .order("created_at", { ascending: false });
      setRecipes(data ?? []);
      setFetching(false);
    };
    fetch();
  }, [user]);

  const handleDelete = async (id: string) => {
    await supabase.from("saved_recipes").delete().eq("id", id);
    setRecipes((prev) => prev.filter((r) => r.id !== id));
    toast({ title: "Recipe deleted" });
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />
      <main className="container mx-auto max-w-3xl px-4 py-10 space-y-6">
        <h1 className="font-display text-3xl text-foreground">Saved Recipes</h1>
        {fetching ? (
          <p className="text-muted-foreground">Loading…</p>
        ) : recipes.length === 0 ? (
          <p className="text-muted-foreground">No saved recipes yet. Generate one and save it!</p>
        ) : (
          recipes.map((r) => (
            <Card key={r.id} className="border-border">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-4">
                  <CardTitle className="font-display text-xl text-foreground">{r.title}</CardTitle>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{r.cooking_time}</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(r.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {r.tags.map((t) => (
                    <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {r.ingredients.length} ingredients · {r.steps.length} steps
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </main>
    </div>
  );
};

export default SavedRecipes;
