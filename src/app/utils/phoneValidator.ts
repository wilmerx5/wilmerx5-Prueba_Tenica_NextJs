export default function phoneValidator(phone: string) {
    const phoneRegex = /^\d{10}$/; // Expresión regular para exactamente 10 dígitos

    if (!phoneRegex.test(phone)) {
        return "El número de teléfono debe contener exactamente 10 dígitos numéricos.";
    }

    return null;
}
