import React from 'react';
import Modal from 'react-modal';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function TrainDetailModal({ data, modalOpen, setModalOpen, closeModal }) {

	const checkIsEmpty = (value) => {
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
					<td>{ checkIsEmpty(data.trainMaxSpeed) } km/h</td>
					<td>{ checkIsEmpty(data.trainMinCars) } cars</td>
					<td>{ checkIsEmpty(data.trainMaxCars) } cars</td>
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