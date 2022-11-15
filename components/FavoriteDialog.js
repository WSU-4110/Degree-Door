import { useState }from 'react';
import Button from '@mui/material/button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { AiFillStar } from 'react-icons/ai'
import { AiOutlineStar } from 'react-icons/ai';

export default function FavoriteDialog({ customClick }) {
  const [open, setOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false)
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = async () => {
    const res = await customClick();
    setIsFavorite(res);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div 
        className="rounded px-4 mx-2 cursor-pointer text-4xl text-2x"
        onClick={handleClickOpen}
      >
        {isFavorite === true ? <AiFillStar color="orange"/> : <AiOutlineStar />}
      </div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {isFavorite === true ? "Success!" : "Removing from Favorites"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isFavorite === true ? "You are now following the degree!" : "You are no following the degree!"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
