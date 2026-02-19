import { useEffect, useMemo, useState } from "react";
import { fetchEmployees } from "../services/employees";
import { generateSignature } from "../email/signatureTemplate";
import logo from "../../public/OP-Logo-B.png";

export default function SignatureGenerator() {
  const [selected, setSelected] = useState("");
  const [html, setHtml] = useState("");
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const baseUrl = window.location.origin;

  useEffect(() => {
    let active = true;

    const loadEmployees = async () => {
      try {
        const data = await fetchEmployees();
        if (active) {
          setEmployees(data);
        }
      } catch (err) {
        if (active) {
          setError(err?.message || "Failed to load employees.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadEmployees();

    return () => {
      active = false;
    };
  }, []);

  const employeesBySlug = useMemo(() => {
    const map = new Map();
    employees.forEach((employee) => {
      map.set(employee.slug, employee);
    });
    return map;
  }, [employees]);

  const handleGenerate = () => {
    if (!selected) return;
    const employee = employeesBySlug.get(selected);
    if (!employee) return;
    const signature = generateSignature(
      { ...employee, photo: employee.photo_url },
      baseUrl,
    );
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
            disabled={loading || !!error}
          >
            <option value="">
              {loading
                ? "Loading employees..."
                : "Select your name"}
            </option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.slug}>
                {employee.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleGenerate}
            disabled={!selected || loading || !!error}
            className="rounded bg-emerald-700 px-4 text-white disabled:opacity-50"
          >
            Generate
          </button>
        </div>

        {error && (
          <p className="mt-3 text-sm text-red-600">
            {error}
          </p>
        )}

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
