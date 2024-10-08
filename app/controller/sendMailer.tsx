// Example form submission handler in a component

export const sendEmail = async (data: any) => {
  const {firstName, lastName, email,message} = data
    const res = await fetch("/api/nodemailer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: process.env.user,
        subject: `Inquiery from Client ${firstName} ${lastName}`,
        text: message,
        html: `<p>${message} <br> ${email} </p>`,
      }),
    });
  
    const result = await res.json();
    console.log(result.message);
    return result
  };
  