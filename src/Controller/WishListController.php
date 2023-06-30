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
     * @Route("/api/addToWishList", name="app_addToWishList", methods={"POST"})
     */
    public function addToWishList(Request $request): JsonResponse
    {
        $response = json_decode($request->getContent(), true);
        dd($response);
        // This gets all the documents in the collection
        $usersCollection = $this->mongoClient->selectCollection("store", "userWishlist");
        // $user = $usersCollection->findOne(['userId' => $uid]);


        $data = ["result" => ($response["id"] * 2)];

        return new JsonResponse($data);
    }


    /**
     * @Route("/api/getWishList/{uid}", name="app_getWishList", methods={"GET"})
     */
    public function getToWishList($uid): JsonResponse
    {
        $usersCollection = $this->mongoClient->selectCollection("store", "userWishlist");

        $user = $usersCollection->findOne(['userId' => $uid]);

        if (!$user) {
            $newUser = ["userId" => $uid, "wishList" => []];
            $usersCollection->insertOne($newUser);
            $user = $newUser;
        }

        return new JsonResponse($user);
    }
}
