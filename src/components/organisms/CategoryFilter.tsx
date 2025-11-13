"use client";

import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => onSelectCategory(category)}
          className={
            selectedCategory === category
              ? "bg-primary hover:bg-primary/90"
              : "bg-background/80 hover:bg-accent border-border text-muted-foreground"
          }
        >
          {category === "all" ? "すべて" : category}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
