require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Patient = require('./models/Patient');

// Connect to the database
connectDB();

async function addPatients() {
    const patients = [
        // Patient A: Kristen Derkston
        {
            name: "Kristen Derkston",
            dateOfBirth: new Date("1988-10-02"),
            gender: "Female",
            age: 36,
            medicalRecordNumber: "9876652",
            insurancePolicyNumber: "BCBS123",
            primaryCarePhysician: "Dr. Mark Mackenzie",
            dateOfVisit: new Date("2024-08-20"),
            insurance: "Blue Cross/Blue Shield",
            medicalHistory: {
                chronicConditions: ["Type 2 Diabetes Mellitus", "Hyperlipidemia"],
                pastMedicalHistory: [],
                surgicalHistory: [],
                allergies: ["No known drug allergies"],
                familyHistory: [] // Assuming no family history provided
            },
            vitalSigns: {
                height: "Not available", // Not provided
                weight: "Not available", // Not provided
                BMI: 0, // Not provided
                bloodPressure: "119/84",
                heartRate: "78",
                respiratoryRate: "16",
                temperature: "98.1F"
            },
            diabetesManagement: {
                diagnosis: "Type 2 Diabetes Mellitus",
                currentMedications: ["Metformin 1000 mg twice daily", "Atorvastatin 20mg daily"],
                recentHemoglobinA1c: "7.3% (7/6/2024)",
                bloodGlucoseMonitoring: {
                    fastingBloodGlucose: "111 mg/dL (7/6/2024)",
                    postprandialBloodGlucose: "Not available",
                    timeInRange: "Not available" // Not provided
                }
            },
            lifestyleFactors: {
                diet: "Not available", // Not provided
                exercise: "Not available", // Not provided
                smokingStatus: "Not available", // Not provided
                alcoholUse: "Not available", // Not provided
                occupation: "Not available" // Not provided
            },
            physicalExamination: {
                generalAppearance: "Patient is well-nourished, alert and oriented.",
                cardiovascular: "Not available", // Not provided
                respiratory: "Not available", // Not provided
                abdomen: "Not available", // Not provided
                extremities: "Not available", // Not provided
                relevantFindings: ["No signs of acute distress. Examination findings are otherwise within normal limits."]
            },
            laboratoryResults: {
                lipidProfile: {
                    totalCholesterol: "Not available", // Not provided
                    LDL: "Not available", // Not provided
                    HDL: "Not available", // Not provided
                    triglycerides: "Not available" // Not provided
                },
                kidneyFunctionTests: {
                    serumCreatinine: "Not available", // Not provided
                    eGFR: "Not available" // Not provided
                },
                hepaticPanel: {
                    AST: "Not available", // Not provided
                    ALT: "Not available", // Not provided
                    ALP: "Not available", // Not provided
                    bilirubin: "Not available" // Not provided
                }
            },
            assessmentAndPlan: {
                assessment: [
                    "Type 2 Diabetes Mellitus: Suboptimal HgbA1c levels.",
                    "Delayed Menstrual Cycle: Recent change in menstrual cycle may be related to metabolic disturbances or other endocrine issues; further evaluation may be necessary."
                ],
                plan: [
                    "Initiate Ozempic (Semaglutide) Therapy: Considering the patient's difficulty achieving glycemic control with current therapy the addition of Ozempic is indicated.",
                    "Evaluate Menstrual Irregularity: Recommend gynecological evaluation to rule out possible endocrine or other underlying issues affecting menstrual cycle.",
                    "Schedule follow-up visit in [number] weeks to assess response to new medication and adjust treatment plan as needed."
                ],
                riskForPancreatitis: false, // Assuming not relevant for this patient
                potentialRisks: ["Possibility of pregnancy should be considered."] // Assuming additional risk
            },
            followUp: {
                nextAppointment: new Date("2024-09-20"), // Assuming follow-up in 4 weeks
                physicianSignature: "Dr. Richard Listonbon MD",
                followUpRecommendations: ["Monitor blood glucose levels and menstrual cycle, reassess in 4 weeks."]
            }
        },
        // Patient B: Jack Gonzales
        {
            name: "Jack Gonzales",
            dateOfBirth: new Date("1990-03-01"), // Assuming approximate date
            gender: "Male",
            age: 34,
            medicalRecordNumber: "JG342",
            insurancePolicyNumber: "UHC456",
            primaryCarePhysician: "Dr. Sarah Martin",
            dateOfVisit: new Date("2024-08-20"),
            insurance: "United Health Care PPO",
            medicalHistory: {
                chronicConditions: ["Type 1 Diabetes Mellitus", "Mild Diabetic Retinopathy", "Celiac Disease"],
                pastMedicalHistory: [],
                surgicalHistory: [],
                allergies: ["No known drug allergies"],
                familyHistory: [] // Assuming no family history provided
            },
            vitalSigns: {
                height: "180 cm",
                weight: "85 kg",
                BMI: 26.2,
                bloodPressure: "120/75",
                heartRate: "70",
                respiratoryRate: "14",
                temperature: "98.0F"
            },
            diabetesManagement: {
                diagnosis: "Type 1 Diabetes Mellitus",
                currentMedications: ["Insulin: Tandem insulin pump with Humalog approximately 40 units per day."],
                recentHemoglobinA1c: "7.5% (2024)",
                bloodGlucoseMonitoring: {
                    fastingBloodGlucose: "130 mg/dL",
                    postprandialBloodGlucose: "180-200 mg/dL",
                    timeInRange: "65%"
                }
            },
            lifestyleFactors: {
                diet: "Adheres to a gluten-free diet with a focus on low-carb meals for blood glucose management.",
                exercise: "Moderately active; enjoys cycling on weekends and walks daily.",
                smokingStatus: "Never smoked",
                alcoholUse: "Occasional 1-2 drinks per month",
                occupation: "Software Developer"
            },
            physicalExamination: {
                generalAppearance: "Patient is alert and oriented.",
                cardiovascular: "Normal heart sounds, no murmurs.",
                respiratory: "Clear to auscultation bilaterally.",
                abdomen: "Soft, non-tender, no hepatomegaly.",
                extremities: "No edema, pulses intact.",
                relevantFindings: []
            },
            laboratoryResults: {
                lipidProfile: {
                    totalCholesterol: "180 mg/dL",
                    LDL: "95 mg/dL",
                    HDL: "50 mg/dL",
                    triglycerides: "140 mg/dL"
                },
                kidneyFunctionTests: {
                    serumCreatinine: "0.9 mg/dL",
                    eGFR: "90 mL/min/1.73 m²"
                },
                hepaticPanel: {
                    AST: "Not available", // Not provided
                    ALT: "Not available", // Not provided
                    ALP: "Not available", // Not provided
                    bilirubin: "Not available" // Not provided
                }
            },
            assessmentAndPlan: {
                assessment: [
                    "Type 1 Diabetes Mellitus with suboptimal glycemic control.",
                    "Mild Diabetic Retinopathy: Requires ongoing ophthalmologic monitoring.",
                    "Celiac Disease: Well-managed with a strict gluten-free diet."
                ],
                plan: [
                    "Consideration of Ozempic (Semaglutide) Therapy: Initiate Ozempic at 0.25 mg weekly with a plan to increase the dose gradually to 2.5 mg as tolerated.",
                    "Continue current insulin regimen via Tandem insulin pump, adjust insulin dosages as needed.",
                    "Follow-up in 4-6 weeks to assess the patient's response to Ozempic and adjust treatment plan as necessary."
                ],
                riskForPancreatitis: false, // Assuming not relevant for this patient
                potentialRisks: []
            },
            followUp: {
                nextAppointment: new Date("2024-10-01"), // Assuming follow-up in 6 weeks
                physicianSignature: "Dr. Sarah Martin",
                followUpRecommendations: ["Monitor blood glucose levels closely, reassess retinopathy and celiac disease management."]
            }
        },
        // Patient C: Linda Patel
        {
            name: "Linda Patel",
            dateOfBirth: new Date("1972-03-15"), // Assuming approximate date
            gender: "Female",
            age: 52,
            medicalRecordNumber: "LP522",
            insurancePolicyNumber: "CIGNA789",
            primaryCarePhysician: "Dr. Amanda Lee",
            dateOfVisit: new Date("2024-08-20"),
            insurance: "Cigna EPO",
            medicalHistory: {
                chronicConditions: ["Type 2 Diabetes", "Hypertension", "Hyperlipidemia"],
                pastMedicalHistory: ["Family history of medullary thyroid cancer."],
                surgicalHistory: [],
                allergies: ["No known drug allergies"],
                familyHistory: ["Mother passed away from medullary thyroid cancer at age 65."]
            },
            vitalSigns: {
                height: "165 cm",
                weight: "90 kg",
                BMI: 33,
                bloodPressure: "130/85",
                heartRate: "78",
                respiratoryRate: "16",
                temperature: "98.4F"
            },
            diabetesManagement: {
                diagnosis: "Type 2 Diabetes",
                currentMedications: ["Metformin 1000 mg twice daily", "Atorvastatin 20 mg once daily", "Lisinopril 10 mg once daily"],
                recentHemoglobinA1c: "8.2%",
                bloodGlucoseMonitoring: {
                    fastingBloodGlucose: "150 mg/dL",
                    postprandialBloodGlucose: "200 mg/dL",
                    timeInRange: "Not available" // Not provided
                }
            },
            lifestyleFactors: {
                diet: "Patient attempts a low-carbohydrate diet but struggles with consistency.",
                exercise: "Sedentary lifestyle; occasional walking but no regular exercise routine.",
                smokingStatus: "Never smoked",
                alcoholUse: "Social drinker 1-2 drinks per week",
                occupation: "Office Manager"
            },
            physicalExamination: {
                generalAppearance: "Overweight, appears well-nourished.",
                cardiovascular: "Regular rhythm, no murmurs.",
                respiratory: "Clear breath sounds bilaterally.",
                abdomen: "Soft, non-tender.",
                extremities: "No edema, pulses intact.",
                relevantFindings: []
            },
            laboratoryResults: {
                lipidProfile: {
                    totalCholesterol: "210 mg/dL",
                    LDL: "110 mg/dL",
                    HDL: "50 mg/dL",
                    triglycerides: "180 mg/dL"
                },
                kidneyFunctionTests: {
                    serumCreatinine: "0.9 mg/dL",
                    eGFR: "85 mL/min/1.73 m²"
                },
                hepaticPanel: {
                    AST: "Not available", // Not provided
                    ALT: "Not available", // Not provided
                    ALP: "Not available", // Not provided
                    bilirubin: "Not available" // Not provided
                }
            },
            assessmentAndPlan: {
                assessment: [
                    "Type 2 Diabetes: Suboptimal control with current therapy.",
                    "Hypertension and Hyperlipidemia: Managed with current medications.",
                    "Family history of medullary thyroid cancer: Monitor closely."
                ],
                plan: [
                    "Introduction of Ozempic (Semaglutide) Therapy: Initiate with 0.25 mg once weekly, gradually increasing to 2.4 mg.",
                    "Dietary and Lifestyle Interventions: Referral to a dietitian for personalized low-carbohydrate diet planning and encourage regular physical activity.",
                    "Follow-up in 4 weeks to assess the patient’s response to Ozempic and make necessary adjustments."
                ],
                riskForPancreatitis: false, // Assuming not relevant for this patient
                potentialRisks: ["Monitor for signs of thyroid cancer given family history."]
            },
            followUp: {
                nextAppointment: new Date("2024-09-20"), // Assuming follow-up in 4 weeks
                physicianSignature: "Dr. Amanda Lee",
                followUpRecommendations: ["Reassess metabolic control and monitor for any signs of thyroid issues."]
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
