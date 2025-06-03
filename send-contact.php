<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Asegúrate de tener esto si usas Composer
require 'vendor/autoload.php';

// Si usas los archivos descargados manualmente, usa esto:
// require 'src/PHPMailer.php';
// require 'src/SMTP.php';
// require 'src/Exception.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'] ?? '';
    $location = $_POST['location'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $message = $_POST['message'] ?? '';

    if (!empty($name) && !empty($location) && !empty($email) && !empty($phone) && !empty($message)) {
        $mail = new PHPMailer(true);

        try {
            // Configuración del servidor SMTP
            $mail->isSMTP();
            $mail->Host = 'smtp.eurotard.com'; // 🔁 CAMBIA ESTO por tu servidor SMTP real
            $mail->SMTPAuth = true;
            $mail->Username = 'dance@eurotard.com'; // 🔁 Tu correo
            $mail->Password = 'tu_contraseña_aquí'; // 🔁 Tu contraseña SMTP
            $mail->SMTPSecure = 'tls'; // o 'ssl'
            $mail->Port = 587; // o 465 si usas SSL

            // Remitente y destinatarios
            $mail->setFrom('dance@eurotard.com', 'Web Contact Form');
            $mail->addAddress('dance@eurotard.com'); // 📥 Cambia si deseas otros destinatarios

            // Contenido
            $mail->isHTML(false);
            $mail->Subject = "New Contact Form Submission";
            $mail->Body = "Name / Store: $name\nLocation: $location\nEmail: $email\nPhone: $phone\nMessage:\n$message";

            $mail->send();

            // Redirección tras enviar
            header("Location: thank-you.html");
            exit;
        } catch (Exception $e) {
            echo "Error al enviar el mensaje: {$mail->ErrorInfo} color: #ed018c;";
        }
    } else {
        echo "Error: Todos los campos son obligatorios.";
    }
} else {
    echo "Solicitud inválida.";
}
?>
