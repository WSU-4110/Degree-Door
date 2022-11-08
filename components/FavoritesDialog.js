import { useState } from 'react'
import {  Button, Dialog, DialogActions, DialogContent,
DialogContentText, DialogTitle, useMediaQuery, useTheme } from '@mui/material'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

export default function FavoritesDialog({ favoriteHandler, initFavState}) {
  const [open, setOpen] = useState(false) // State to determine if the dialog is open
  const [isFavorite, setIsFavorite] = useState({initFavState}) // State to determine if the degree is favorited
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
      <div 
        className="icon-wrapper rounded px-4 mx-2 cursor-pointer text-4xl"
        onClick={handleClickOpen}
      >
        {/* Conditionally render either a filled start or an empty star*/}
        {isFavorite === true ? <AiFillStar color="orange"/> : <AiOutlineStar />}
      </div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
      </Dialog>
    </div>
  )
}