import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment/moment.js';
import API from '../api/api.js';
const AddUserModal = ({ handleClose, show, setUsers }) => {
	const formRef = useRef(null);
	const [errorMessage, setErrorMessage] = useState('');

	const handleAddUser = async (e) => {
		e.preventDefault();
			try {
				const { data: res } = await API.post('/users' ,  {
				name: formRef.current.name.value.trim(),
				entryNum: formRef.current.entryNum.value.trim(),
				email: formRef.current.email.value.trim(),
			})

			if(res.status === 500){
				return setErrorMessage('User Exsit');		
			}
			setErrorMessage('');
			if (!formRef.current.name.value || !formRef.current.entryNum.value || !formRef.current.email.value)
				return setErrorMessage('Please Enter All Fields');
				if(res.status ===  200){
					setUsers((prev) => ({
						loading: false,
						error: false,
						data: [
							{
								name: formRef.current.name.value,
								entryNum: formRef.current.userName.value,
								email: formRef.current.email.value,
							...prev.data,
							}
						],
					}));
				}
			
	
			handleClose();
			} catch (error) {
				console.log("🚀 ~ file: AddUserModal.jsx ~ line 47 ~ handleAddUser ~ error", error)
				
			}
	
	};
	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header
					closeButton
					closeVariant="white"
					className="text-bg-primary"
				>
					<Modal.Title>Add New User</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleAddUser} ref={formRef}>
						<Form.Group className="mb-3">
							<Form.Label className="fw-bold"> Full Name</Form.Label>
							<Form.Control
								required
								placeholder="Enter Full Name"
								type="text"
								name="name"
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label className="fw-bold"> Entry Num</Form.Label>
							<Form.Control
								required
								placeholder="Enter entryNum"
								type="number"
								name="entryNum"
								variant="success"
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label className="fw-bold"> Email</Form.Label>
							<Form.Control
								required
								placeholder="Enter Email Address"
								type="email"
								name="email"
							/>
						</Form.Group>

						{/* <Form.Group className="mb-3">
							<Form.Label className="fw-bold"> User Group</Form.Label>
							<Form.Select required name="group">
								<option disabled>choose user group</option>
								<option value="Office">Office</option>
								<option value="Managers">Managers</option>
								<option value="HeadOffice">Head Office</option>
							</Form.Select>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label className="fw-bold"> Assign Profile</Form.Label>
							<Form.Select required name="profile">
								<option disabled>choose user profile</option>
								<option value="profile 1">profile 1</option>
								<option value="Profile 2">Profile 2</option>
								<option value="Profile 3">Profile 3</option>
							</Form.Select>
						</Form.Group> */}

						{errorMessage && (
							<Alert
								variant="danger"
								dismissible
								onClose={() => setErrorMessage('')}
							>
								{errorMessage}
							</Alert>
						)}
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="outline-secondary"
						className="me-auto"
						onClick={(e) => {
							formRef.current.reset();
							setErrorMessage('');
						}}
					>
						Reset feilds
					</Button>
					<Button variant="danger" onClick={handleClose}>
						Cancel
					</Button>
					<Button variant="success" onClick={handleAddUser}>
						Add User
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default AddUserModal;