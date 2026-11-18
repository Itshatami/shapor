import { useSendOTP } from "../../hooks/useAuth";
import styles from "./SendOtpForm.module.css";

function SendOtpForm({ mobile, setMobile, setStep }) {
  const { mutate, isPending } = useSendOTP();

  const submitHandler = (event) => {
    event.preventDefault();

    if (mobile.length !== 11) return;

    mutate(mobile, {
      onSuccess: () => {
        setStep(2);
      },
      onError: (error) => {
        console.log(error.response?.data?.message || error.message);
      },
    });
  };

  return (
    <div>
      <form onSubmit={submitHandler} className={styles.form}>
        <p>ورود به حساب کاربری</p>

        <span>
          برای استفاده از امکانات دیوار، لطفا شماره موبایل خود را وارد کنید.
          کد تایید به این شماره پیامک خواهد شد.
        </span>

        <label htmlFor="mobile">لطفا شماره موبایل خود را وارد کنید</label>

        <input
          type="tel"
          id="mobile"
          placeholder="شماره موبایل"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <button type="submit" disabled={isPending}>
          {isPending ? "در حال ارسال..." : "ارسال کد تایید"}
        </button>
      </form>
    </div>
  );
}

export default SendOtpForm;