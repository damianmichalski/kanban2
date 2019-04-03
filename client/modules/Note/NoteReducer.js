// Import Actions
import { CREATE_NOTE, CREATE_NOTES, UPDATE_NOTE, DELETE_NOTE, EDIT_NOTE } from './NoteActions';

import omit from 'lodash/omit';

// Initial State
const initialState = {};

export default function notes(state = initialState, action) {
	switch (action.type) {
		case CREATE_NOTE:
		case UPDATE_NOTE:
			return { ...state, [action.note.id]: action.note };
		case EDIT_NOTE: {
			const note = { ...state[action.noteId], editing: true };
			return { ...state, [action.noteId]: note };
		}
		case DELETE_NOTE:
			return omit(state, action.noteId);
		case CREATE_NOTES:
			return { ...action.notes };
		default:
			return state;
	}
}
