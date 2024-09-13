import React, { ReactNode } from "react";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
interface MenuComponentProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  menuItems: { label: string; icon: ReactNode; action: () => void }[];
}

const MenuComponent: React.FC<MenuComponentProps> = ({
  anchorEl,
  open,
  onClose,
  menuItems,
}) => {
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      {menuItems.map((item, index) => (
        <MenuItem key={index} onClick={item.action}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </MenuItem>
      ))}
    </Menu>
  );
};

export default MenuComponent;
