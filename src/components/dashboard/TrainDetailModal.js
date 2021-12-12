import React from 'react';
import Modal from 'react-modal';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function TrainDetailModal({ data, modalOpen, setModalOpen, closeModal }) {

	const checkIsNull = (value) => {
		if (value === null || value === 'undefined') return '-';
		else return value;
	};

	return (
		<Modal
			isOpen={modalOpen}
			onRequestClose={closeModal}
			shouldCloseOnOverlayClick={false}
		>
			<Table striped bordered  hover responsive="sm">
				<thead>
				<tr>
					<th>Train Max Speed</th>
					<th>Number of Minimum Cars</th>
					<th>Number of Maximum Cars</th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td>{ checkIsNull(data.trainMaxSpeed) } km/h</td>
					<td>{ checkIsNull(data.trainMinCars) } cars</td>
					<td>{ checkIsNull(data.trainMaxCars) } cars</td>
				</tr>
				</tbody>
			</Table>
			<div>
			<Button onClick={() => setModalOpen(false) }>Close</Button>
			</div>
		</Modal>
	);
}

export default TrainDetailModal