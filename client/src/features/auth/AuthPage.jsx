
import { useState } from "react";

import SendOtpForm from "./components/forms/SendOtpForm";
import CheckOtpForm from "./components/forms/CheckOtpForm";

function AuthPage() {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");

  return (
    <div>
      {step === 1 && (
        <SendOtpForm
          mobile={mobile}
          setMobile={setMobile}
          setStep={setStep}
        />
      )}

      {step === 2 && (
        <CheckOtpForm
          mobile={mobile}
          setStep={setStep}
        />
      )}
    </div>
  );
}

export default AuthPage;
