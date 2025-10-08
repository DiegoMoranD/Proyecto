<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>MedicTrack</title>
    @viteReactRefresh
    @vite('resources/js/app.jsx')
    @vite('resources/css/app.css')
</head>

<body class="">
    <div id="app"></div>
</body>
<noscript>
    <div style="background-color: #ffcccc; padding: 20px; text-align: center;">
        <strong>Este sitio web requiere JavaScript para funcionar correctamente.</strong>
        Por favor, habilita JavaScript en la configuración de tu navegador.
    </div>
</noscript>

</html>