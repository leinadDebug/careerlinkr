interface BadgeProps {
  children: React.ReactNode;
}

export default function Badge({ children }: BadgeProps) {
  <div className="px-2 text-sm  border-2 bg-muted text-muted-foreground ">
    {children}
  </div>;
}
