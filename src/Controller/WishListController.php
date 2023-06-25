<?php

namespace App\Controller;

use MongoDB\Client;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class WishListController extends AbstractController
{
    private $mongoClient;

    public function __construct(Client $mongoClient)
    {
        $this->mongoClient = $mongoClient;
    }


    /**
     * @Route("/api/addToWishList", name="app_wish_list", methods={"POST"})
     */
    public function addToWishList(Request $request): JsonResponse
    {   
        $response = json_decode($request->getContent(), true);
        // This gets all the documents in the collection
        $collection = $this->mongoClient->store->users;
        // dd($collection->find([])->toArray());
        // dd();



        $data = ["result" => ($response["id"] * 2)];

        return new JsonResponse($data);
    }
}
