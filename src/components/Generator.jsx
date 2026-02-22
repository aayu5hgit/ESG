import { useEffect, useMemo, useRef, useState } from "react";
import { addEmployee, fetchEmployees } from "../services/employees";
import { supabase } from "../lib/supabaseClient";
import { generateSignature } from "../email/signatureTemplate";
import logo from "../../public/OP-Logo-B.png";

export default function SignatureGenerator() {
  const fileInputRef = useRef(null);
  const [selected, setSelected] = useState("");
  const [html, setHtml] = useState("");
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [addStep, setAddStep] = useState("password");
  const [addPassword, setAddPassword] = useState("");
  const [addAuthError, setAddAuthError] = useState("");
  const [addForm, setAddForm] = useState({
    name: "",
    email: "",
    designation: "",
    photoFile: null,
    photoPreview: "",
  });
  const [addFormError, setAddFormError] = useState("");
  const [addSubmitting, setAddSubmitting] = useState(false);

  const baseUrl = window.location.origin;
  const addEmployeePassword = useMemo(
    () => import.meta.env.VITE_ADD_EMPLOYEE_PASSWORD || "",
    [],
  );

  useEffect(() => {
    return () => {
      if (addForm.photoPreview) {
        URL.revokeObjectURL(addForm.photoPreview);
      }
    };
  }, [addForm.photoPreview]);

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

  const openAddModal = () => {
    setIsAddOpen(true);
    setAddStep("password");
    setAddPassword("");
    setAddAuthError("");
    setAddForm({
      name: "",
      email: "",
      designation: "",
      photoFile: null,
      photoPreview: "",
    });
    setAddFormError("");
  };

  const handleAddPasswordSubmit = (event) => {
    event.preventDefault();
    if (!addEmployeePassword) {
      setAddAuthError("Add-employee password is not configured.");
      return;
    }
    if (addPassword !== addEmployeePassword) {
      setAddAuthError("Incorrect password. Try again.");
      return;
    }
    setAddAuthError("");
    setAddStep("form");
  };

  const makeSlug = (name) => {
    return name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0] || null;
    if (!file) {
      setAddForm((prev) => ({
        ...prev,
        photoFile: null,
        photoPreview: "",
      }));
      return;
    }

    if (!file.type.startsWith("image/")) {
      setAddFormError("Please upload a valid image file.");
      event.target.value = "";
      return;
    }

    if (addForm.photoPreview) {
      URL.revokeObjectURL(addForm.photoPreview);
    }
    const preview = URL.createObjectURL(file);
    setAddFormError("");
    setAddForm((prev) => ({
      ...prev,
      photoFile: file,
      photoPreview: preview,
    }));
  };

  const triggerPhotoPicker = () => {
    fileInputRef.current?.click();
  };

  const clearPhoto = () => {
    if (addForm.photoPreview) {
      URL.revokeObjectURL(addForm.photoPreview);
    }
    setAddForm((prev) => ({
      ...prev,
      photoFile: null,
      photoPreview: "",
    }));
  };

  const closeAddModal = () => {
    clearPhoto();
    setIsAddOpen(false);
    setAddSubmitting(false);
    setAddFormError("");
  };

  const uploadPhoto = async (file, slug) => {
    const bucket =
      import.meta.env.VITE_SUPABASE_BUCKET || "employee-photos";
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const baseName = file.name.replace(/\.[^/.]+$/, "");
    const safeName = baseName
      .toLowerCase()
      .replace(/[^a-z0-9.-]/g, "-");
    const path = `employees/${slug}/${Date.now()}-${safeName}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: "3600",
        upsert: true,
        contentType: file.type,
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl || null;
  };

  const handleAddEmployeeSubmit = async (event) => {
    event.preventDefault();
    setAddFormError("");

    if (!addForm.name || !addForm.email || !addForm.designation) {
      setAddFormError("Name, Email, and Designation are required.");
      return;
    }

    const baseSlug = makeSlug(addForm.name);
    if (!baseSlug) {
      setAddFormError("Please provide a valid name.");
      return;
    }

    const existingSlugs = new Set(employees.map((employee) => employee.slug));
    let slug = baseSlug;
    let suffix = 2;
    while (existingSlugs.has(slug)) {
      slug = `${baseSlug}-${suffix}`;
      suffix += 1;
    }

    setAddSubmitting(true);
    try {
      let photoUrl = null;
      if (addForm.photoFile) {
        photoUrl = await uploadPhoto(addForm.photoFile, slug);
      }
      const created = await addEmployee({
        name: addForm.name.trim(),
        email: addForm.email.trim(),
        title: addForm.designation.trim(),
        photo_url: photoUrl,
        slug,
      });
      setEmployees((prev) =>
        [...prev, created].sort((a, b) =>
          a.name.localeCompare(b.name),
        ),
      );
      setAddStep("success");
    } catch (err) {
      setAddFormError(err?.message || "Failed to add employee.");
    } finally {
      setAddSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
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

        <button
          onClick={openAddModal}
          className="mt-4 w-full roundedpx-4 py-2 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
        >
          Add New Employee
        </button>

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

      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-start justify-between">
              <h2 className="text-lg font-semibold">
                {addStep === "success" ? "Employee Added" : "Add Employee"}
              </h2>
              <button
                onClick={closeAddModal}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>

            {addStep === "password" && (
              <form onSubmit={handleAddPasswordSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="add-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    id="add-password"
                    type="password"
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                    placeholder="Enter password"
                    value={addPassword}
                    onChange={(event) => setAddPassword(event.target.value)}
                    autoFocus
                  />
                </div>
                {addAuthError ? (
                  <p className="text-sm text-red-600">{addAuthError}</p>
                ) : (
                  <p className="text-xs text-gray-500">
                    Enter the admin password to continue.
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-900"
                >
                  Continue
                </button>
              </form>
            )}

            {addStep === "form" && (
              <form onSubmit={handleAddEmployeeSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                    placeholder="Full name"
                    value={addForm.name}
                    onChange={(event) =>
                      setAddForm((prev) => ({
                        ...prev,
                        name: event.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                    placeholder="name@optimite.ai"
                    value={addForm.email}
                    onChange={(event) =>
                      setAddForm((prev) => ({
                        ...prev,
                        email: event.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Designation
                  </label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                    placeholder="Role / title"
                    value={addForm.designation}
                    onChange={(event) =>
                      setAddForm((prev) => ({
                        ...prev,
                        designation: event.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Photo
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handlePhotoChange}
                  />
                  <div className="mt-1">
                    {addForm.photoPreview ? (
                      <div className="flex items-center gap-4">
                        <img
                          src={addForm.photoPreview}
                          alt="Preview"
                          className="h-24 w-24 rounded-full object-cover"
                        />
                        <div className="flex flex-col items-start gap-2 text-sm">
                          <button
                            type="button"
                            onClick={triggerPhotoPicker}
                            className="font-medium text-emerald-700 hover:text-emerald-900"
                          >
                            Change photo
                          </button>
                          <button
                            type="button"
                            onClick={clearPhoto}
                            className="text-xs font-medium text-gray-500 hover:text-gray-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={triggerPhotoPicker}
                        className="flex w-full flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 px-4 py-6 text-center text-sm text-gray-500 hover:border-gray-400"
                      >
                        <span className="font-medium text-gray-700">
                          Click to upload
                        </span>
                        <span className="text-xs">
                          PNG, JPG, or WEBP
                        </span>
                      </button>
                    )}
                  </div>
                </div>

                {addFormError && (
                  <p className="text-sm text-red-600">{addFormError}</p>
                )}

                <button
                  type="submit"
                  disabled={addSubmitting}
                  className="w-full rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-900 disabled:opacity-60"
                >
                  {addSubmitting ? "Saving..." : "Submit"}
                </button>
              </form>
            )}

            {addStep === "success" && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  The employee was added successfully and is now available in
                  the list.
                </p>
                <button
                  onClick={closeAddModal}
                  className="w-full rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-900"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
