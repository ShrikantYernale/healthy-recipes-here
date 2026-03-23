import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl text-foreground">
            Healthy Recipe Generator
          </span>
        </div>
        <nav className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="text-foreground">
            Home
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Saved Recipes
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
