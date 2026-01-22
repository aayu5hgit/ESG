import { useState } from "react";
import employees from "../data/employees";
import { generateSignature } from "../email/signatureTemplate";
import logo from "../../public/OP-Logo-B.png";

export default function SignatureGenerator() {
  const [selected, setSelected] = useState("");
  const [html, setHtml] = useState("");

  const baseUrl = window.location.origin;

  const handleGenerate = () => {
    if (!selected) return;
    const signature = generateSignature(employees[selected], baseUrl);
    setHtml(signature);
  };

  const copySignature = async () => {
    await navigator.clipboard.writeText(html);
    alert("Signature copied. Paste it into Gmail → Settings → Signature.");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-xl rounded-lg bg-white p-6 shadow">
        <img src={logo} alt="Optimite" className="mb-4 h-8 object-contain" />

        <h1 className="mb-4 text-xl font-semibold">
          Email Signature Generator
        </h1>

        <div className="flex gap-2">
          <select
            className="w-full appearance-none rounded border bg-white px-3 py-2 pr-10"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="">Select your name</option>
            {Object.entries(employees)
              .sort(([, a], [, b]) => a.name.localeCompare(b.name))
              .map(([key, emp]) => (
                <option key={key} value={key}>
                  {emp.name}
                </option>
              ))}
          </select>

          <button
            onClick={handleGenerate}
            disabled={!selected}
            className="rounded bg-emerald-700 px-4 text-white disabled:opacity-50"
          >
            Generate
          </button>
        </div>

        {html && (
          <>
            <p className="mt-4 text-sm text-gray-500">Preview</p>

            <div className="mt-2 w-full rounded border p-4">
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
            <button className="mt-4 flex justify-center w-[100%]">
              <a
                href="https://drive.google.com/file/d/198n4rWgZzinLiRRHqNilxSspPuDHRumC/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="    mt-4
                block w-full
                rounded-md
                hover:bg-[#003C39]
                px-4 py-3
                text-center
                text-sm font-medium text-white
                transition-colors
                bg-emerald-700"
              >
               Next Step: <span className="font-bold ml-1"> Get a walkthrough</span>
              </a>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
