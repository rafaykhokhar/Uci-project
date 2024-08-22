import streamlit as st
import requests

st.title("Patient Information and Medication Approval")

# Input for Medical Record Number
medical_record_number = st.text_input("Enter Medical Record Number:")

# Input for Insurance Type (Dropdown)
insurance_type = st.selectbox(
    "Select Insurance Type:",
    [
        "Blue Shield of California",
        "Kaiser Permanente",
        "Anthem Blue Cross",
        "Health Net",
        "Molina Healthcare",
        "Cigna",
        "Aetna",
        "UnitedHealthcare",
        "Covered California"
    ]
)
# Button to Fetch and Display Patient Summary
if st.button("Get Patient Summary"):
    if medical_record_number:
        url = f"https://uciproject.onrender.com/api/patients/{medical_record_number}/summarize"
        response = requests.get(url)
        if response.status_code == 200:
            summary = response.json().get('summary', 'No summary found.')
            st.subheader("Patient Summary")
            st.write(summary)
        else:
            st.error("Patient not found or an error occurred.")
    else:
        st.warning("Please enter a valid Medical Record Number.")

# Input for Recommended Medication
recommended_medication = st.text_input("Enter Recommended Medication:")

# Button to Predict Medication Approval
if st.button("Predict Medication Approval"):
    if medical_record_number and recommended_medication and insurance_type:
        url = f"https://uciproject.onrender.com/api/patients/{medical_record_number}/predict-approval"
        data = {"recommendedMedication": recommended_medication,
                "insuranceType": insurance_type}
        response = requests.post(url, json=data)
        if response.status_code == 200:
            prediction = response.json().get('prediction', 'No prediction found.')
            st.subheader("Medication Approval Prediction")
            st.write(prediction)
        else:
            st.error("Patient not found or an error occurred.")
    else:
        st.warning("Please enter all required fields.")
