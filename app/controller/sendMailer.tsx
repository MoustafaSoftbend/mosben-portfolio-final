// Example form submission handler in a component
"use server";

export const sendEmail = async (data: string[]) => {
    const res = await fetch("/api/sendMail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "recipient@example.com",
        subject: "Test Email",
        text: "This is a test email.",
        html: "<p>This is a test email.</p>",
      }),
    });
  
    const result = await res.json();
    console.log(result.message);
  };
  