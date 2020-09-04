<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{$settings['site title']}}</title>
    <meta property="description" content="{{$settings['site description']}}}">
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
<div id="app"></div>

<script type="module" src="https://unpkg.com/ionicons@5.1.2/dist/ionicons/ionicons.esm.js"></script>
<script nomodule="" src="https://unpkg.com/ionicons@5.1.2/dist/ionicons/ionicons.js"></script>
<script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
