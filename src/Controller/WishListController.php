<?php

namespace App\Controller;

use MongoDB\Client;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Annotation\Route;



class WishListController extends AbstractController
{
    private $mongoClient;
    private $session;

    public function __construct(Client $mongoClient, SessionInterface $session)
    {
        $this->mongoClient = $mongoClient;
        $this->session = $session;
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


    /**
     * @Route("/api/addToWishList", name="app_addToWishList", methods={"POST"})
     */
    public function addToWishList(Request $request): Response
    {
        $product = json_decode($request->getContent(), true);
        $cookie = $request->cookies->get("PHPSESSID");

        $this->session->setId($cookie);
        $this->session->start();
        $user = $this->session->get('userObject');

        // This gets all the documents in the collection
        $collection = $this->mongoClient->selectCollection("store", "userWishlist");
        // $userDoc = $Collection->findOne(['userId' => $user["uid"]]);
        $collection->findOneAndUpdate(
            ['userId' => $user["uid"]],
            ['$push' => ['wishList' => $product]]
        );

        // $collection = $this->mongoClient->selectCollection("store", "userWishlist");
        // dd($collection);
        return new Response("Product added to wishlist");
    }



    /**
     * @Route("/api/removeFromWishList", name="app_removeFromWishList", methods={"POST"})
     */
    public function removeFromWishList(Request $request): Response
    {
        $product = json_decode($request->getContent(), true);
        $cookie = $request->cookies->get("PHPSESSID");

        $this->session->setId($cookie);
        $this->session->start();
        $user = $this->session->get('userObject');

        // This gets all the documents in the collection
        $collection = $this->mongoClient->selectCollection("store", "userWishlist");
        // $userDoc = $Collection->findOne(['userId' => $user["uid"]]);
        $collection->findOneAndUpdate(
            ['userId' => $user["uid"]],
            ['$pull' => ['wishList' => $product]]
        );

        // $collection = $this->mongoClient->selectCollection("store", "userWishlist");
        // dd($collection);
        return new Response("Product removed from wishlist");
    }
}
