import { useState } from "react";

import { sendOTP } from "../../services/auth.service";
import styles from "./SendOtpForm.module.css";

function SendOtpForm({ mobile, setMobile, setStep }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();
    setError("");

    if (mobile.length !== 11) {
      setError("شماره موبایل معتبر نیست.");
      return;
    }

    try {
      setLoading(true);

      await sendOTP(mobile);
      setStep(2);
    } catch (error) {
      setError(error.response?.data?.message || "ارسال کد تایید با مشکل مواجه شد.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <p>ورود به حساب کاربری</p>

      <span>شماره موبایل خود را وارد کنید. کد تایید به این شماره ارسال خواهد شد.</span>

      <label htmlFor="mobile">شماره موبایل</label>

      <input
        id="mobile"
        type="tel"
        value={mobile}
        onChange={(event) => setMobile(event.target.value)}
        placeholder="09123456789"
        maxLength={11}
      />

      {error && <p>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "در حال ارسال..." : "ارسال کد تایید"}
      </button>
    </form>
  );
}

export default SendOtpForm;
