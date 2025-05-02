<?php

namespace App\Utils;

class PHPLogToFile
{
    public static function logToFile($message, $context = [])
    {
        // Ruta del archivo de logs
        $logFile = storage_path('logs/critical-events.log');

        // Formatear el mensaje con la fecha y hora
        $timestamp = date('Y-m-d H:i:s');
        $formattedMessage = "[$timestamp] CRITICAL: $message";

        // Agregar contexto si está disponible
        if (!empty($context)) {
            $formattedMessage .= ' | Context: ' . json_encode($context);
        }

        // Escribir en el archivo
        $fileHandle = fopen($logFile, 'a'); // 'a' para agregar al final del archivo
        if ($fileHandle) {
            fwrite($fileHandle, $formattedMessage . PHP_EOL);
            fclose($fileHandle);
        } else {
            // Manejar errores al abrir el archivo
            error_log("No se pudo abrir el archivo de logs: $logFile");
        }
    }

    public static function logToFileInfo($message, $context = [])
    {
        // Ruta del archivo de logs
        $logFile = storage_path('logs/info-events.log');

        // Formatear el mensaje con la fecha y hora
        $timestamp = date('Y-m-d H:i:s');
        $formattedMessage = "[$timestamp] INFO: $message";

        // Agregar contexto si está disponible
        if (!empty($context)) {
            $formattedMessage .= ' | Context: ' . json_encode($context);
        }

        // Escribir en el archivo
        $fileHandle = fopen($logFile, 'a'); // 'a' para agregar al final del archivo
        if ($fileHandle) {
            fwrite($fileHandle, $formattedMessage . PHP_EOL);
            fclose($fileHandle);
        } else {
            // Manejar errores al abrir el archivo
            error_log("No se pudo abrir el archivo de logs: $logFile");
        }
    }
}
