"use client";

import "@blocknote/core/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useEdgeStore } from "@/lib/edgestore";

interface EditorProps {
  onChange?: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

export default function Editor({
  onChange,
  initialContent,
  editable,
}: EditorProps) {
  const { edgestore } = useEdgeStore();

  // Creates a new editor instance
  const editor = useCreateBlockNote({
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
    uploadFile: async (file) => {
      const response = await edgestore.publicFiles.upload({
        file,
      });
      return response.url;
    },
  });

  // Add onChange handler after editor is created
  if (onChange) {
    editor.onChange(() => {
      const content = editor.document;
      onChange(JSON.stringify(content, null, 2));
    });
  }

  // Renders the editor instance using the BlockNote component
  return (
    <div className="relative min-h-[500px] w-full bg-background">
      <BlockNoteView
        editor={editor}
        theme="light"
        editable={editable ?? true}
      />
    </div>
  );
}
