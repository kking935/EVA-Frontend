import React, { useState } from "react";
import { handleSummaryRequest } from "../../utils/handlers";
import LoadingIcon from "../Common/LoadingIcon";

const endpointNames = [
  "bart (free)",
  "bart (paid)",
  "pegusus (free)",
  "pegusus (paid)"
]

const Summarize = () => {
  const [patientExample, setPatientExample] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedEndpointName, setSelectedEndpointName] = useState(endpointNames[0]);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEndpointName(event.target.value);
  };

  const handlePatientExampleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPatientExample(event.target.value);
  };

  const handleSubmit = async () => {
    setSummary("");
    setLoading(true);

    console.log(selectedEndpointName)
    console.log(`Summarizing: ${patientExample}`);
    const summary = await handleSummaryRequest(patientExample, selectedEndpointName);

    setSummary(summary);
    setLoading(false);
  };

  return (
    <div>
      <p className="p-3">
        In this mode, you can enter some text and summarize it.
        You can toggle between BART (Facebook model) and Pegasus (Google model).
        The free versions are rate limited and may not be HIPAA compliant.
        The paid versions are HIPAA compliant and are currently using the smallest resources possible to save money during initial prototyping.
      </p>

      <select
      className="blue-select"
      style={{ padding: "0.5rem", borderRadius: "4px" }}
      value={selectedEndpointName}
      onChange={handleSelect}
    >
      {endpointNames.map((endpointName) => (
        <option key={endpointName} value={endpointName}>
          {endpointName}
        </option>
      ))}
    </select>

      <h3>Full Text:</h3>
      <textarea
        placeholder="Enter a some text to summarize (ex. a patient summary)"
        onChange={handlePatientExampleChange}
      />

      <button onClick={handleSubmit}>Summarize</button>

      {summary ? (
        <>
          <hr></hr>
          <h3>Summary:</h3>
          <p className="summary">{summary}</p>
        </>
      ) : (
        <>{loading && <LoadingIcon />}</>
      )}
    </div>
  );
};

export default Summarize;
