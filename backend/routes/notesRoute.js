import express from "express";
import { addnote, deletenote, getallnotes, getnote, updatenote } from "../controllers/notesController.js";

import { protect } from "../middlewares/authmiddleware.js";

const router = express.Router();

router.post('/createnote', protect, addnote);
router.get('/getallnotes', protect, getallnotes);
router.get('/getnote/:id', getnote);
router.put('/updatenote/:id', protect, updatenote);
router.delete('/deletenote/:id', protect, deletenote)



export default router;