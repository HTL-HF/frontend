import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import { Menu, MenuItem } from "@mui/material";
interface FormItemProps {
  form: { id: number; name: string };
  anchorEl: HTMLElement | null;
  selectedFormId: number | null;
  onClose: () => void;
  onDelete: () => void;
  onShare: () => void;
}

const FormMenu: React.FC<FormItemProps> = ({
  form,
  selectedFormId,
  anchorEl,
  onClose,
  onDelete,
  onShare,
}) => {
  const open = Boolean(anchorEl && selectedFormId === form.id);

  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      <MenuItem onClick={onDelete}>
        <DeleteIcon style={{ marginRight: 8 }} /> Delete
      </MenuItem>
      <MenuItem onClick={onShare}>
        <ShareIcon style={{ marginRight: 8 }} /> Share
      </MenuItem>
    </Menu>
  );
};

export default FormMenu;
