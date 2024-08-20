require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Patient = require('./models/Patient');

// Connect to the database
connectDB();

async function addPatients() {
    const patients = [
        {
            name: "Jane Doe",
            dateOfBirth: new Date("1980-03-15"),
            gender: "Female",
            age: 44,
            medicalRecordNumber: "01",
            insurancePolicyNumber: "BS123", // Unique insurance policy number
            primaryCarePhysician: "Dr. John Smith",
            dateOfVisit: new Date("2024-08-13"),
            insurance: "Blue Shield of California",
            medicalHistory: {
                chronicConditions: [
                    "Type 2 Diabetes Mellitus",
                    "Obesity (BMI: 30)"
                ],
                pastMedicalHistory: [
                    "Hypertension (controlled with medication)",
                    "Hyperlipidemia (high cholesterol)"
                ],
                surgicalHistory: [
                    "Appendectomy (2005)"
                ],
                allergies: [
                    "No known drug allergies"
                ]
            },
            vitalSigns: {
                height: "5 feet 6 inches (167 cm)",
                weight: "180 lbs (81.6 kg)",
                BMI: 30,
                bloodPressure: "130/85 mmHg",
                heartRate: "78 bpm",
                respiratoryRate: "16 breaths/min",
                temperature: "98.6°F (37°C)"
            },
            diabetesManagement: {
                diagnosis: "Type 2 Diabetes Mellitus (diagnosed in 2015)",
                currentMedications: [
                    "Metformin 1000 mg twice daily",
                    "Lisinopril 10 mg daily (for hypertension)",
                    "Atorvastatin 20 mg daily (for hyperlipidemia)"
                ],
                recentHemoglobinA1c: "8.2% (as of July 2024)",
                bloodGlucoseMonitoring: {
                    fastingBloodGlucose: "160 mg/dL",
                    postprandialBloodGlucose: "180 mg/dL"
                }
            },
            lifestyleFactors: {
                diet: "Moderately adheres to a diabetic-friendly diet with high carbohydrate intake.",
                exercise: "Engages in 30 minutes of brisk walking when she feels like it",
                smokingStatus: "Non-smoker",
                alcoholUse: "Occasional (1-2 drinks per week)"
            },
            physicalExamination: {
                generalAppearance: "Overweight, appears well-nourished",
                cardiovascular: "Regular rhythm, no murmurs",
                respiratory: "Clear breath sounds bilaterally",
                abdomen: "Soft, non-tender, no hepatomegaly or splenomegaly",
                extremities: "No edema, pulses intact"
            },
            laboratoryResults: {
                lipidProfile: {
                    totalCholesterol: "210 mg/dL",
                    LDL: "130 mg/dL",
                    HDL: "50 mg/dL",
                    triglycerides: "160 mg/dL"
                },
                kidneyFunctionTests: {
                    serumCreatinine: "0.8 mg/dL",
                    eGFR: "90 mL/min/1.73 m²"
                }
            },
            assessmentAndPlan: {
                assessment: [
                    "Type 2 Diabetes Mellitus, suboptimal glycemic control (A1c 8.2%)",
                    "Obesity (BMI 30), contributing to diabetes and hypertension",
                    "Hypertension and hyperlipidemia, well-managed with current medications"
                ],
                plan: [
                    "Continue current medications. Consider adding a GLP-1 receptor agonist for better glycemic control and potential weight loss. Schedule follow-up A1c test in 3 months.",
                    "Recommend dietary counseling with a registered dietitian. Increase physical activity to 150 minutes per week. Consider referral to a weight management specialist if no significant progress is noted.",
                    "Continue lisinopril and atorvastatin. Recheck lipid profile and blood pressure in 3 months.",
                    "Annual eye exam to screen for diabetic retinopathy. Foot exam every 6 months to check for diabetic complications. Encourage routine screening for diabetic nephropathy."
                ]
            },
            followUp: {
                nextAppointment: new Date("2024-11-13"),
                physicianSignature: "Dr. John Smith, MD"
            }
        },
        {
            name: "Michael Brown",
            dateOfBirth: new Date("1985-07-22"),
            gender: "Male",
            age: 39,
            medicalRecordNumber: "02",
            insurancePolicyNumber: "BS124", // Unique insurance policy number
            primaryCarePhysician: "Dr. Emily Carter",
            dateOfVisit: new Date("2024-08-13"),
            insurance: "Blue Shield of California",
            medicalHistory: {
                chronicConditions: [
                    "Overweight (BMI: 29), No diagnosis of diabetes"
                ],
                pastMedicalHistory: [
                    "No history of diabetes, cardiovascular disease, or chronic illnesses"
                ],
                surgicalHistory: [
                    "No previous surgeries"
                ],
                allergies: [
                    "No known drug allergies"
                ]
            },
            vitalSigns: {
                height: "6 feet (183 cm)",
                weight: "220 lbs (100 kg)",
                BMI: 29,
                bloodPressure: "125/80 mmHg",
                heartRate: "72 bpm",
                respiratoryRate: "18 breaths/min",
                temperature: "98.7°F (37°C)"
            },
            lifestyleFactors: {
                diet: "Reports an average diet with frequent fast-food consumption and occasional home-cooked meals. Interested in improving eating habits.",
                exercise: "Sedentary lifestyle; no regular exercise routine",
                smokingStatus: "Non-smoker",
                alcoholUse: "Social drinker (2-3 drinks per week)"
            },
            physicalExamination: {
                generalAppearance: "Overweight, appears well-nourished",
                cardiovascular: "Regular rhythm, no murmurs or irregularities",
                respiratory: "Clear breath sounds bilaterally",
                abdomen: "Soft, non-tender, no signs of hepatomegaly or splenomegaly",
                extremities: "No edema, pulses intact"
            },
            laboratoryResults: {
                lipidProfile: {
                    totalCholesterol: "210 mg/dL",
                    LDL: "140 mg/dL",
                    HDL: "45 mg/dL",
                    triglycerides: "170 mg/dL"
                },
                kidneyFunctionTests: {
                    serumCreatinine: "1.9 mg/dL",
                    eGFR: "92 mL/min/1.73 m²"
                }
            },
            assessmentAndPlan: {
                assessment: [
                    "Overweight (BMI 29), with potential risk factors for developing metabolic syndrome or other health issues",
                    "Lipid profile indicates elevated LDL and triglycerides, requiring lifestyle modification"
                ],
                plan: [
                    "Recommend a comprehensive weight loss program, including dietary counseling with a registered dietitian and a structured exercise plan. Aim for gradual weight loss of 1-2 lbs per week.",
                    "Advise dietary changes to reduce cholesterol and triglycerides. Encourage increased physical activity to improve lipid profile. Consider follow-up lipid profile in 3 months.",
                    "Regular monitoring of blood pressure and lipid levels. Schedule annual physical exams and encourage routine screenings for cardiovascular health."
                ]
            },
            followUp: {
                nextAppointment: new Date("2024-11-13"),
                physicianSignature: "Dr. Emily Carter, MD"
            }
        }
    ];

    try {
        for (const patientData of patients) {
            // Ensure insurancePolicyNumber is not null or undefined
            if (!patientData.insurancePolicyNumber) {
                console.error(`Skipping patient ${patientData.name} due to missing insurancePolicyNumber.`);
                continue;
            }

            // Check for duplicate insurancePolicyNumber
            const existingPatient = await Patient.findOne({ insurancePolicyNumber: patientData.insurancePolicyNumber });
            if (existingPatient) {
                console.error(`Duplicate insurancePolicyNumber found for patient ${patientData.name}. Skipping.`);
                continue;
            }

            const newPatient = new Patient(patientData);
            await newPatient.save();
            console.log(`Patient ${newPatient.name} saved successfully.`);
        }
        mongoose.connection.close(); // Close connection after operation
    } catch (err) {
        console.error('Error saving patients:', err.message);
        mongoose.connection.close(); // Close connection on error
    }
}

addPatients();
