<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Annotation\Route;




class AuthController extends AbstractController
{
    private $session;

    public function __construct(SessionInterface $session)
    {
        $this->session = $session;
    }
    

    /**
     * @Route("/api/login", name="app_login")
     */
    public function login(Request $request): Response
    {
        $user = json_decode($request->getContent(), true);

        $this->session->set("userObject", $user);
        
        $data = $this->session->get('userObject');

        // $sessionId = $this->session->getId();

        $userData = [
            "name" => $data["displayName"],
            "profilePicture" => $data["photoURL"],
            "email" => $data["email"],
            "emailVerified" => $data["emailVerified"],
            "lastLoginAt" => $data["lastLoginAt"],
            "userId" => $data["uid"],
            // add the list of wishlisted products + cart products
        ];
        
        $response = new Response();

        // $response->headers->setCookie( new Cookie('usrSession', $sessionId, time() + 3600) );

        $response->setContent(json_encode($userData)); // This line should be removed 
        
        // $response->headers->set( 'Access-Control-Allow-Origin', 'http://localhost:3000' );
        // $response->headers->set( 'Access-Control-Allow-Credentials', 'true' );

        // dd($response);

        return $response;
    }


    /**
     * @Route("/api/logout", name="app_logout")
     */
    public function logout(Request $request, ContainerInterface  $container, Filesystem $filesystem) 
    {
        $sessionId = $request->cookies->get("PHPSESSID");
        // dd($sessionId);
        $this->session->setId($sessionId);
        $this->session->start();
        $this->session->invalidate();

        // $sessionSavePath = $container->getParameter('session.save_path');
        // if ($filesystem->exists($sessionSavePath)) {
        //     $filesystem->remove($sessionSavePath."/sess_".$sessionId);
        // }
        return new Response("Logged out successfully");
    }
}
