import React, { useState } from "react";
import { authService } from "./auth.service";

function LoginPage() {
  const [phone, setPhone] = useState("");

  const handleSubmit = async(event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    await authService.sendOtp(phone)
  };

  return (
    <main>
      <h1>Mini Store</h1>
      <h2>ورود / ثبت نام</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="phone"> شماره موبایل</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          placeholder="09XXXXXXXXX"
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="submit">دریافت کد</button>
      </form>
    </main>
  );
}

export default LoginPage;
