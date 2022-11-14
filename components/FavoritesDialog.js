import { useState } from 'react'
import {  Button, Dialog, DialogActions, DialogContent,
DialogContentText, DialogTitle, useMediaQuery, useTheme } from '@mui/material'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

export default function FavoritesDialog({ favoriteHandler, initFavState}) {
  const [open, setOpen] = useState(false) // State to determine if the dialog is open
  const [isFavorite, setIsFavorite] = useState(initFavState) // State to determine if the degree is favorited
  const theme = useTheme() // Theme object to gather styling of the DOM element
  const fullScreen = useMediaQuery(theme.breakpoints.down('md')) // Media query to make dialog full screen

  // Handles opening the dialog and either setting or removing the dialog as a favorite
  const handleClickOpen = async () => {
    const res = await favoriteHandler() // Function to favoriting the state
    setIsFavorite(res)
    setOpen(true)
  }

  // Handles closing the dialog
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div className="dialog-wrapper">
      <div className="cursor-pointer" onClick={handleClickOpen}>
        {/* Conditionally render either a filled start or an empty star*/}
        {isFavorite === true ? <AiFillStar className="text-3xl" color="orange"/> : <AiOutlineStar className="text-3xl"/>}
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
  )
}