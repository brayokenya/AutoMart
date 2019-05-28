const generateMessageData = (userObject, resetLink) => {
    const data = {
        from: 'Auto Mart <admin@sandboxbe3db14fbfde4c4798a1d5bb5863a3ab.mailgun.org>',
        to: userObject.email,
        subject: 'Password reset',
        html: `
        <h3> Hello ${userObject.firstName},</h3>
        <p>Here is your password reset link: </p>
        
        <div>
        <a href="${resetLink}"> 
        ${resetLink}
        </a>
        </div>  
        <p>
        Send a post request to the link, supplying the following information:
        {
            password: String,
            confirmPassword: String
        }
        </p>
        
        `
    };
    return data;
};

export default generateMessageData;
