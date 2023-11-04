import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddStudent() {
    const [inputData, setInputData] = useState({
        name: '',
        email: '',
        address: '',
        age: '',
        profile: null,
        documentImages: null,
    });

    const setStudentData = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    };

    const handleProfileImageChange = (e) => {
        setInputData({ ...inputData, profile: e.target.files[0] });
    };

    const handleDocumentImagesChange = (e) => {
        setInputData({ ...inputData, documentImages: e.target.files });
    };

    const addStudent = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', inputData.name);
        formData.append('email', inputData.email);
        formData.append('address', inputData.address);
        formData.append('age', inputData.age);

        if (inputData.profile) {
            formData.append('profile', inputData.profile);
        }

        if (inputData.documentImages) {
            for (const image of inputData.documentImages) {
                formData.append('documenetImg', image);
            }
        }

        try {
            const response = await axios.post('http://localhost:5000/addstud', formData);
            const data = response.data;

            if (response.status === 201) {
                toast.success('Student added successfully', {
                    position: 'top-center',
                    autoClose: 2000,
                });
            } else {
                toast.error('Failed to add student');
            }
        } catch (error) {
            toast.error('Error: Failed to add student');
        }
    };

    return (
        <div>
            <h2>Add Student</h2>
            <form onSubmit={addStudent}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={inputData.name}
                    onChange={setStudentData}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={inputData.email}
                    onChange={setStudentData}
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={inputData.address}
                    onChange={setStudentData}
                />
                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={inputData.age}
                    onChange={setStudentData}
                />
                <input
                    type="file"
                    name="profile"
                    // accept=".jpg, .jpeg, .png"
                    onChange={handleProfileImageChange}
                />
                <input
                    type="file"
                    name="documentImages"
                    // accept=".jpg, .jpeg, .png"
                    multiple
                    onChange={handleDocumentImagesChange}
                />
                <button type="submit">Add Student</button>
            </form>
            <ToastContainer />
        </div>
    );
}
