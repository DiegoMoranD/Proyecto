<?php

namespace App\Utils;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class PHPMailerHelper
{
    public static function sendEmail($to, $subject, $body)
    {
        $mail = new PHPMailer(true);

        try {
            // Configuración del servidor SMTP
            $mail->isSMTP();
            $mail->Host = env('MAIL_HOST', 'smtp.gmail.com'); // Servidor SMTP
            $mail->SMTPAuth = true;
            $mail->Username = env('MAIL_USERNAME', 'morandiazdiegoarmando@gmail.com'); // Correo del remitente
            $mail->Password = env('MAIL_PASSWORD', 'azqsibwjbbjgpzdp'); // Contraseña del correo
            $mail->SMTPSecure = env('MAIL_ENCRYPTION', 'tls'); // Encriptación
            $mail->Port = env('MAIL_PORT', 587); // Puerto SMTP

            // Configuración del remitente y destinatario
            $mail->setFrom(env('MAIL_FROM_ADDRESS', 'morandiazdiegoarmando@gmail.com'), env('MAIL_FROM_NAME', 'TecuaniSoft'));
            $mail->addAddress($to); // Correo del destinatario

            // Contenido del correo
            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body = $body;

            $mail->send();
            return true;
        } catch (Exception $e) {
            // Manejo de errores
            return "Error al enviar el correo: {$mail->ErrorInfo}";
        }
    }
}