<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ReactController extends AbstractController
{
    /**
     * @Route("/{route}", name="app_index", priority="-1", defaults={"route": null}, requirements={"route"="^(?!api).+"})
     */
    public function index(): Response
    {   
        $data = [];

        return $this->render('react/index.html.twig', [
            'data' => $data,
        ]);
    }
}
