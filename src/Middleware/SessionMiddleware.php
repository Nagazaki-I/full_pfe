<?php

namespace App\Middleware;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\Event\ResponseEvent;



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
            $browerSession = $request->cookies->get('usrSession');
            
            if (!$this->isValidSession($browerSession)) {
                // Handle the invalid session case, e.g., return an error response
                $response = new Response('Invalid session', 403);
                $event->setResponse($response);
            }else{
                $response = new Response('Session is valid');
                $event->setResponse($response);
            }
        }
    }

    public function onKernelResponse(ResponseEvent $event)
    {
        // Perform any necessary cleanup after the response is sent
    }

    public function isValidSession($sessionId)
    {
        // Check if the session ID exists in the server-side storage
        $this->session->setId($sessionId);
        $this->session->start();

        if ($this->session->isStarted()) {
            return true;
        } else {
            return false;
        }
    }
}
