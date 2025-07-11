import { useState } from "react";

const PromptForm = ({ onGenerate }) => {
  const [topic, setTopic] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (topic.trim()) {
      onGenerate(topic.trim());
      setTopic("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-[490px]">
      <input
        type="text"
        placeholder="Enter a topic (e.g. travel, horror story)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="p-2 w-full rounded border border-slate-600 text-slate-200 focus:outline-none focus:border-blue-500 placeholder-slate-400"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Generate Prompt
      </button>
    </form>
  );
};

export default PromptForm;
