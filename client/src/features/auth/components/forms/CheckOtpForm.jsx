
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { checkOTP } from "../../services/auth.service";

function CheckOtpForm({ mobile, setStep }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const submitHandler = async (event) => {
    event.preventDefault();
    setError("");

    if (code.length !== 5) {
      setError("کد تایید باید ۵ رقم باشد.");
      return;
    }

    try {
      setLoading(true);

      await checkOTP(mobile, code);

      // Refresh user data after successful authentication
      await queryClient.invalidateQueries({
        queryKey: ["auth", "me"],
      });

      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "کد تایید صحیح نیست."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <p>تایید کد ارسال شده</p>

      <span>
        کد پیامک شده به شماره {mobile} را وارد کنید.
      </span>

      <label htmlFor="otp">کد تایید</label>

      <input
        id="otp"
        type="text"
        inputMode="numeric"
        value={code}
        onChange={(event) => setCode(event.target.value)}
        maxLength={5}
        placeholder="کد تایید"
      />

      {error && <p>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "در حال بررسی..." : "ورود"}
      </button>

      <button
        type="button"
        onClick={() => setStep(1)}
      >
        تغییر شماره موبایل
      </button>
    </form>
  );
}

export default CheckOtpForm;
