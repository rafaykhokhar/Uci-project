const OpenAI = require('openai');
// Configure the OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Ensure your .env file has the correct API key format
});

// Function to summarize patient information
async function summarizePatientInfo(patientData) {
    const messages = [
        {
            role: "system",
            content: "You are a medical assistant summarizing patient data."
        },
        {
            role: "user",
            content: `
            Summarize the following patient information into three key points that a doctor should consider before prescribing medication:
            
            Patient Information:
            - Name: ${patientData.name}
            - Age: ${patientData.age}
            - Gender: ${patientData.gender}
            - Chronic Conditions: ${patientData.medicalHistory.chronicConditions.join(', ') || 'None'}
            - Prior Medications: ${patientData.diabetesManagement.currentMedications.join(', ') || 'None'}
            - Surgical History: ${patientData.medicalHistory.surgicalHistory.join(', ') || 'None'}
            - Allergies: ${patientData.medicalHistory.allergies.join(', ') || 'None'}
            `
        }
    ];

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",  
            messages: messages,
            max_tokens: 150,
        });

        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error with OpenAI API:', error);
        throw new Error('Failed to summarize patient information');
    }
}

async function predictMedicationApproval(patientData, recommendedMedication, insuranceType) {
    const messages = [
        {
            role: "system",
            content: "You are a medical assistant evaluating medication approval."
        },
        {
            role: "user",
            content: `
            Based on the following patient information, medical history, assessment and plan, and the recommended medication, predict if the medication is likely to be approved for prior authorization. 
            Provide a concise answer in 2-3 lines with a clear yes or no and a brief reason.

            Patient Information:
            - Name: ${patientData.name}
            - Age: ${patientData.age}
            - Gender: ${patientData.gender}
            - Chronic Conditions: ${patientData.medicalHistory.chronicConditions.join(', ') || 'None'}
            - Past Medical History: ${patientData.medicalHistory.pastMedicalHistory.join(', ') || 'None'}
            - Surgical History: ${patientData.medicalHistory.surgicalHistory.join(', ') || 'None'}
            - Allergies: ${patientData.medicalHistory.allergies.join(', ') || 'None'}
            - Family History: ${patientData.medicalHistory.familyHistory.join(', ') || 'None'}
            - Insurance Provider: ${patientData.insurance}
            - Insurance Type: ${insuranceType}

            Vital Signs:
            - Height: ${patientData.vitalSigns.height || 'Not available'}
            - Weight: ${patientData.vitalSigns.weight || 'Not available'}
            - BMI: ${patientData.vitalSigns.BMI || 'Not available'}
            - Blood Pressure: ${patientData.vitalSigns.bloodPressure || 'Not available'}
            - Heart Rate: ${patientData.vitalSigns.heartRate || 'Not available'}
            - Respiratory Rate: ${patientData.vitalSigns.respiratoryRate || 'Not available'}
            - Temperature: ${patientData.vitalSigns.temperature || 'Not available'}

            Laboratory Results:
            ${patientData.laboratoryResults.lipidProfile ? `
            - Lipid Profile:
                - Total Cholesterol: ${patientData.laboratoryResults.lipidProfile.totalCholesterol || 'Not available'}
                - LDL: ${patientData.laboratoryResults.lipidProfile.LDL || 'Not available'}
                - HDL: ${patientData.laboratoryResults.lipidProfile.HDL || 'Not available'}
                - Triglycerides: ${patientData.laboratoryResults.lipidProfile.triglycerides || 'Not available'}` : 'None'}
            ${patientData.laboratoryResults.kidneyFunctionTests ? `
            - Kidney Function Tests:
                - Serum Creatinine: ${patientData.laboratoryResults.kidneyFunctionTests.serumCreatinine || 'Not available'}
                - eGFR: ${patientData.laboratoryResults.kidneyFunctionTests.eGFR || 'Not available'}` : ''}
            ${patientData.laboratoryResults.hepaticPanel ? `
            - Hepatic Panel:
                - AST: ${patientData.laboratoryResults.hepaticPanel.AST || 'Not available'}
                - ALT: ${patientData.laboratoryResults.hepaticPanel.ALT || 'Not available'}
                - ALP: ${patientData.laboratoryResults.hepaticPanel.ALP || 'Not available'}
                - Bilirubin: ${patientData.laboratoryResults.hepaticPanel.bilirubin || 'Not available'}` : 'None'}

            Assessment and Plan:
            - Assessment: ${patientData.assessmentAndPlan.assessment.join(', ') || 'Not available'}
            - Plan: ${patientData.assessmentAndPlan.plan.join(', ') || 'Not available'}

            Recommended Medication: ${recommendedMedication}

            Will this medication likely be approved? Provide a yes or no answer with a brief explanation.
            `
        }
    ];

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: messages,
            max_tokens: 200,
        });

        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error with OpenAI API:', error);
        throw new Error('Failed to get prediction from AI model');
    }
}



module.exports = { summarizePatientInfo, predictMedicationApproval };
