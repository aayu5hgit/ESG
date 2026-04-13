import SignatureGenerator from "../components/Generator";

export default function EmailSignaturesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Email Signatures</h1>
      <p className="mt-1 text-sm text-gray-500">
        Generate and copy your email signature for Gmail.
      </p>
      <div className="mt-6 flex justify-center">
        <SignatureGenerator />
      </div>
    </div>
  );
}
