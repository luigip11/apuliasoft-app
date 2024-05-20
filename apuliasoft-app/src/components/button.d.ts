interface ButtonProps {
  id?: string;
  aspect?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size: "regular" | "small";
  label: string;
  onlyIcon?: boolean;
  isLoading?: boolean;
  active?: boolean;
  disabled?: boolean;
  children?: any;
  onClick?: (e: any) => any;
}

export function Button(props: ButtonProps): any;
