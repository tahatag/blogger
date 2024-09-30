import AdvancedEditor from "@/components/editor/advanced-editor";

export default async function NewPost() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-4 py-4 sm:px-5">
      <AdvancedEditor />
    </div>
  );
}
