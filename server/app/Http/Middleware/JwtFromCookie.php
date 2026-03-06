<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class JwtFromCookie
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->cookie('access_token');

        if($token && !$request->bearerToken()) {
            $request->headers->set('Authorization', 'Bearer ' . $token);
        }

        logger([
            'cookie' => $request->cookie('access_token'),
            'header' => $request->bearerToken(),
        ]);

        return $next($request);
    }
}
