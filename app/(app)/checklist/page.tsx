"use client";

import { useState } from "react";
import { Check, Plus, RotateCcw, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label, Select } from "@/components/ui/form";
import { ProgressBar } from "@/components/ui/progress";
import { Dialog, ConfirmDialog } from "@/components/ui/dialog";
import { useAppData } from "@/lib/store";
import { useToast } from "@/components/ui/toast";
import { CHECKLIST_CATEGORIES } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function ChecklistPage() {
  const { data, toggleChecklistItem, addChecklistItem, deleteChecklistItem, resetChecklist } =
    useAppData();
  const toast = useToast();
  const [addOpen, setAddOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState(CHECKLIST_CATEGORIES[0]);

  const categories = [
    ...CHECKLIST_CATEGORIES,
    ...Array.from(new Set(data.checklist.map((c) => c.category))).filter(
      (c) => !CHECKLIST_CATEGORIES.includes(c)
    ),
  ];

  const done = data.checklist.filter((c) => c.completed).length;
  const total = data.checklist.length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  const submitNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addChecklistItem(newCategory, newTitle.trim());
    toast("Checklist item added");
    setNewTitle("");
    setAddOpen(false);
  };

  return (
    <div>
      <PageHeader
        title="Tournament Checklist"
        subtitle="Walk into your next tournament prepared."
        actions={
          <>
            <Button variant="outline" size="sm" onClick={() => setResetOpen(true)}>
              <RotateCcw className="size-4" aria-hidden /> Reset
            </Button>
            <Button onClick={() => setAddOpen(true)}>
              <Plus className="size-4" aria-hidden /> Add Item
            </Button>
          </>
        }
      />

      {/* Progress */}
      <Card className="mb-6">
        <CardBody className="pt-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-display text-3xl font-bold">
                {done} <span className="text-lg text-faint">/ {total} completed</span>
              </p>
              <p className="mt-1 text-sm text-soft">
                {percent === 100
                  ? "You're ready. Go win some rounds. 🏆"
                  : "Preparation is the quiet half of every win."}
              </p>
            </div>
            <p className="font-display text-2xl font-bold text-accent">{percent}%</p>
          </div>
          <ProgressBar
            value={percent}
            className="mt-4 h-3"
            label="Checklist completion"
            barClassName={percent === 100 ? "bg-win" : undefined}
          />
        </CardBody>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {categories.map((category) => {
          const items = data.checklist.filter((c) => c.category === category);
          if (items.length === 0) return null;
          const catDone = items.filter((c) => c.completed).length;
          return (
            <Card key={category}>
              <CardHeader className="flex items-center justify-between">
                <CardTitle>{category}</CardTitle>
                <span className="text-xs font-semibold text-faint">
                  {catDone}/{items.length}
                </span>
              </CardHeader>
              <CardBody>
                <ul className="space-y-1">
                  {items.map((item) => (
                    <li key={item.id} className="group flex items-center gap-2">
                      <button
                        onClick={() => toggleChecklistItem(item.id)}
                        role="checkbox"
                        aria-checked={item.completed}
                        aria-label={item.title}
                        className="flex flex-1 items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-card2"
                      >
                        <span
                          className={cn(
                            "flex size-5 shrink-0 items-center justify-center rounded-md border transition-all",
                            item.completed
                              ? "border-win bg-win text-white"
                              : "border-line bg-card group-hover:border-faint"
                          )}
                        >
                          {item.completed && <Check className="size-3.5" strokeWidth={3} />}
                        </span>
                        <span
                          className={cn(
                            "text-sm transition-colors",
                            item.completed ? "text-faint line-through" : "text-ink"
                          )}
                        >
                          {item.title}
                        </span>
                      </button>
                      {item.custom && (
                        <button
                          onClick={() => {
                            deleteChecklistItem(item.id);
                            toast("Item removed", "info");
                          }}
                          aria-label={`Delete ${item.title}`}
                          className="rounded-lg p-1.5 text-faint opacity-0 transition-all hover:bg-loss/10 hover:text-loss group-hover:opacity-100 focus-visible:opacity-100"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          );
        })}
      </div>

      {/* Add item dialog */}
      <Dialog open={addOpen} onClose={() => setAddOpen(false)} title="Add Checklist Item">
        <form onSubmit={submitNew} className="space-y-4">
          <div>
            <Label htmlFor="ci-title">Item</Label>
            <Input
              id="ci-title"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Print extra copies of the case"
            />
          </div>
          <div>
            <Label htmlFor="ci-category">Category</Label>
            <Select
              id="ci-category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </Select>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setAddOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Item</Button>
          </div>
        </form>
      </Dialog>

      <ConfirmDialog
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        title="Reset Checklist"
        message="Uncheck every item so you can start fresh for the next tournament?"
        confirmLabel="Reset"
        onConfirm={() => {
          resetChecklist();
          toast("Checklist reset for your next tournament");
        }}
      />
    </div>
  );
}
