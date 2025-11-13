"use client";

import { Button } from "@/components/ui/button";

interface Category {
  key: string;
  value: string;
}

interface CategoryFilterProps {
  categories: Category[];
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
          key={category.key}
          variant={selectedCategory === category.key ? "default" : "outline"}
          size="sm"
          onClick={() => onSelectCategory(category.key)}
          className={
            selectedCategory === category.key
              ? "bg-primary hover:bg-primary/90"
              : "bg-background/80 hover:bg-accent border-border text-muted-foreground"
          }
        >
          {category.value}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
