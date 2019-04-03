import React from 'react';
import PropTypes from 'prop-types';
import NotesContainer from '../Note/NotesContainer';
import Edit from '../../components/Edit';
import { editLane } from './LaneActions';

import styles from './Lane.css';

class Lane extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
	}

  render() {
  const { connectDropTarget, lane, laneNotes, updateLane, addNote, deleteLane, editLane } = this.props;
  const laneId = lane.id;
 
  return connectDropTarget(
    <div className={styles.Lane}>
      <div className={styles.LaneHeader}>
        
        <Edit
          className={styles.LaneName}
          editing={lane.editing}
          value={lane.name}
          onValueClick={() => editLane(lane.id)}

          onUpdate={name => updateLane({ ...lane, name, editing: false })}
        />
		<div className={styles.ButtonsContainer}>
          <button className={styles.LaneButton} onClick={() => addNote({ task: "New Note"}, laneId)}>Add Note</button>
          <button className={styles.LaneButton} onClick={() => deleteLane(laneId)}>Remove Lane</button>
        </div>
      </div>
      <NotesContainer
        notes={laneNotes}
        laneId={laneId}
      />
    </div>
  );
}
};

Lane.propTypes = {
  lane: PropTypes.object,
  laneNotes: PropTypes.array,
  addNote: PropTypes.func,
  updateLane: PropTypes.func,
  deleteLane: PropTypes.func,
};

export default Lane;
