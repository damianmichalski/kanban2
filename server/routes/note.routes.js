import { Router } from 'express';
import * as NoteController from '../controllers/note.controller';

const router = new Router();

// Add a new Note
router.route('/notes').post(NoteController.addNote);

// Change task note
router.route('/notes/:noteId').put(NoteController.changeTaskNote);

// Delete a Note by noteId
router.route('/notes/:noteId').delete(NoteController.deleteNote);

export default router;
