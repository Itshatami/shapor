import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { useCheckOTP } from "../../hooks/useAuth";
import styles from "./CheckOtpForm.module.css";

function CheckOtpForm({ mobile, setStep }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useCheckOTP();

  const [code, setCode] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();

    if (code.length !== 5) return;

    mutate(
      { mobile, code },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: ["profile"],
          });

          navigate("/");
        },
        onError: (error) => {
          console.log(error.response?.data?.message || error.message);
        },
      }
    );
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <p>تأیید کد ارسال‌شده</p>

      <span>کد پیامک‌شده به شماره {mobile} را وارد کنید.</span>

      <label htmlFor="code">کد تأیید را وارد کنید</label>

      <input
        type="text"
        id="code"
        placeholder="کد تأیید"
        value={code}
        onChange={(event) => setCode(event.target.value)}
      />

      <button type="submit" disabled={isPending}>
        {isPending ? "در حال بررسی..." : "ورود"}
      </button>

      <button
        type="button"
        className={styles.backButton}
        onClick={() => setStep(1)}
      >
        تغییر شماره موبایل
      </button>
    </form>
  );
}

export default CheckOtpForm;