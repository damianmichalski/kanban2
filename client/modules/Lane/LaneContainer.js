import { connect } from 'react-redux';
import Lane from './Lane';
import { createLaneRequest, deleteLaneRequest, updateLaneRequest, editLane, fetchLanes, moveBetweenLanes } from './LaneActions';
import { createNoteRequest, moveWithinLane } from '../Note/NoteActions';

import { compose } from 'redux';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../Kanban/itemTypes';

const mapStateToProps = (state, ownProps) => {
    return {
        laneNotes: ownProps.lane.notes.map(noteId => state.notes[noteId])
    };
};

const mapDispatchToProps = {
    editLane,
    deleteLane: deleteLaneRequest,
    updateLane: updateLaneRequest,
    addNote: createNoteRequest,
    createLane: createLaneRequest,
    moveBetweenLanes,
    moveWithinLane
};

const noteTarget = {
    //jeśli zostawimy hover to zaczyna dublować notki
    // hover(targetProps, monitor) {
    //     const sourceProps = monitor.getItem();
    //     const { id: noteId, laneId: sourceLaneId } = sourceProps;

    //     if (!targetProps.lane.notes.length) {
    //         targetProps.moveBetweenLanes(
    //             targetProps.lane.id,
    //             noteId,
    //             sourceLaneId,
    //         );
    //     }
    // },
    drop(targetProps, monitor) {
        const sourceProps = monitor.getItem();
        const { id: noteId, laneId: sourceLaneId } = sourceProps;
       
        if(sourceLaneId !== targetProps.lane.id) {
            targetProps.moveBetweenLanes(targetProps.lane.id, noteId, sourceLaneId);
        } 
        else {
            targetProps.moveWithinLane(targetProps.lane.id, noteId, sourceLaneId);
        }
        console.log("lane drop container", targetProps);
    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    DropTarget(ItemTypes.NOTE, noteTarget, (dragConnect) => ({
        connectDropTarget: dragConnect.dropTarget()
    }))
)(Lane);