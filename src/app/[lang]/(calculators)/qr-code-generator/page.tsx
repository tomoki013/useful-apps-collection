// src/app/[lang]/(calculators)/qr-code-generator/page.tsx

import { QrCodeGenerator } from "@/components/organisms/calculators/QrCodeGenerator";
import { Metadata } from "next";

// TODO: i18n
export const metadata: Metadata = {
  title: "QR Code Generator | Convenient Calculation Toolbox",
  description:
    "Generate a QR code from a URL or text.",
};

const QrCodeGeneratorPage = () => {
  return (
    <div className="py-8">
      {/* <QrCodeGenerator /> */}
      <p>QR Code Generator coming soon!</p>
    </div>
  );
};

export default QrCodeGeneratorPage;
