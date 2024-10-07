import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronDown } from "lucide-react";
import { EditorBubbleItem, useEditor } from "novel";

export interface BubbleColorMenuItem {
  name: string;
  color: string;
}

const TEXT_COLORS: BubbleColorMenuItem[] = [
  {
    name: "پیشفرض",
    color: "var(--novel-black)",
  },
  {
    name: "بنفش",
    color: "#9333EA",
  },
  {
    name: "قرمز",
    color: "#E00000",
  },
  {
    name: "زرد",
    color: "#EAB308",
  },
  {
    name: "آبی",
    color: "#2563EB",
  },
  {
    name: "سبز",
    color: "#008A00",
  },
  {
    name: "نارنجی",
    color: "#FFA500",
  },
  {
    name: "صورتی",
    color: "#BA4081",
  },
  {
    name: "خاکستری",
    color: "#A8A29E",
  },
];

const HIGHLIGHT_COLORS: BubbleColorMenuItem[] = [
  {
    name: "پیشفرض",
    color: "var(--novel-highlight-default)",
  },
  {
    name: "بنفش",
    color: "var(--novel-highlight-purple)",
  },
  {
    name: "قرمز",
    color: "var(--novel-highlight-red)",
  },
  {
    name: "زرد",
    color: "var(--novel-highlight-yellow)",
  },
  {
    name: "آبی",
    color: "var(--novel-highlight-blue)",
  },
  {
    name: "سبز",
    color: "var(--novel-highlight-green)",
  },
  {
    name: "نارنجی",
    color: "var(--novel-highlight-orange)",
  },
  {
    name: "صورتی",
    color: "var(--novel-highlight-pink)",
  },
  {
    name: "خاکستری",
    color: "var(--novel-highlight-gray)",
  },
];

interface ColorSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ColorSelector = ({ open, onOpenChange }: ColorSelectorProps) => {
  const { editor } = useEditor();

  if (!editor) return null;
  const activeColorItem = TEXT_COLORS.find(({ color }) =>
    editor.isActive("textStyle", { color })
  );

  const activeHighlightItem = HIGHLIGHT_COLORS.find(({ color }) =>
    editor.isActive("highlight", { color })
  );

  return (
    <Popover modal={true} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button size="sm" className="gap-2 rounded-none" variant="ghost">
          <span
            className="rounded-sm px-1"
            style={{
              color: activeColorItem?.color,
              backgroundColor: activeHighlightItem?.color,
            }}
          >
            م
          </span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        sideOffset={5}
        className="my-1 flex max-h-80 w-48 flex-col overflow-hidden overflow-y-auto rounded border p-1 shadow-xl "
        align="start"
      >
        <div className="flex flex-col">
          <div className="my-1 px-2 text-sm font-semibold text-muted-foreground">
            رنگ نوشته
          </div>
          {TEXT_COLORS.map(({ name, color }) => (
            <EditorBubbleItem
              key={name}
              onSelect={() => {
                editor.commands.unsetColor();
                name !== "Default" &&
                  editor
                    .chain()
                    .focus()
                    .setColor(color || "")
                    .run();
                onOpenChange(false);
              }}
              className="flex cursor-pointer items-center justify-between px-2 py-1 text-sm hover:bg-accent"
            >
              <div className="flex items-center gap-2">
                <div
                  className="rounded-sm border px-2 py-px font-medium"
                  style={{ color }}
                >
                  م
                </div>
                <span>{name}</span>
              </div>
            </EditorBubbleItem>
          ))}
        </div>
        <div>
          <div className="my-1 px-2 text-sm font-semibold text-muted-foreground">
            رنگ زمینه
          </div>
          {HIGHLIGHT_COLORS.map(({ name, color }) => (
            <EditorBubbleItem
              key={name}
              onSelect={() => {
                editor.commands.unsetHighlight();
                name !== "Default" &&
                  editor.chain().focus().setHighlight({ color }).run();
                onOpenChange(false);
              }}
              className="flex cursor-pointer items-center justify-between px-2 py-1 text-sm hover:bg-accent"
            >
              <div className="flex items-center gap-2">
                <div
                  className="rounded-sm border px-2 py-px font-medium"
                  style={{ backgroundColor: color }}
                >
                  م
                </div>
                <span>{name}</span>
              </div>
              {editor.isActive("highlight", { color }) && (
                <Check className="h-4 w-4" />
              )}
            </EditorBubbleItem>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
