# shadcn/ui Admin Dashboard Components

Successfully installed shadcn/ui components for your admin dashboard!

## Available Components

### Basic Components
- **Button** - Customizable button with variants (default, destructive, outline, secondary, ghost, link)
- **Card** - Container with header, title, description, content, and footer
- **Badge** - Status indicators with variants (default, secondary, destructive, success, outline)
- **Input** - Text input field
- **Select** - Dropdown select element

### Data Display
- **Table** - Data table with header, body, footer, and customizable rows/cells

### Dialogs & Menus
- **Dialog** - Modal dialog component
- **DropdownMenu** - Context menu with items, checkboxes, and separators

## Quick Start Examples

### Using a Button
```jsx
import { Button } from "@/components/ui";

export function MyComponent() {
  return (
    <Button variant="default" size="md">
      Click me
    </Button>
  );
}
```

### Using a Card
```jsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

export function MyCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        Card content goes here
      </CardContent>
    </Card>
  );
}
```

### Using a Table
```jsx
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui";

export function MyTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>john@example.com</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
```

### Using a Badge
```jsx
import { Badge } from "@/components/ui";

export function MyBadge() {
  return (
    <Badge variant="success">Active</Badge>
  );
}
```

### Using a DropdownMenu
```jsx
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from "@/components/ui";

export function MyDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Option 1</DropdownMenuItem>
        <DropdownMenuItem>Option 2</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

## Example Dashboard Component

See `src/components/AdminDashboardExample.jsx` for a complete working example that shows how to use multiple components together.

To use it in your app:
```jsx
import { AdminDashboardExample } from "@/components/AdminDashboardExample";

export default function App() {
  return <AdminDashboardExample />;
}
```

## Component Building Blocks

### Button Variants
- `default` - Primary button
- `destructive` - Red alert button
- `outline` - Bordered button
- `secondary` - Secondary button
- `ghost` - Transparent button
- `link` - Link-styled button

### Button Sizes
- `sm` - Small
- `md` - Medium (default)
- `lg` - Large
- `icon` - Icon-only button

### Badge Variants
- `default`
- `secondary`
- `destructive`
- `success`
- `outline`

## Styling

All components use Tailwind CSS classes with a slate color scheme. You can customize by:
1. Modifying the className prop
2. Editing the component files in `src/components/ui/`
3. Using Tailwind's utility classes directly

## Tips

- Use `cn()` utility from `@/lib/utils` to merge Tailwind classes safely
- All components support the `className` prop for custom styling
- Use `variant` and `size` props on Button and Badge for quick styling
- Components are fully accessible and keyboard-navigable
