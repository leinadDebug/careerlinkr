interface BadgeProps {
  children: React.ReactNode;
}

export default function Badge({ children }: BadgeProps) {
  return (
    <span className="border bg-muted px-2 py-0.5 text-sm text-muted-foreground ">
      {children}
    </span>
  );
}
