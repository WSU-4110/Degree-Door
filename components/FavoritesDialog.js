import { useState } from 'react'
import {  Button, Dialog, DialogActions, DialogContent,
DialogContentText, DialogTitle, useMediaQuery, useTheme } from '@mui/material'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore'

import { useAuthContext } from '../context/AuthContext'
import { db } from '../firebase'

export default function FavoritesDialog({degree, initFavState}) {
  const { user } = useAuthContext()
  const [open, setOpen] = useState(false) // State to determine if the dialog is open
  const [isFavorite, setIsFavorite] = useState(initFavState) // State to determine if the degree is favorited
  const theme = useTheme() // Theme object to gather styling of the DOM element
  const fullScreen = useMediaQuery(theme.breakpoints.down('md')) // Media query to make dialog full screen

  // Handles opening the dialog and either setting or removing the dialog as a favorite
  async function handleFavorites() {
    const favRef = doc(db,`Users/${user.uid}/Favorites`,`${degree}`)
    const favSnap = await getDoc(favRef)
    if (!favSnap.exists()) {
      const degreeRef = doc(db, "Degrees", `${degree}`); // Create doc reference
      const degreeSnap = await getDoc(degreeRef); // Get document snapshot from firestore
      const degreeData = JSON.parse(JSON.stringify(degreeSnap.data()));

      const favoriteData = {
        degreeName: degreeData.degreeName,
        description: degreeData.description
      }

      await setDoc(favRef, favoriteData)
      return true;
    }

    await deleteDoc(docRef)
    return false;
  }

  const handleClickOpen = async () => {
    const res = await handleFavorites() // Function to favoriting the state
    setIsFavorite(res)
    setOpen(true)
  }

  // Handles closing the dialog
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div className="dialog-wrapper">
      <div className="cursor-pointer" onClick={() => handleClickOpen()}>
        {/* Conditionally render either a filled start or an empty star*/}
        {isFavorite === true ? <AiFillStar className="text-3xl" color="#de9b61"/> : <AiOutlineStar className="text-3xl"/>}
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