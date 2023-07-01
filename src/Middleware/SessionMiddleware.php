<?php

namespace App\Middleware;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use TypeError;

class SessionMiddleware
{
    private $session;

    public function __construct(SessionInterface $session)
    {
        $this->session = $session;
    }

    public function onKernelRequest(RequestEvent $event)
    {
        // Check if the user session ID is valid or perform any other session-related checks
        $response = $event->getResponse();
        $request = $event->getRequest();


        if ($request->get("_route") == "app_addToWishList") {
            // Get the session id from the request:
            $browerSession = $request->cookies->get('PHPSESSID');
            
            if (!$this->isValidSession($browerSession)) {
                $response = new Response('Invalid session', 403);
                $event->setResponse($response);
            }
        }
        // elseif (($request->get("_route") == "app_addToWishList")) {
        //     $sessionId = $request->cookies->get("PHPSESSID");

        //     $this->session->setId($sessionId);
        //     // $user = $this->session->get("")
        //     dd($this->session);
        // }   
    }

    public function onKernelResponse(ResponseEvent $event)
    {
        // Perform any necessary cleanup after the response is sent
    }

    public function isValidSession($sessionId)
    {
        // Check if the session ID exists in the server-side storage.
        try {
            $this->session->setId($sessionId);
            $this->session->start();
        } catch (TypeError $typeErr) {
            return false;
        }

        if ($this->session->isStarted()) {
            return true;
        } else {
            return false;
        }
    }
}
