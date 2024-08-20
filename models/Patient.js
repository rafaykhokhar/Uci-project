const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    name: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    medicalRecordNumber: { type: String, required: true, unique: true },
    insurancePolicyNumber: { type: String, required: true, unique: true },
    primaryCarePhysician: { type: String, required: true },
    dateOfVisit: { type: Date, required: true },
    insurance: { type: String, required: true },
    medicalHistory: {
        chronicConditions: [{ type: String }],
        pastMedicalHistory: [{ type: String }],
        surgicalHistory: [{ type: String }],
        allergies: [{ type: String }]
    },
    vitalSigns: {
        height: { type: String },
        weight: { type: String },
        BMI: { type: Number },
        bloodPressure: { type: String },
        heartRate: { type: String },
        respiratoryRate: { type: String },
        temperature: { type: String }
    },
    diabetesManagement: {
        diagnosis: { type: String },
        currentMedications: [{ type: String }],
        recentHemoglobinA1c: { type: String },
        bloodGlucoseMonitoring: {
            fastingBloodGlucose: { type: String },
            postprandialBloodGlucose: { type: String }
        }
    },
    lifestyleFactors: {
        diet: { type: String },
        exercise: { type: String },
        smokingStatus: { type: String },
        alcoholUse: { type: String }
    },
    physicalExamination: {
        generalAppearance: { type: String },
        cardiovascular: { type: String },
        respiratory: { type: String },
        abdomen: { type: String },
        extremities: { type: String }
    },
    laboratoryResults: {
        lipidProfile: {
            totalCholesterol: { type: String },
            LDL: { type: String },
            HDL: { type: String },
            triglycerides: { type: String }
        },
        kidneyFunctionTests: {
            serumCreatinine: { type: String },
            eGFR: { type: String }
        }
    },
    assessmentAndPlan: {
        assessment: [{ type: String }],
        plan: [{ type: String }]
    },
    followUp: {
        nextAppointment: { type: Date },
        physicianSignature: { type: String }
    }
}, { timestamps: true });

module.exports = mongoose.model('Patient', PatientSchema);
