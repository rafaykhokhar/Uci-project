const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

const { summarizePatientInfo, predictMedicationApproval } = require('../services/aiService');

// Add a new patient
router.post('/add', async (req, res) => {
    try {
        const newPatient = new Patient(req.body);
        await newPatient.save();
        res.status(201).json(newPatient);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get patient information by medical record number
router.get('/:medicalRecordNumber', async (req, res) => {
    try {
        const patient = await Patient.findOne({ medicalRecordNumber: req.params.medicalRecordNumber });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json(patient);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update patient information
router.put('/:medicalRecordNumber', async (req, res) => {
    try {
        const updatedPatient = await Patient.findOneAndUpdate(
            { medicalRecordNumber: req.params.medicalRecordNumber },
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedPatient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json(updatedPatient);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a patient record
router.delete('/:medicalRecordNumber', async (req, res) => {
    try {
        const deletedPatient = await Patient.findOneAndDelete({ medicalRecordNumber: req.params.medicalRecordNumber });
        if (!deletedPatient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json({ message: 'Patient record deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint to summarize patient information
router.get('/:medicalRecordNumber/summarize', async (req, res) => {
    try {
        const patient = await Patient.findOne({ medicalRecordNumber: req.params.medicalRecordNumber });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        const summary = await summarizePatientInfo(patient);
        res.status(200).json({ summary });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint to predict medication approval
// Endpoint to predict medication approval
router.post('/:medicalRecordNumber/predict-approval', async (req, res) => {
    try {
        const patient = await Patient.findOne({ medicalRecordNumber: req.params.medicalRecordNumber });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        const recommendedMedication = req.body.recommendedMedication;
        const insuranceType = req.body.insuranceType;  // Add this line to receive insuranceType from the request body

        const prediction = await predictMedicationApproval(patient, recommendedMedication, insuranceType);
        res.status(200).json({ prediction });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
