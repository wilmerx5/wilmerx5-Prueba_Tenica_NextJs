export default function passwordValidator(password: string) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
        return "password must have ar least 8 characters.";
    }
    if (!hasUpperCase) {
        return "Password must contain a capital Letter.";
    }
    if (!hasSymbol) {
        return "password must contain a symbol";
    }

    return null;
}
