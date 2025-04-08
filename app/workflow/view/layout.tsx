export default function WorkflowViewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      {children}
    </div>
  );
} 