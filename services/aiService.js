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
            model: "gpt-4",  // Use the correct chat model
            messages: messages,
            max_tokens: 150,
        });

        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error with OpenAI API:', error);
        throw new Error('Failed to summarize patient information');
    }
}

// Function to predict medication approval
async function predictMedicationApproval(patientData, recommendedMedication) {
    const messages = [
        {
            role: "system",
            content: "You are a medical assistant evaluating medication approval."
        },
        {
            role: "user",
            content: `
            Based on the following patient information and the recommended medication, predict if the medication is likely to be approved for prior authorization:
            
            Patient Information:
            - Name: ${patientData.name}
            - Age: ${patientData.age}
            - Gender: ${patientData.gender}
            - Chronic Conditions: ${patientData.medicalHistory.chronicConditions.join(', ') || 'None'}
            - Prior Medications: ${patientData.diabetesManagement.currentMedications.join(', ') || 'None'}
            - Surgical History: ${patientData.medicalHistory.surgicalHistory.join(', ') || 'None'}
            - Allergies: ${patientData.medicalHistory.allergies.join(', ') || 'None'}
            - Insurance Provider: ${patientData.insurance}
            
            Recommended Medication: ${recommendedMedication}
            
            Will this medication likely be approved? Why or why not? Provide alternative suggestions if necessary.
            `
        }
    ];

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",  // Use the correct chat model
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
